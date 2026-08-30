# Financas

Dashboard de financas pessoais para controle de receitas e despesas, com categorias personalizadas e visualizacao grafica.

## Tecnologias

**Backend**
- Java 21
- Spring Boot 4.0.0
- Hibernate / JPA
- SQL Server

**Frontend**
- Angular 21
- TypeScript 5.9
- Chart.js

## Funcionalidades

- Dashboard com resumo de saldo, receitas e despesas
- Grafico de despesas por categoria
- CRUD de categorias com cor e icone personalizado
- CRUD de transacoes vinculadas a categorias
- Navegacao com sidebar e titulo dinamico por tela

## Como rodar

### Pre-requisitos

- Java 21+
- Node.js 24+
- SQL Server com um banco chamado `financas`

### Backend

```bash
cd API
./mvnw spring-boot:run
```

O servidor sobe na porta `8081`. Configure as credenciais do banco em `application.properties` ou via variaveis de ambiente.

### Frontend

```bash
cd WEB
npm install
npm start
```

Acesse em `http://localhost:4200`. O proxy redireciona chamadas `/api` para o backend na porta 8081.

## Estrutura do projeto

```
API/                  # Backend Spring Boot
  src/main/java/com/financas/
    categoria/        # Entidade, controller, service, repository
    transacao/        # Entidade, controller, service, repository
    dashboard/        # Endpoint de resumo financeiro

WEB/                  # Frontend Angular
  src/app/
    categorias/       # Tela de categorias
    transacoes/       # Tela de transacoes
    dashboard/        # Tela principal com graficos
    models/           # Interfaces e DTOs
```

## Screenshots

*Em breve*
