const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserController = {

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    msg: 'email ou senha incorretos'
                });
            };

            const isValida = await bcrypt.compare(senha, user.senha)
            if (!isValida) {
                return res.status(400).json({
                    msg: 'Email ou senha incorretos'
                });
            };

            const token = jwt.sing({
                email: user.email,
                nome: user.nome
            },process.env.SECRET, { expiresIn: 'h1' })
            return res.status(200).json({
                msg: 'Login realizado!',
                token
            })


        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "acione o suporte" })
        }
    },

    create: async (req, res) => {
        try {
            const { nome, senha, email } = req.body;

            const hashSenha = await bcrypt.hash(senha, 10)


            const userCriado = await User.create({ nome, senha: hashSenha, email });
            // Testando se criou usuario
            return res.status(200).json({
                msg: 'Usuário criado com sucesso!',
                user: userCriado
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Acione o suporte' });

        }
    },
    update: async (req, res) => {
        try {

            const { id } = req.body;
            const { nome, senha, email } = req.body;
            console.log("Atualizando objeto");
            console.log({ id });
            console.log({ nome, senha, email });

            const useUpdate = await User.findByPk(id);
            if (useUpdate == null) {
                return res.status(404).json({
                    msg: "Usuario não encontrado "
                })
            }

            const updated = await useUpdate.update({
                nome, senha, email
            });
            if (updated) {
                return res.status(200).json({
                    msg: "usuario atualizado com sucesso!"
                })
            }

            // Testando se atualizou usuario
            return res.status(200).json({
                msg: 'Usuário atualizado com sucesso!'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Acione o suporte' });

        }
    },
    getAll: async (req, res) => {

        try {
            const usuarios = await User.findAll();
            return res.status(200).json({
                msg: 'Usuarios encontrados!',
                user: usuarios
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Acione o suporte' });

        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioEncontrado = await User.findByPk(id);
            if (usuarioEncontrado == null) {
                return res.status(400).json({
                    msg: 'usuario nao encontrado!'
                })
            }

            res.status(200).json({
                msg: 'Usuario encontrado!',
                usuario: {},
                user: usuarioEncontrado
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Acione o suporte' });

        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const userFinded = await User.findByPk(id);
            if (userFinded == null) {
                res.status(404).json({
                    msg: "User nao encontrado"
                })
            }
            /* Destruido -> deletado */
            /*  As some it deleted */
            await userFinded.destroy();

            return res.status(200).json({
                msg: 'Usuario deletado com sucesso!'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Acione o suporte' });

        }
    }
}

module.exports = UserController;