# Perfil de Usuário — Protótipo Web

Este projeto é uma página de perfil de usuário moderna, onde você pode editar seus dados, trocar a foto de perfil e salvar tudo em um banco MySQL.

## O que você precisa
- Node.js (recomendado v18 ou superior)
- MySQL instalado e rodando

## Como rodar o projeto localmente

1. Instale o Node.js e o MySQL.

2. Crie o banco `perfil_usuario` e a tabela `usuario` no MySQL:

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

3. Na pasta `backend`, rode:
   npm install
    Crie o arquivo .env com os dados do seu MySQL
   node index.js
4. Na pasta `frontend`, rode:
   npm install
   npm start


Pronto! O site abre no navegador e salva os dados no banco.
>>>>>>> 77f653d (Primeiro commit do projeto de perfil de usuário)
