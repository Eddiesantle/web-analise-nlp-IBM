const axios = require('axios');

const db = require('../server/db/mysql').pool

// RETORNA TODOS OS PERGUNTAS
exports.get = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT * FROM perguntas`, (error, resultado, field) => {
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

// RETORNA DADOS DO PERGUNTA
exports.getId = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT * FROM perguntas WHERE clienteId = ?;`, [req.params.id], (error, resultado, field) => {
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

// INSERE OS PERGUNTAS
exports.post = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `INSERT INTO perguntas (id,clienteId, pergunta) VALUES (?,?,?)`, ['NULL', req.body.clienteId, req.body.pergunta], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(201).send({
                    mensagem: "Pergunta inserido com sucesso!",
                    id_pergunta: resultado.insertId
                })
            }
        )
    })
};


// ALTERA PERGUNTA
exports.patch = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `UPDATE perguntas
                SET pergunta = ?
                WHERE id = ?`, [req.body.pergunta, req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Pergunta alterado com sucesso!"
                })
            }
        )
    })
};

// EXCLUI PERGUNTA
exports.delete = (req, res, next) => {
    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `DELETE FROM perguntas
                WHERE id = ?`, [req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Pergunta removido com sucesso!"
                })
            }
        )
    })
};