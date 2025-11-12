<img width="780" height="898" alt="image" src="https://github.com/user-attachments/assets/7d151e1f-8e09-4f0c-9731-f4d1ff176f06" /><img width="1695" height="928" alt="image" src="https://github.com/user-attachments/assets/e1dff90b-8135-408e-9d1a-97e32c565491" /><img width="1695" height="928" alt="image" src="https://github.com/user-attachments/assets/6d8753ea-61ff-41d5-ae4a-5c9b0c1fd089" /><p align="center">
<img src="./src/assets/logo.png" alt="Logo Delivoo" width="350"/>
</p>

# 🍔 Delivoo

### O sabor que chega voando

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[Demo ao Vivo](https://delivoo-front.vercel.app) • [Repositório Backend](https://github.com/OxenteC0de/DelivooBack) • [API Documentação](https://delivoo.onrender.com/swagger)

---

## 📋 Sobre o Projeto

**Delivoo** é uma plataforma completa de gestão de cardápios e produtos para restaurantes, desenvolvida com tecnologias modernas e eficientes.

Mais do que um simples sistema de cadastro, o Delivoo oferece uma **experiência intuitiva e profissional** para restaurantes gerenciarem seus produtos, categorias e destacarem opções saudáveis para seus clientes.

### 🎯 Objetivo

Facilitar a gestão de cardápios digitais para restaurantes, permitindo:
- Cadastro rápido e organizado de produtos  
- Categorização eficiente  
- Destaque automático de produtos saudáveis  
- Controle de estoque em tempo real  
- Interface moderna e responsiva  

---

## ✨ Funcionalidades

### 👤 Gestão de Usuários
- ✅ Cadastro e autenticação segura com JWT  
- ✅ Login/Logout com persistência de sessão  
- ✅ Gerenciamento de perfil  

### 🍱 Gestão de Categorias
- ✅ CRUD completo de categorias  
- ✅ Associação de produtos a categorias  
- ✅ Busca e filtros avançados  

### 🛒 Gestão de Produtos
- ✅ CRUD completo de produtos  
- ✅ Upload de fotos (via URL)  
- ✅ Controle de estoque e preços  
- ✅ Marcação de produtos saudáveis  
- ✅ Vinculação a categorias  

### 🌿 Produtos Saudáveis (Diferencial)
Em um cenário onde o consumo de alimentos ultraprocessados tem crescido, o Delivoo implementa um recurso que **recomenda e destaca produtos saudáveis**.

**Funcionalidades:**
- Destaque visual (tag verde)  
- Seção exclusiva na página inicial  
- Endpoints específicos para marcação e busca  

**Endpoints principais:**

```

GET /produto/recomendacoes // Lista produtos saudáveis  
PATCH /produto/:id/saudavel // Marca produto como saudável  
PATCH /produto/:id/nao-saudavel // Remove marcação de saudável

```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18 + TypeScript**  
- **Tailwind CSS** para estilização  
- **React Router** para navegação  
- **Axios** para requisições HTTP  
- **Lucide React** para ícones  
- **React Toastify** para notificações  
- **Context API** para gerenciamento de estado  

### Backend
- **NestJS** (framework Node.js)  
- **TypeORM** para ORM  
- **PostgreSQL** como banco de dados  
- **JWT** para autenticação  
- **Swagger** para documentação da API  
- **bcryptjs** para hash de senhas  

### DevOps
- **Vercel** (deploy do frontend)  
- **Render** (deploy do backend + PostgreSQL)  
- **Git/GitHub** (versionamento)  

---

## 🚀 Como Rodar o Projeto

### 📦 Pré-requisitos
Certifique-se de ter instalado:
- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/) (v18 ou superior)  
- [PostgreSQL](https://www.postgresql.org/) (v14 ou superior)  
---

### 🖥️ Frontend

#### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/OxenteC0de/DelivooFront.git
cd DelivooFront

```

#### 2️⃣ Instalar dependências

```bash
npm install

```

#### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:4000

```

#### 4️⃣ Rodar o projeto

```bash
npm run dev

```

✅ O frontend estará disponível em: [**http://localhost:5173**](http://localhost:5173/)

----------

### ⚙️ Backend

#### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/OxenteC0de/Delivoo
cd Delivoo

```

#### 2️⃣ Instalar dependências

```bash
npm install

```

#### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgres://user:password@localhost:5432/db_delivoo
JWT_SECRET=sua_chave_secreta_aqui
PORT=4000

```

Ou configure diretamente no `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'seu_usuario',
  password: 'sua_senha',
  database: 'db_delivoo',
  synchronize: true, // ⚠️ Apenas em desenvolvimento
  ssl: false,
});

```

#### 4️⃣ Rodar o projeto

```bash
npm run start:dev

```

✅ O backend estará disponível em: [**http://localhost:4000**](http://localhost:4000/)  
✅ Swagger (documentação): [**http://localhost:4000/swagger**](http://localhost:4000/swagger)

----------

## 📸 Screenshots

### 🏠 Home

<img width="1695" height="928" alt="image" src="https://github.com/user-attachments/assets/80d1f196-b322-483d-b0b1-8002351668b8" />

### 📋 Listagem de Produtos

<img width="780" height="898" alt="image" src="https://github.com/user-attachments/assets/fd9b375b-05ea-44b4-86d0-1edf7900d0b6" />

### 🌿 Produtos Saudáveis

<img width="1544" height="606" alt="image" src="https://github.com/user-attachments/assets/091d736f-fa81-4ab4-b635-bb8568177d5d" />

----------

## 🌐 Links do Projeto

-   **Frontend:** [https://delivoo-front.vercel.app](https://delivoo-front.vercel.app/)
-   **Backend API:** [https://delivoo.onrender.com](https://delivoo.onrender.com/)
-   **Swagger:** [https://delivoo.onrender.com/swagger](https://delivoo.onrender.com/swagger)

----------
## 👥 Equipe de Desenvolvimento

| Nome                | Função                        |
| ------------------- | ----------------------------- |
| **William Almeida** | Scrum Master & Dev Full Stack |
| **David Barbosa**   | Desenvolvedor & Documentação  |
| **Dilvani Estrela** | Desenvolvedora & Design       |
| **Janaína Bezerra** | Desenvolvedora                |
| **Karine Santos**   | Desenvolvedora                |
| **Tauane Soares**   | Desenvolvedora                |
| **Winnie Sant'Ana** | Desenvolvedora                |

---
## 📄 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [LICENSE](https://chatgpt.com/c/LICENSE) para mais detalhes.

----------

## 🤝 Contribuindo

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir _issues_ ou _pull requests_.

1.  Faça um fork do projeto
2.  Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3.  Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4.  Push para a branch (`git push origin feature/NovaFeature`)
5.  Abra um Pull Request

----------


Desenvolvido com ❤️ pela equipe **OxenteC0de**
⭐ Deixe uma estrela se este projeto te ajudou!

----------
