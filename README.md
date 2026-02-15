# Q&A Management Server

## 📋 Objetivo do Projeto

Desenvolver uma **Single Page Application (SPA)** para gerenciamento centralizado de perguntas e respostas. A aplicação proporciona uma experiência completa de CRUD (Create, Read, Update, Delete), permitindo que usuários criem múltiplas perguntas, associem respostas reutilizáveis em relação muitos-para-muitos (ManyToMany), e gerencie todo o ciclo de vida dessas entidades. O projeto é desenvolvido em **Node.js + TypeScript** (mock API backend), sem dependência de banco de dados externo.

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### 1️⃣ Instalação das Dependências

```bash
# Backend
cd backend
npm install

### 2️⃣ Configuração do Ambiente

```bash
# Backend
cd backend
cp .env.example .env

### 3️⃣ Seedar o Banco de Dados (Opcional)

```bash
cd backend
npm run seed
```

### 4️⃣ Executar os Servidores

```bash
# Backend (Terminal 1)
cd backend
npm run dev
# Servidor rodando em http://localhost:3000

### 5️⃣ Acessar a Aplicação

Abra o navegador em: **http://localhost:3000**

## 🧪 Testes

```bash
# Backend (testes unitários com Vitest)
cd backend
npm test

# Coverage
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (env)
│   │   ├── controllers/     # Controladores REST
│   │   ├── middleware/      # Middlewares (error handler)
│   │   ├── models/          # Tipos TypeScript
│   │   ├── routes/          # Rotas Express
│   │   ├── services/        # Lógica de negócio
│   │   ├── storage/         # Database (Lowdb) e seeds
│   │   ├── validators/      # Schemas Zod
│   │   └── server.ts        # Entry point
│   └── tests/               # Testes Vitest
```

## 🛠️ Stack Tecnológico

### Backend
- **Node.js 18+** - Runtime
- **Express 4** - Web Framework
- **TypeScript 5** - Type Safety
- **Lowdb 7** - JSON Database
- **Zod 3** - Schema Validation
- **Vitest** - Testing Framework
- **UUID** - ID Generation

## 📋 API Endpoints

### Answers
- `GET /api/answers` - Listar todas as respostas
- `GET /api/answers/:id` - Buscar resposta por ID
- `POST /api/answers` - Criar nova resposta
- `PUT /api/answers/:id` - Atualizar resposta
- `DELETE /api/answers/:id` - Deletar resposta (cascading)

### Questions
- `GET /api/questions` - Listar todas as perguntas
- `GET /api/questions/:id` - Buscar pergunta por ID
- `POST /api/questions` - Criar nova pergunta
- `PUT /api/questions/:id` - Atualizar pergunta
- `DELETE /api/questions/:id` - Deletar pergunta
- `POST /api/questions/:id/answers` - Associar respostas
