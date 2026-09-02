const express = require('express')
const App = express()

App.use(express.json())

let lista_de_reclamacoes = [
    {
        "id": 1,
        "titulo": "Perdeu o controle do carro",
        "descricao": "O jogador ficou preso dentro do carro em chamas.",
        "categoria": "Física/Veículos",
        "autor": "Marcos",
        "prioridade": "Alta",
        "status": "Aberta",
        "dataCriacao": "10/06/2024 14:30"
    }
]

App.get('/', (req, res) => {
    res.status(200).json({
        "mensagem": "API de Reclamações",
        "rotas": {
            "GET /": "Mostra a documentação da API",
            "GET /reclamacoes": "Lista todas as reclamações",
            "GET /reclamacoes/:id": "Busca uma reclamação pelo ID",
            "POST /criar": "Cadastra uma nova reclamação",
            "PUT /reclamacoes/:id": "Altera uma reclamação existente",
            "DELETE /reclamacoes/:id": "Remove uma reclamação pelo ID"
        }
    })
})

App.get('/reclamacoes', (req, res) => {
    res.status(200).json(lista_de_reclamacoes)
})
App.get('/reclamacoes/:id', (req, res) => {
    const id = req.params.id
    const reclamacao = lista_de_reclamacoes.find(
        (reclamacao) => reclamacao.id == id
    )
    if (!reclamacao) {
        return res.status(404).json({
            "mensagem": "Reclamação não encontrada"
        })
    }

    res.status(200).json(reclamacao)
})

App.post('/criar', (req, res) => {

    const {
        titulo,
        descricao,
        categoria,
        autor,
        prioridade,
        status
    } = req.body

    if (!titulo || !descricao || !categoria || !autor || !prioridade || !status) {
        return res.status(400).json({
            "mensagem": "Todos os campos são obrigatórios"
        })
    }

    let identificacao = lista_de_reclamacoes.length + 1

    const agora = new Date()

    const dataCriacao =
        agora.toLocaleDateString('pt-BR') + ' ' +
        agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })

    const novaReclamacao = {
        "id": identificacao,
        "titulo": titulo,
        "descricao": descricao,
        "categoria": categoria,
        "autor": autor,
        "prioridade": prioridade,
        "status": status,
        "dataCriacao": dataCriacao
    }

    lista_de_reclamacoes.push(novaReclamacao)

    res.status(201).json(novaReclamacao)
})

App.put('/reclamacoes/:id', (req, res) => {

    const id = req.params.id

    const {
        titulo,
        descricao,
        categoria,
        autor,
        prioridade,
        status
    } = req.body

    const reclamacao = lista_de_reclamacoes.find(
        (reclamacao) => reclamacao.id == id
    )

    if (!reclamacao) {
        return res.status(404).json({
            "mensagem": "Reclamação não encontrada"
        })
    }

    if (!titulo || !descricao || !categoria || !autor || !prioridade || !status) {
        return res.status(400).json({
            "mensagem": "Todos os campos são obrigatórios"
        })
    }

    reclamacao.titulo = titulo
    reclamacao.descricao = descricao
    reclamacao.categoria = categoria
    reclamacao.autor = autor
    reclamacao.prioridade = prioridade
    reclamacao.status = status

    res.status(200).json(reclamacao)
})

App.delete('/reclamacoes/:id', (req, res) => {

    const id = req.params.id

    const reclamacao = lista_de_reclamacoes.find(
        (reclamacao) => reclamacao.id == id
    )

    if (!reclamacao) {
        return res.status(404).json({
            "mensagem": "Reclamação não encontrada"
        })
    }

    lista_de_reclamacoes = lista_de_reclamacoes.filter(
        (reclamacao) => reclamacao.id != id
    )

    res.status(200).json({
        "mensagem": "Reclamação removida"
    })
})

App.listen(3000, () => {
    console.log('Servidor Online')
})
