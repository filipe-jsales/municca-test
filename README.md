# API Documentation

Esse é um projeto desenhado com a finalidade de um teste de entrevista técnica

**Objetivo**: Criar uma API básica utilizando Node.js e Prisma, focando na estruturação de rotas, controllers, e models. O candidato deverá modelar os dados com o Prisma, mas não será necessário criar um banco de dados real. O objetivo é avaliar a capacidade de estruturar corretamente as entidades, rotas e controllers, bem como a qualidade da documentação.


**Explicação**: No frontend apenas faço um CRUD, onde ao criar um usuário novo é possível logar com o mesmo obtendo um jwt token para poder fazer algumas operações como criar documento para um usuário, deletar e atualizar. Fiz dois modelos de delete, um deletando fisicamente e outro com um soft delete.


## 1. Criar Documento

**Método:** `POST`  
**Endpoint:** `/api/documents`

**Parâmetros:**

**Body (JSON):**
```json
{
    "name": "Documento Teste",
    "userId": 1
}
```

**Autenticação:** Token JWT necessário.

O Token é passado pelo frontend na requisição uma vez que o usuário tenha criado um usuário e feito o login com o mesmo.

**Resposta de sucesso (201):**
```json
{
    "id": 1,
    "name": "Documento Teste",
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
        "userId": 1
    },
    {
        "id": 2,
        "name": "Documento Exemplo",
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
}
```

**Autenticação:** Token JWT necessário.

O Token é passado pelo frontend na requisição uma vez que o usuário tenha criado um usuário e feito o login com o mesmo.

**Resposta de sucesso (200):**
```json
{
    "id": 1,
    "name": "Documento Atualizado",
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

O Token é passado pelo frontend na requisição uma vez que o usuário tenha criado um usuário e feito o login com o mesmo.

**Resposta de sucesso (204):** Nenhum conteúdo (somente status 204)

# Autenticação

## 1. Login

**Método:** `POST`  
**Endpoint:** `/api/auth/login`

**Autenticação:** A autenticação é feita e guardada no localStorage para operações que necessitem dela.

**Parâmetros:**

**Body (JSON):**
```json
{
    "email": "admin@example.com",
    "password": "senhagenerica123"
}
```

**Resposta de sucesso (200):**
```json
{
    "token": "jwt_token_aqui",
    "userId": 1
}
```

# Usuários


## 1. Criar Usuário

**Método:** `POST`  
**Endpoint:** `/api/users`

**Descrição:** Cria um novo usuário. A senha é criptografada antes de ser armazenada no sistema.

**Parâmetros:**

**Body (JSON):**
```json
{
    "name": "Novo Usuário",
    "email": "novo.usuario@example.com",
    "password": "senha123"
}
```

**Resposta de sucesso (201):**
```json
{
    "id": 2,
    "name": "Novo Usuário",
    "email": "novo.usuario@example.com",
    "createdAt": "2024-10-04T12:34:56.789Z",
    "deletedAt": null
}
```

## 2. Listar Usuários

**Método:** `GET`  
**Endpoint:** `/api/users`

**Descrição:** Retorna todos os usuários cadastrados que não foram deletados (soft delete).

**Resposta de sucesso (200):**
```json
[
    {
        "id": 1,
        "name": "Admin",
        "email": "admin@example.com",
        "createdAt": "2024-10-03T10:20:30.000Z",
        "deletedAt": null
    },
    {
        "id": 2,
        "name": "Novo Usuário",
        "email": "novo.usuario@example.com",
        "createdAt": "2024-10-04T12:34:56.789Z",
        "deletedAt": null
    }
]
```

## 3. Buscar Usuário por ID

**Método:** `GET`  
**Endpoint:** `/api/users/:id`

**Parâmetros:**

**URL:**
- `:id`: ID do usuário (Exemplo: `/api/users/1`)

**Resposta de sucesso (200):**
```json
{
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "createdAt": "2024-10-03T10:20:30.000Z",
    "deletedAt": null
}
```

**Resposta de erro (404):**
```json
{
    "message": "Usuário não encontrado"
}
```

## 4. Atualizar Usuário

**Método:** `PUT`  
**Endpoint:** `/api/users/:id`

**Parâmetros:**

**URL:**
- `:id`: ID do usuário (Exemplo: `/api/users/1`)

**Body (JSON):**
```json
{
    "name": "Nome Atualizado",
    "email": "email.atualizado@example.com"
}
```

**Resposta de sucesso (200):**
```json
{
    "id": 1,
    "name": "Nome Atualizado",
    "email": "email.atualizado@example.com"
}
```

**Resposta de erro (404):**
```json
{
    "message": "Usuário não encontrado"
}
```

## 5. Deletar Usuário (Soft Delete)

**Método:** `DELETE`  
**Endpoint:** `/api/users/:id`

<!-- **Descrição:** Marca o usuário como deletado, preenchendo o campo `deletedAt` com a data e hora da exclusão. O usuário não é removido fisicamente. -->

**Parâmetros:**

**URL:**
- `:id`: ID do usuário (Exemplo: `/api/users/1`)

**Resposta de sucesso (204):** Nenhum conteúdo (somente status 204)

**Resposta de erro (404):**
```json
{
    "message": "Usuário não encontrado"
}
```

## 6. Buscar Usuário por Email

**Método:** `GET`  
**Endpoint:** `/api/users/email/:email`

**Parâmetros:**

**URL:**
- `:email`: Email do usuário (Exemplo: `/api/users/email/admin@example.com`)

**Resposta de sucesso (200):**
```json
{
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "createdAt": "2024-10-03T10:20:30.000Z",
    "deletedAt": null
}
```

**Resposta de erro (404):**
```json
{
    "message": "Usuário não encontrado"
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