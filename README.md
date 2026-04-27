# API Aluguel de Bicicletas 🚴‍♂️

## 📌 Descrição
API REST desenvolvida em Node.js para gerenciamento de aluguel de bicicletas.

## 🚀 Tecnologias
- Node.js
- Express
- PostgreSQL
- Sequelize
- Dotenv

## ⚙️ Funcionalidades
- CRUD de Planos
- CRUD de Aluguéis
- Cálculo automático do valor do aluguel baseado no tempo de uso
- Integração com banco PostgreSQL

## 🔗 Endpoints principais

### Planos
- POST /planos
- GET /planos
- GET /planos/:id
- PUT /planos/:id
- DELETE /planos/:id

### Aluguéis
- POST /alugueis
- GET /alugueis
- GET /alugueis/:id
- PUT /alugueis/:id
- DELETE /alugueis/:id

## 🧠 Regra de negócio
O sistema calcula automaticamente:
- Tempo de utilização em horas
- Valor total com base no plano escolhido
