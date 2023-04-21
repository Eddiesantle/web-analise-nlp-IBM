const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration

//Rotas
const respostaAnalise = require('./routes/respostaAnaliseRoute');

const clientes = require('./routes/clientesRoute');
const perguntas = require('./routes/perguntasRoute');
const respostas = require('./routes/respostasRoute');
const analysisFeelingRoute = require('./routes/analysisFeelingRoute');


app.use(express.json());

app.use('/respostaAnalise', respostaAnalise);

app.use('/clientes', clientes);
app.use('/perguntas', perguntas);
app.use('/respostas', respostas);

app.use('/api/sentimento', analysisFeelingRoute);

module.exports = app;