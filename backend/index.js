const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Configuração do multer para salvar imagens na pasta uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com o MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'perfil_usuario',
};

// GET /usuario
app.get('/usuario', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM usuario ORDER BY id DESC LIMIT 1');
    await conn.end();
    if (rows.length === 0) {
      return res.json({ imagem: '', nome: '', idade: '', rua: '', bairro: '', estado: '', biografia: '' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: err.message });
  }
});

// POST /usuario (com upload de imagem)
app.post('/usuario', upload.single('imagem'), async (req, res) => {
  const { nome, idade, rua, bairro, estado, biografia } = req.body;
  let imagemUrl = req.body.imagem || '';
  if (req.file) {
    imagemUrl = `/uploads/${req.file.filename}`;
  }
  try {
    const conn = await mysql.createConnection(dbConfig);
    // Se já existe um usuário, atualiza; senão, insere
    const [rows] = await conn.execute('SELECT id FROM usuario ORDER BY id DESC LIMIT 1');
    if (rows.length > 0) {
      const id = rows[0].id;
      await conn.execute('UPDATE usuario SET imagem=?, nome=?, idade=?, rua=?, bairro=?, estado=?, biografia=? WHERE id=?', [imagemUrl, nome, idade, rua, bairro, estado, biografia, id]);
    } else {
      await conn.execute('INSERT INTO usuario (imagem, nome, idade, rua, bairro, estado, biografia) VALUES (?, ?, ?, ?, ?, ?, ?)', [imagemUrl, nome, idade, rua, bairro, estado, biografia]);
    }
    // Retorna o usuário atualizado
    const [result] = await conn.execute('SELECT * FROM usuario ORDER BY id DESC LIMIT 1');
    await conn.end();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar usuário', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 