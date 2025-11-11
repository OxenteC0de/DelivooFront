<p align="center">
<img src="./src/assets/logo.png" alt="Logo Delivoo" width="350"/>
</p>

### 📅 Data
11/11/2025 

---

🍔 **Delivoo — O sabor que chega voando**

Somos uma plataforma de delivery de alimentos que conecta você aos melhores restaurantes da sua cidade — com apenas alguns cliques, seu prato favorito está a caminho.

Mais do que entregas, oferecemos **experiências**.
Seja um almoço no trabalho, um jantar especial ou aquele lanche de madrugada, a **Delivoo** está sempre pronta para levar sabor até você.

Com **tecnologia inteligente, logística eficiente e um cardápio variado**, nossa missão é transformar sua fome em felicidade — todos os dias, a qualquer hora.

---

🧩 **Funcionalidades por Módulo**

👤 **Usuário**

- Criar, listar, editar e excluir conta com segurança.

- Gerenciamento completo de autenticação e permissões.

🍱 **Categoria**

- Cadastrar, filtrar e buscar categorias de alimentos.

- Associação direta com produtos cadastrados.

🛒 **Produto**

- Criar, visualizar, atualizar e excluir produtos.

- Controle de estoque e vinculação a categorias.

---

⚙️ **Funcionalidade Adicional**

Implementamos um recurso para recomendar produtos saudáveis aos usuários.

Em um cenário em que o consumo de alimentos ultraprocessados e pouco nutritivos tem crescido de forma acelerada, o papel da tecnologia na promoção de hábitos alimentares saudáveis torna-se fundamental.

A funcionalidade “Produtos Saudáveis” da **Delivoo** foi pensada justamente para contribuir com essa causa.
Através dela, o sistema é capaz de recomendar e destacar alimentos mais equilibrados, ajudando os usuários a fazerem escolhas conscientes e benéficas à saúde no momento do pedido.

Além de facilitar a navegação e personalizar a experiência, esse recurso reforça o compromisso da plataforma com o bem-estar dos consumidores, incentivando práticas alimentares mais sustentáveis e equilibradas.

---

**Principais Métodos**

```bash
@Get('/recomendacoes')
recomendarProdutosSaudaveis(): Promise<Produto[]> {
  return this.produtoService.recomendarProdutosSaudaveis();
}

@Patch(':id/saudavel')
marcaSaudavel(@Param('id') id: number): Promise<Produto> {
  return this.produtoService.marcarSaudavel(id);
}

@Patch(':id/nao-saudavel')
marcaNaoSaudavel(@Param('id') id: number): Promise<Produto> {
  return this.produtoService.marcarNaoSaudavel(id);
}
```

**Descrição dos métodos**

- recomendarProdutosSaudaveis(): Retorna uma lista de produtos recomendados como saudáveis.

- marcaSaudavel(id: number): Marca um produto como saudável.

- marcaNaoSaudavel(id: number): Marca um produto como não saudável.

---

🧠 **Tecnologias Utilizadas**

- TypeScript: Linguagem utilizada para tipagem e estruturação do código.
- NestJS: Framework Node.js utilizado para criar a API.
- MySQL: Banco de dados relacional do projeto.
- TypeORM: ORM para mapeamento e manipulação de entidades.
- Insomnia: Testes e requisições HTTP da API.
- JWT (JSON Web Token):	Autenticação segura dos usuários.
- Render:	Plataforma de deploy utilizada.

---

💻 **Como Rodar o Projeto**

🧾 **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

- Git
- Node.js (LTS)
- npm ou Yarn
- PostgreSQL

---

🚀 **Passo a Passo**

1️⃣ **Clonar o repositório**
```bash
git clone https://github.com/OxenteC0de/Delivoo.git
cd Delivoo
```

2️⃣ **Instalar as dependências**
```bash
npm install
```

3️⃣ **Configurar o banco de dados**

No arquivo app.module.ts, configure suas credenciais:
```bash
 TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_delivoo',
      entities: [],
      synchronize: true,
    })
```

4️⃣ **Rodar o projeto**
```bash
npm run start:dev
```

---

✅ O servidor estará disponível em: 

👉 http://localhost:4000

---

**Equipe Responsável**

David Barbosa – Desenvolvedor, documentação

Dilvani – Desenvolvedora, identidade visual

Janaína Bezerra – Desenvolvedora

Karine Santos – Desenvolvedora

Tauane Soares – Desenvolvedora

William Almeida – Scrum Master (líder), desenvolvedor

Winnie Sant’Ana – Desenvolvedora
