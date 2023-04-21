const axios = require('axios');

const db = require('../server/db/mysql').pool

// RETORNA TODOS AS RESPOSTAS
exports.get = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT * FROM respostas`, (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(200).send({
                    response: resultado
                })
            }
        )
    })
};

// RETORNA DADOS DA RESPOSTA
exports.getId = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT respostas.*, perguntas.pergunta as pergunta, clientes.nome as clienteNome FROM respostas INNER JOIN perguntas on perguntas.id = respostas.perguntaId INNER JOIN clientes on clientes.id = perguntas.clienteId WHERE perguntaId = ?`, [req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(200).send({
                    response: resultado
                })
            }
        )
    })
};

// INSERE AS RESPOSTAS
exports.post = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }


        conn.query(
            `INSERT INTO respostas (id, clienteId, perguntaId, respostas, sentimento, palavraChave) VALUES (?,?,?,?,?,?)`, ['NULL', req.body.clienteId, req.body.perguntaId, req.body.respostas, req.body.sentimento, req.body.palavraChave], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(201).send({
                    mensagem: "Resposta inserida com sucesso!",
                    id_resposta: resultado.insertId
                })
            }
        )
    })
};


// ALTERA RESPOSTA
exports.patch = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `UPDATE respostas
                SET respostas       = ?,
                    sentimento      = ?, 
                    palavraChave    = ?
                WHERE id = ?`, [req.body.respostas, req.body.sentimento, req.body.palavraChave, req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Resposta alterada com sucesso!"
                })
            }
        )
    })
};

// EXCLUI RESPOSTA
exports.delete = (req, res, next) => {
    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `DELETE FROM respostas
                WHERE id = ?`, [req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Resposta removida com sucesso!"
                })
            }
        )
    })
};