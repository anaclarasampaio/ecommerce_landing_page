# Ecommerce 

Aplicação fullstack de e-commerce com Node.js/Express + React/Vite.

## Stack

| Camada   | Tecnologias                                      |
|----------|--------------------------------------------------|
| Backend  | Node.js, Express, TypeScript, Prisma, PostgreSQL |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS         |
| Banco    | PostgreSQL 16 via Docker                         |
| Auth     | JWT + bcryptjs                                   |

## Estrutura

```
ecommerce/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Modelos: User, Product, Category, Order
│   │   └── seed.ts            # 16 produtos eletrônicos de exemplo
│   └── src/
│       ├── controllers/       # auth, product, category, order
│       ├── middlewares/       # JWT auth, error handler
│       └── routes/
├── frontend/
│   └── src/
│       ├── components/        # Navbar, ProductCard, ProductModal, CartDrawer
│       ├── contexts/          # AuthContext, CartContext, ThemeContext
│       └── pages/             # Home, Products, Login, Register, Orders, Checkout
└── docker-compose.yml
```

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

## Setup

### 1. Clone e variáveis de ambiente

```bash
git clone https://github.com/anaclarasampaio/ecommerce.git
cd ecommerce
cp backend/.env.example backend/.env
```

Abra `backend/.env` e defina um valor para `JWT_SECRET`:

```env
JWT_SECRET=qualquer_string_secreta_aqui
```

### 2. Banco de dados

```bash
docker compose up -d
```

### 3. Backend

```bash
cd backend
npm install
npx prisma migrate deploy   # aplica as migrations existentes
npm run seed                 # popula o banco com 16 produtos eletrônicos
npm run dev                  # inicia em http://localhost:3333
```

### 4. Frontend

Abra um novo terminal:

```bash
cd frontend
npm install
npm run dev                  # inicia em http://localhost:5173
```

Acesse **http://localhost:5173** no navegador.

> **WSL2:** o navegador do Windows não acessa `localhost` do WSL diretamente.
> Use o IP que aparecer em **Network** no terminal do Vite, ex: `http://172.19.x.x:5173`

---

## Variáveis de ambiente (backend)

| Variável         | Padrão                                                    | Descrição               |
|------------------|-----------------------------------------------------------|-------------------------|
| `PORT`           | `3333`                                                    | Porta do servidor       |
| `DATABASE_URL`   | `postgresql://postgres:postgres@localhost:5432/ecommerce` | String de conexão       |
| `JWT_SECRET`     | —                                                         | Chave JWT (obrigatória) |
| `JWT_EXPIRES_IN` | `7d`                                                      | Expiração do token      |
| `DB_USER`        | `postgres`                                                | Usuário do banco        |
| `DB_PASSWORD`    | `postgres`                                                | Senha do banco          |
| `DB_NAME`        | `ecommerce`                                               | Nome do banco           |

## Endpoints da API

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/products          ?search=&categoryId=&page=&limit=
GET    /api/products/:id
POST   /api/products          (auth)
PUT    /api/products/:id      (auth)
DELETE /api/products/:id      (auth)

GET    /api/categories
POST   /api/categories        (auth)
PUT    /api/categories/:id    (auth)
DELETE /api/categories/:id    (auth)

GET    /api/orders            (auth)
GET    /api/orders/:id        (auth)
POST   /api/orders            (auth)

GET    /api/health
```

## Funcionalidades

- Listagem de produtos com busca em tempo real
- Modal de detalhe do produto
- Carrinho de compras com Context API (quantidade, total, drawer lateral)
- Fluxo de checkout em dois passos com integração à API
- Autenticação com JWT (registro e login)
- Dark mode com persistência no localStorage
