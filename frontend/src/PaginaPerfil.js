import React, { useState, useEffect } from 'react';
import './PaginaPerfil.css';

// Endereço da API do backend
const API = 'http://localhost:3001';

// Estrutura inicial do perfil
const perfilInicial = {
  imagem: '',
  nome: '',
  idade: '',
  rua: '',
  bairro: '',
  estado: '',
  biografia: ''
};

export default function PaginaPerfil() {
  // Estados principais
  const [perfil, setPerfil] = useState(perfilInicial); // Dados atuais
  const [editando, setEditando] = useState(false); // Alterna entre visualizar e editar
  const [formulario, setFormulario] = useState(perfilInicial); // Dados do formulário
  const [fotoPreview, setFotoPreview] = useState(''); // Prévia da foto
  const [fotoArquivo, setFotoArquivo] = useState(null); // Arquivo da foto
  const [carregando, setCarregando] = useState(true); // Carregamento inicial

  // Carrega os dados do perfil ao abrir a página
  useEffect(() => {
    fetch(`${API}/usuario`)
      .then(res => res.json())
      .then(dados => {
        setPerfil(dados);
        setFormulario(dados);
        setFotoPreview(dados.imagem || '');
        setCarregando(false);
      });
  }, []);

  // Atualiza o formulário conforme o usuário digita
  function aoMudar(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  // Quando o usuário escolhe uma nova foto
  function aoTrocarFoto(e) {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setFotoArquivo(arquivo);
      setFotoPreview(URL.createObjectURL(arquivo));
    }
  }

  // Salva as alterações do perfil
  async function aoSalvar(e) {
    e.preventDefault();
    const dados = new FormData();
    if (fotoArquivo) {
      dados.append('imagem', fotoArquivo);
    }
    dados.append('nome', formulario.nome);
    dados.append('idade', formulario.idade);
    dados.append('rua', formulario.rua);
    dados.append('bairro', formulario.bairro);
    dados.append('estado', formulario.estado);
    dados.append('biografia', formulario.biografia);
    const resposta = await fetch(`${API}/usuario`, {
      method: 'POST',
      body: dados
    });
    const perfilAtualizado = await resposta.json();
    setPerfil(perfilAtualizado);
    setFormulario(perfilAtualizado);
    setFotoPreview(perfilAtualizado.imagem || '');
    setFotoArquivo(null);
    setEditando(false);
  }

  // Enquanto carrega, mostra uma mensagem simples
  if (carregando) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white">Carregando seu perfil...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-4">
      <div className="w-full max-w-md cartao-perfil">
        {/* Foto do usuário */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-white p-1 rounded-full shadow border-2 border-blue-200">
            <img
              src={(!editando ? (perfil.imagem ? `${API}${perfil.imagem}` : '') : fotoPreview) || 'https://ui-avatars.com/api/?name=Usuario&background=E0E7EF&color=3B82F6'}
              alt="Foto do perfil"
              className="avatar-perfil"
            />
          </div>
        </div>
        <div className="mt-16">
          {/* Exibe os dados ou o formulário */}
          {!editando ? (
            <div className="text-center">
              <h2 className="titulo-perfil">
                {perfil.nome || <span className='texto-cinza-claro'>Seu nome</span>}
              </h2>
              <p className="texto-cinza mb-2">
                {perfil.idade ? perfil.idade + ' anos' : <span className='texto-cinza-claro'>Idade</span>}
              </p>
              <p className="texto-cinza mb-2">
                {perfil.rua || <span className='texto-cinza-claro'>Rua</span>}, {perfil.bairro || <span className='texto-cinza-claro'>Bairro</span>} - {perfil.estado || <span className='texto-cinza-claro'>Estado</span>}
              </p>
              <p className="texto-cinza mb-4 italic">
                {perfil.biografia || <span className='texto-cinza-claro'>Sua biografia</span>}
              </p>
              <button
                onClick={() => setEditando(true)}
                className="botao-azul"
              >
                Editar Perfil
              </button>
            </div>
          ) : (
            <form onSubmit={aoSalvar} className="space-y-4">
              <div className="flex flex-col items-center">
                <label className="label-perfil">Foto de Perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={aoTrocarFoto}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {fotoPreview && (
                  <img
                    src={fotoPreview}
                    alt="Prévia da foto"
                    className="avatar-perfil mt-2 mx-auto"
                  />
                )}
              </div>
              <div>
                <label className="label-perfil">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formulario.nome}
                  onChange={aoMudar}
                  className="input-perfil"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="label-perfil">Idade</label>
                  <input
                    type="number"
                    name="idade"
                    value={formulario.idade}
                    onChange={aoMudar}
                    className="input-perfil"
                    placeholder="Sua idade"
                  />
                </div>
                <div className="flex-1">
                  <label className="label-perfil">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={formulario.estado}
                    onChange={aoMudar}
                    className="input-perfil"
                    placeholder="Seu estado"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="label-perfil">Rua</label>
                  <input
                    type="text"
                    name="rua"
                    value={formulario.rua}
                    onChange={aoMudar}
                    className="input-perfil"
                    placeholder="Sua rua"
                  />
                </div>
                <div className="flex-1">
                  <label className="label-perfil">Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formulario.bairro}
                    onChange={aoMudar}
                    className="input-perfil"
                    placeholder="Seu bairro"
                  />
                </div>
              </div>
              <div>
                <label className="label-perfil">Biografia</label>
                <textarea
                  name="biografia"
                  value={formulario.biografia}
                  onChange={aoMudar}
                  className="textarea-perfil"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="botao-azul"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="botao-cinza"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 