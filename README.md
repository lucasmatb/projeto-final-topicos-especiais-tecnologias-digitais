# Minha Revenda de Carros

(V) Repositório público com README.

(V) Arquivo .zip anexado no Moodle.

(V) CRUD completo: GET / POST / PUT / DELETE funcionando.

(V) Rotas e filtros por URL implementados.

(V) Tratamento de status codes e mensagens ao usuário.

(V) Loading e feedbacks de erro.

(V) README com endpoints e instruções de execução.

(V) (Opcional) Autenticação com token salvo em cookie — bônus.

(X) (Opcional) Vídeo demonstrativo ≤ 5 min. (Vou apresentar)

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

**Projeto Didático Completo para Ensinar React, APIs REST e Docker**

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Docker](#-docker) • [Estrutura](#-estrutura-do-projeto) • [Conceitos](#-conceitos-ensinados)

</div>

---

## 📋 Sobre o Projeto

Este é um projeto **educacional completo** criado para ensinar desenvolvimento web moderno. Ele implementa um sistema de gerenciamento de músicas (CRUD completo) com:

- ✅ **Frontend moderno** em React + TypeScript
- ✅ **API REST fake** com JSON Server
- ✅ **Design responsivo** e bonito com TailwindCSS
- ✅ **Todas as operações HTTP**: GET, POST, PUT, DELETE
- ✅ **Docker** pronto para produção
- ✅ **Código 100% comentado** em português

---

## ✨ Funcionalidades

### CRUD Completo

- 📖 **GET** - Listar todas as músicas
- ➕ **POST** - Adicionar nova música
- ✏️ **PUT** - Editar música existente
- 🗑️ **DELETE** - Remover música

### Interface Moderna

- 🎨 Design dark mode com gradientes
- 📱 Totalmente responsivo (mobile-first)
- 🔍 Busca em tempo real
- ✨ Animações suaves
- 🖼️ Cards com preview de imagem (imagem padrão fusca se não houver URL)
- ⚡ Feedback visual (loading, toasts, etc.)

---

## 🛠️ Tecnologias

### Frontend

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **TailwindCSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones modernos

### Backend

- **JSON Server** - API REST fake automática

### DevOps

- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Servidor web

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Docker** (opcional, para containerização)

### Passo 1: Clone o Repositório

```bash
git clone <url-do-repositorio>
cd front-exemplo-react
```

### Passo 2: Instale as Dependências

#### Frontend

```bash
npm install
```

#### Backend (API)

```bash
cd api
npm install
cd ..
```

### Passo 3: Configure as Variáveis de Ambiente

```bash
cp .env.example .env
```

O arquivo `.env` já está configurado com valores padrão para desenvolvimento.

### Passo 4: Execute o Projeto (Usar Docker Compose)

```bash
docker-compose up --build
```

Acesse:
- **Frontend**: `http://localhost:3000`
- **API**: `http://localhost:3001`

### Docker Compose Completo

O `docker-compose.yml` já está configurado para subir frontend + backend:

```bash
# Subir tudo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down

# Reconstruir e subir
docker-compose up --build
```

## 📝 Licença

Este projeto é livre para uso educacional.

---

## 👨‍💻 Autor

Projeto criado para ensinar desenvolvimento web moderno com foco em:
- React e TypeScript
- APIs REST
- Docker e DevOps
- Boas práticas de código

---

## ⭐ Comandos Rápidos

```bash
# Desenvolvimento
npm run dev              # Inicia dev server
npm run build            # Build para produção
npm run preview          # Preview do build

# API
cd api && npm start      # Inicia JSON Server

# Docker
docker-compose up -d     # Sobe tudo em background
docker-compose down      # Para tudo
docker-compose logs -f   # Ver logs em tempo real

# Linting
npm run lint             # Verifica código

```

### Endpoints da API

A aplicação consome uma API REST rodando em `http://localhost:3001`.

- **GET** `http://localhost:3001/carros`
  Retorna a lista completa de veículos.

- **POST** `http://localhost:3001/carros`
  Cria um novo registro de veículo.

- **PUT** `http://localhost:3001/carros/:id`
  Atualiza todos os dados de um veículo específico (substitua `:id` pelo ID do carro).

- **DELETE** `http://localhost:3001/carros/:id`
  Remove um veículo do banco de dados (substitua `:id` pelo ID do carro).