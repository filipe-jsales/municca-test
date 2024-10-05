# API Documentation

Esse é um projeto desenhado com a finalidade de um teste de entrevista técnica

**Objetivo**: Criar uma API básica utilizando Node.js e Prisma, focando na estruturação de rotas, controllers, e models. O candidato deverá modelar os dados com o Prisma, mas não será necessário criar um banco de dados real. O objetivo é avaliar a capacidade de estruturar corretamente as entidades, rotas e controllers, bem como a qualidade da documentação.


**Explicação**: No frontend apenas faço um CRUD, onde ao criar um usuário novo é possível logar com o mesmo obtendo um jwt token para poder fazer algumas operações como criar documento para um usuário, deletar e atualizar. Fiz dois modelos de delete, um deletando fisicamente e outro com um soft delete.

**Backend**: O backend é responsável pela criação de usuários e autenticação via JWT. Ele também permite criar, listar, atualizar e deletar documentos relacionados a um usuário.
**Frontend**: O frontend é um simples CRUD que permite criar, listar, deletar e atualizar documentos de usuários.


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


## Ambiente de Desenvolvimento com Docker (Opcional)

### 1. Clone o Repositório:
```bash
git clone <url_do_repositorio>
cd <nome_do_projeto>
```

### 2. Criação do Ambiente Docker
O ambiente de desenvolvimento foi configurado para rodar com Docker usando `docker-compose`. Ele inclui dois serviços principais: o backend e o frontend.

### 3. Estrutura de Docker:
#### a) Backend
O backend é configurado para rodar com `nodemon`, permitindo que qualquer mudança no código fonte seja automaticamente refletida no container. Ele roda em Node.js (imagem `node:18-alpine`) e é exposto na porta 8080.

#### b) Frontend
O frontend utiliza o Vite para servir a aplicação React em modo de desenvolvimento. Ele roda na porta 5173 e suporta hot-reloading.

### 4. Configuração do `docker-compose.yml`
O arquivo `docker-compose.yml` orquestra ambos os serviços (frontend e backend) e monta volumes para suportar hot-reloading em ambos os ambientes.

Aqui está um exemplo do arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
    backend:
        build:
            context: ./backend
            dockerfile: Dockerfile
        volumes:
            - ./backend:/usr/src/app
            - /usr/src/app/node_modules
        ports:
            - "8080:8080"
        environment:
            - NODE_ENV=development
        networks:
            - app-network

    frontend:
        build:
            context: ./frontend
            dockerfile: Dockerfile
        volumes:
            - ./frontend:/usr/src/app
            - /usr/src/app/node_modules
        ports:
            - "5173:5173"
        networks:
            - app-network

networks:
    app-network:
        driver: bridge
```

### 5. Como Rodar com Docker
#### a) Subir os containers:
```bash
docker-compose up --build
```
Este comando irá construir as imagens Docker para o backend e frontend, instalar as dependências e rodar os containers.

#### b) Acessar as aplicações:
- **Backend:** Acesse o backend em `http://localhost:8080`.
- **Frontend:** Acesse o frontend em `http://localhost:5173`.

#### c) Parar os containers:
```bash
docker-compose down
```
Isso para todos os containers criados.

