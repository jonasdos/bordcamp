# bordcamp

#### BoardCamp é um sistema de gerenciamento para uma locadora de jogos de tabuleiro, que visa facilitar o controle de aluguéis, estoque de jogos e cadastro de clientes. Este projeto aplica conceitos de Banco de Dados Relacional (SQL) para manipulação e organização dos dados da locadora.

## Rotas e Funcionalidades CRUD
### Jogos (Tabela Games)
- GET /games - Lista todos os jogos.
- POST /games - Adiciona um novo jogo com validação de dados.
### Clientes (Tabela customers)
- GET /customers - Lista todos os clientes.
- GET /customers/:id Busca um cliente por ID.
- POST /customers - Cadastra um cliente com validações de CPF e telefone.
### Aluguéis (Tabela rentals)
- GET /rentals - Lista todos os aluguéis, com dados de cliente e jogo.
- POST /rentals - Realiza um aluguel, verificando a disponibilidade de estoque.
- POST /rentals/:ID/return - Finaliza um aluguel, calculando multa por atraso.
- DELETE /rentals/:id - Exclui um aluguel se não finalizado.

### Script para criar o banco de dados
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  "stockTotal" INTEGER NOT NULL,
  "pricePerDay" INTEGER NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  cpf VARCHAR(11) NOT NULL
);

CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  "customerId" INTEGER NOT NULL,
  "gameId" INTEGER NOT NULL,
  "rentDate" DATE NOT NULL,
  "daysRented" INTEGER NOT NULL,
  "returnDate" DATE,
  "originalPrice" INTEGER NOT NULL,
  "delayFee" INTEGER
);
