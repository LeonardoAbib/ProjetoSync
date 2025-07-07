# Perfil de Usuário — Protótipo Web

Este projeto é uma página de perfil de usuário moderna, onde você pode editar seus dados, trocar a foto de perfil e salvar tudo em um banco MySQL.

## O que você precisa
- Node.js (recomendado v18 ou superior)
- MySQL instalado e rodando

## Como rodar o projeto localmente

### 1. Pré-requisitos
- **Node.js**: Instale a versão 18 ou superior em [nodejs.org](https://nodejs.org/)
- **MySQL**: Instale e configure o MySQL Server em [mysql.com](https://dev.mysql.com/downloads/mysql/)

### 2. Configurar o banco de dados
1. Abra o MySQL Workbench ou linha de comando do MySQL
2. Execute os comandos:

-- Criar o banco de dados
CREATE DATABASE perfil_usuario;

-- Usar o banco criado
USE perfil_usuario;

-- Criar a tabela de usuários
CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  imagem VARCHAR(255),
  nome VARCHAR(100),
  idade INT,
  rua VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(50),
  biografia TEXT
);

### 3. Configurar o backend
1. Abra o terminal na pasta `backend`
2. Instale as dependências:

   npm install
   
4. Crie um arquivo `.env` na pasta `backend` com:
5. 
   DB_HOST=localhost
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha_mysql
   DB_NAME=perfil_usuario
   PORT=3001
   
6. Inicie o servidor:

   node index.js
   
   O backend estará rodando em `http://localhost:3001`

### 4. Configurar o frontend
1. Abra outro terminal na pasta `frontend`
2. Instale as dependências:

   npm install

3. Inicie o servidor de desenvolvimento:

   npm start

   O frontend abrirá automaticamente em `http://localhost:3000`

### 5. Testar a aplicação
- Acesse `http://localhost:3000` no navegador
- Preencha os dados do perfil
- Faça upload de uma foto
- Clique em "Salvar" para testar se os dados são salvos no banco

**Pronto!** Sua aplicação está funcionando localmente. 

 
