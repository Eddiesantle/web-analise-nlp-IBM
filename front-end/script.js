$(function() {

    let text = decodeURI(window.location.search.replace('?resposta=', ''))
    console.log(text)
    if (text) {
        $("#texto").val(text)
        fetchAnaliseSentimento()
    }


})

const fetchRequisicao = () => {
    const url = 'http://localhost:3000/persons/'

    fetch(url)
        .then(response => response.json()
            .then(data => {
                //console.log(data[0])

                const myUsers = data[0]
                const usersByLikes = myUsers.map(item => {

                    //console.log(item)
                    //console.log(item.title)
                    //console.log(item.url)

                    $("#person").append(`
                    <div class="card">
                        <div class="card-body">
                            
                            <p class="card-text">${item.title}</p>
                            <a href="${item.url}" class="card-link"><img src="${item.url}" style="width:30px;"></a>
                        </div>
                    </div>
                    `)

                })


            }))
}


const fetchAnaliseSentimento = () => {

    if ($("#texto").val() || $("#textourl").val()) {

        const url = 'http://localhost:3000/api/sentimento/'

        let metodo = ''

        const texto = $("#texto").val()
        if (texto) {
            metodo = {
                text: texto
            }
        }

        const textourl = $("#textourl").val()
        if (textourl) {
            metodo = {
                url: textourl
            }
        }



        fetch(url, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(metodo)
            })
            .then(response => response.json()
                .then(data => {
                    //console.log(data)
                    let situacao = data

                    //console.log(situacao)
                    htmlAnaliseSentimento(situacao)

                    if (Object.keys(situacao).length != 0) {
                        $("#dashboard").show()
                    }

                }))
    }

}

const htmlAnaliseSentimento = (situacao) => {

    $("#setsentiment").html('')
    $("#setkeyword").html('')
    $("#setemotion").html('')
    $("#setcategories").html('')
    $("#setconcepts").html('')
    $("#setrelations").html('')
    $("#setentities").html('')
    $("#setwarnings").html('')
    $("#setlanguage").html('')


    let sentimento = situacao.sentiment.document
    if (sentimento) {

        if (sentimento.score > 0) {

            $("#setsentiment").append(`
            <li class="list-group-item bg-dark">
                Positivo:
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${(sentimento.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(sentimento.score).toFixed(2)*100}%</div>
                </div> 
            </li>
            `)

        } else if (sentimento.score < 0) {
            $("#setsentiment").append(`
            <li class="list-group-item bg-dark">
                Negativo:
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${(sentimento.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(sentimento.score).toFixed(2)*100}%</div>
                </div> 
            </li>
            `)

        } else if (sentimento.score == 0) {
            $("#setsentiment").append(`
            <li class="list-group-item bg-dark">
                Neutro:
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${(sentimento.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(sentimento.score).toFixed(2)*100}%</div>
                </div> 
            </li>
            `)
        }

    } else {
        $("#setsentiment").append(`
        <li class="list-group-item bg-dark">
            <p>Não foi possivel analisar</p>
        </li>
        `)
    }


    let palavrachave = situacao.keywords
    const userskeywords = palavrachave.map(item => {
        $("#setkeyword").append(`
        <li class="list-group-item bg-dark">
            <p class="text-center">${item.text}</p> 
            Relevancia:
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.relevance)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.relevance).toFixed(2)*100}%</div>
            </div> 

            Sentimento: ${item.sentiment.label}
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.sentiment.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.sentiment.score).toFixed(2)*100}%</div>
            </div>
        </li>
        `)
    })

    let emocao = situacao.emotion
    if (emocao) {
        emocao = emocao.document.emotion

        $("#setemotion").append(`
        
        <li class="list-group-item bg-dark">Tristeza: 

            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(emocao.sadness)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(emocao.sadness).toFixed(2)*100}%</div>
            </div> 
            Alegria: 
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(emocao.joy)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(emocao.joy).toFixed(2)*100}%</div>
            </div> 
            Desgosto:
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(emocao.disgust)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(emocao.disgust).toFixed(2)*100}%</div>
            </div> 
            Raiva:
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(emocao.anger)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(emocao.anger).toFixed(2)*100}%</div>
            </div> 

        </li>
        `)
    } else {
        $("#setemotion").append(`
        <li class="list-group-item bg-dark">
            <p>Não foi possivel analisar</p>
        </li>
        `)
    }

    let conceitos = situacao.concepts
    const usersconcepts = conceitos.map(item => {
        $("#setconcepts").append(`
        <li class="list-group-item bg-dark">
            <p class="text-center"><a href="${item.dbpedia_resource}" target="_bank">${item.text}</a></p> 
            
        
            Relevancia:
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.relevance)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.relevance).toFixed(2)*100}%</div>
            </div> 
        </li>
        `)
    })

    let categoria = situacao.categories
    const userscategories = categoria.map(item => {
        $("#setcategories").append(`
        <li class="list-group-item bg-dark">
            ${item.label}
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.score).toFixed(2)*100}%</div>
            </div> 
        </li>
        `)
    })

    let relacoes = situacao.relations
    const usersrelations = relacoes.map(item => {
        $("#setrelations").append(`
        <li class="list-group-item bg-dark">
            <p class="text-center">${item.type}</p>
            <p>" ${item.sentence} "</p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.score).toFixed(2)*100}%</div>
            </div> 
        
        </li>
        `)
    })

    let entidades = situacao.entities
    const usersentities = entidades.map(item => {


        $("#setentities").append(`
        <li class="list-group-item bg-dark">
            <p class="text-center">${item.text}</p>
            <p>type: ${item.type}</p>
            Relevancia:
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.relevance)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.relevance).toFixed(2)*100}%</div>
            </div> 
            Sentimento: ${item.sentiment.label}
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${(item.sentiment.score)*100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(item.sentiment.score).toFixed(2)*100}%</div>
            </div> 
        </li>
        `)
    })

    let alerta = situacao.warnings
    if (alerta) {
        const userswarnings = alerta.map(item => {
            $("#setwarnings").append(`
            <div class="alert alert-warning alert-dismissible fade show small" role="alert">
                ${item}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
    }

    let linguagem = situacao.language
    if (linguagem) {
        $("#setlanguage").append(`
        <p class="text-center">Language: ${linguagem}</p>
        `)
    }
}