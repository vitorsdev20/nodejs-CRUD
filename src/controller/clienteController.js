const Cliente = require("../models/Clientes");

const clientesController = {
    create: async (req, res) => {
        try {
            const { nome,  email , pedidos  } = req.body;
            console.log({ nome, email, pedidos });

            const clienteCreated = await Cliente.create({ nome, email , pedidos });
            return res.status(200).json({
                msg: "Cliente criado com sucesso!",
                cliete: clienteCreated
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            msg: "Acione o suporte" });
        }
    },
    update: async (req, res) => {
        try {

            const { id } = req.params;
            const { nome, email, pedidos } = req.body;

            const clienteEditado = await Cliente.findByPk(id);

            if (clienteEditado === null) {
                res.status(404).json({
                    msg: "Cliente inexistente!"
                })
            }

            await clienteEditado.update({ nome, email , pedidos });

            clienteEditado.save();
            return res.status(200).json({
                msg: "Cliente Editado!"
            }
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: "Acione o suporte"
            })
        }
    },
    getAll: async (req, res) => {
        try {
            const Cliente = await Cliente.findAll();
            return res.status(200).json({
                msg: "Clientes encontrados com sucesso!",
                cliente: Cliente,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            msg: "Acione o suporte" });
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const clienteEncontrado = await Cliente.findByPk(id);
            if (clienteEncontrado == null) {
                return res.status(400).json({
                    msg: 'Cliente nao encontrado!'
                })
            }

            res.status(200).json({
                msg: 'Cliente encontrado!',
                user: clienteEncontrado
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
        msg: 'Acione o suporte' });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const clienteFinded = await Cliente.findByPk(id);
            if (clienteFinded == null) {
                return res.status(404).json({
                    msg: "Cliente não encontrado",
                });
            }
            await clienteFinded.destroy();
            return res.status(200).json({
                msg: "Cliente deletado com sucesso!",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
};
module.exports = clientesController;