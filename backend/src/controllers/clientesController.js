const axios = require('axios');

const db = require('../server/db/mysql').pool

// RETORNA TODOS OS CLIENTES
exports.get = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT * FROM clientes`, (error, resultado, field) => {
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

// RETORNA DADOS DO CLIENTE
exports.getId = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `SELECT * FROM clientes WHERE id = ?;`, [req.params.id], (error, resultado, field) => {
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

// INSERE OS CLIENTES
exports.post = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `INSERT INTO clientes (id, nome) VALUES (?,?)`, ['NULL', req.body.nome], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(201).send({
                    mensagem: "Cliente inserido com sucesso!",
                    id_cliente: resultado.insertId
                })
            }
        )
    })
};


// ALTERA CLIENTE
exports.patch = (req, res, next) => {

    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `UPDATE clientes
                SET nome = ?
                WHERE id = ?`, [req.body.nome, req.body.id_cliente], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Cliente alterado com sucesso!"
                })
            }
        )
    })
};

// EXCLUI CLIENTE
exports.delete = (req, res, next) => {
    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            `DELETE FROM clientes
                WHERE id = ?`, [req.params.id], (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(202).send({
                    mensagem: "Cliente removido com sucesso!"
                })
            }
        )
    })
};