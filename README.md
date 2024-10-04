# API Documentation

## 1. Criar Documento

**Método:** `POST`  
**Endpoint:** `/api/documents`

**Parâmetros:**

**Body (JSON):**
```json
{
    "name": "Documento Teste",
    "status": "ativo",
    "userId": 1
}
```

**Autenticação:** Token JWT necessário.

**Resposta de sucesso (201):**
```json
{
    "id": 1,
    "name": "Documento Teste",
    "status": "ativo",
    "userId": 1
}
```

## 2. Listar Documentos

**Método:** `GET`  
**Endpoint:** `/api/documents`

**Parâmetros:** Nenhum

**Resposta de sucesso (200):**
```json
[
    {
        "id": 1,
        "name": "Documento Teste",
        "status": "ativo",
        "userId": 1
    },
    {
        "id": 2,
        "name": "Documento Exemplo",
        "status": "inativo",
        "userId": 2
    }
]
```

## 3. Buscar Documentos por Usuário

**Método:** `GET`  
**Endpoint:** `/api/documents/user/:userId`

**Parâmetros:**

**URL:**
- `:userId`: ID do usuário (Exemplo: `/api/documents/user/1`)

**Resposta de sucesso (200):**
```json
[
    {
        "id": 1,
        "name": "Documento Teste",
        "status": "ativo",
        "userId": 1
    }
]
```

## 4. Atualizar Documento

**Método:** `PUT`  
**Endpoint:** `/api/documents/:id`

**Parâmetros:**

**URL:**
- `:id`: ID do documento (Exemplo: `/api/documents/1`)

**Body (JSON):**
```json
{
    "name": "Documento Atualizado",
    "status": "inativo"
}
```

**Autenticação:** Token JWT necessário.

**Resposta de sucesso (200):**
```json
{
    "id": 1,
    "name": "Documento Atualizado",
    "status": "inativo",
    "userId": 1
}
```

## 5. Deletar Documento

**Método:** `DELETE`  
**Endpoint:** `/api/documents/:id`

**Parâmetros:**

**URL:**
- `:id`: ID do documento (Exemplo: `/api/documents/1`)

**Autenticação:** Token JWT necessário.

**Resposta de sucesso (204):** Nenhum conteúdo (somente status 204)

# Autenticação

## 1. Login

**Método:** `POST`  
**Endpoint:** `/api/auth/login`

**Parâmetros:**

**Body (JSON):**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Resposta de sucesso (200):**
```json
{
    "token": "jwt_token_aqui"
}
```

# Instruções para Rodar o Projeto

Clone o repositório:
```bash
git clone <url_do_repositorio>
cd <nome_do_projeto>
```

Instale as dependências:
```bash
npm install
```

Configure as variáveis de ambiente (opcional):

Crie um arquivo `.env` com as variáveis necessárias, como `PORT`

Inicie o servidor:
```bash
$ cd backend/
$ npm start
```

Acesse a API:

A API estará rodando em `http://localhost:8080` (ou outra porta definida nas variáveis de ambiente).

Inicie o frontend:

Inicie o servidor:
```bash
$ cd frontend/
$ npm run dev
```

O frontend estará rodando em `http://localhost:3000`  (ou outra porta definida nas variáveis de ambiente).