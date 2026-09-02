# 📋 API de Reclamações

API desenvolvida em **Node.js + Express** para cadastrar e gerenciar reclamações.

## 🚀 Tecnologias

* Node.js
* Express
* JavaScript
* JSON

## 📌 Funcionalidades

A API possui operações CRUD:

| Método | Rota               | Função             |
| ------ | ------------------ | ------------------ |
| GET    | `/`                | Documentação       |
| GET    | `/reclamacoes`     | Listar reclamações |
| GET    | `/reclamacoes/:id` | Buscar por ID      |
| POST   | `/reclamacoes`     | Criar reclamação   |
| PUT    | `/reclamacoes/:id` | Alterar reclamação |
| DELETE | `/reclamacoes/:id` | Excluir reclamação |

## ▶️ Como executar

```bash
npm install
node index.js
```

Servidor:

```text
http://localhost:3000
```

## 💾 Armazenamento

Os dados são armazenados em um **array na memória**, sem banco de dados.

