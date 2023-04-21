const axios = require('axios');

exports.post = async(req, res, next) => {
    //console.log(req.query)

    /* axios.post('http://localhost:3000/respostas', {
            "clienteId": 1,
            "respostas": "Tudo que posso escrever são apenas palavras jogadas ao vento, onde seu fim é um banco de dados",
            "sentimento": -0.99,
            "palavraChave": "estudo / node / pratica"
        })
        .then(response => console.log(response.data)) //caso retorne um sucesso
    .catch(error => console.log(error)) //caso ocorra algum erro */
    const texto = req.body.text
    const perguntaId = req.body.perguntaId


    axios.post('http://localhost:3000/api/sentimento', {
            "text": texto
        })
        .then(response => {
            //console.log(response.data)
            registraResposta(response.data)
        }) //caso retorne um sucesso
        .catch(error => console.log(error)) //caso ocorra algum erro


    const registraResposta = (sentimento) => {
        //console.log(sentimento)

        const sentiment = sentimento.sentiment.document.score
        const categories = sentimento.categories

        const arrayCategories = categories.map(item => {
            //console.log(item.label)
            return item.label
        })

        let body = {
            "perguntaId": perguntaId,
            "respostas": texto,
            "sentimento": sentiment,
            "palavraChave": arrayCategories.join('')
        }

        axios.post('http://localhost:3000/respostas', body)
            .then(response => {
                console.log(response.data)
                res.status(201).send({
                    mensagem: "Resposta inserida com sucesso!",
                    response: response.data
                });
            }) //caso retorne um sucesso
            .catch(error => console.log(error)) //caso ocorra algum erro
    }



};