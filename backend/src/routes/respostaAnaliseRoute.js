const express = require('express');
const router = express.Router();

const controller = require('../controllers/respostaAnaliseController')

router.post('/', controller.post);

module.exports = router