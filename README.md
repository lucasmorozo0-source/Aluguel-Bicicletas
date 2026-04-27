# API Aluguel de Bicicletas 🚴‍♂️

## 📌 Descrição
API REST desenvolvida em Node.js para gerenciamento de aluguel de bicicletas.

## 🚀 Tecnologias
- Node.js
- Express
- PostgreSQL
- Sequelize

## ⚙️ Funcionalidades
- CRUD de Planos
- CRUD de Aluguéis
- Cálculo automático do valor do aluguel baseado no tempo de uso

## 🔗 Endpoints principais
- POST /planos
- GET /planos
- POST /alugueis
- GET /alugueis

## 🧠 Regra de negócio
O sistema calcula automaticamente:
- Tempo de utilização (em horas)
- Valor total com base no plano escolhido
