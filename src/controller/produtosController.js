const Product = require("../models/Produtos");

const ProductController = {
  create: async (req, res) => {
    try {
      const { nome, preco, quantidade } = req.body;
      console.log({ nome, preco, quantidade });

      const productCreated = await Product.create({ nome, preco, quantidade });
      return res.status(200).json({
        msg: "Produto criado com sucesso!",
        product: productCreated
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  update: async (req, res) => {
    try {

      const { id } = req.params;
      const { nome, preco, quantidade } = req.body;

      const productEditado = await Product.findByPk(id);

      if (productEditado === null) {
        res.status(404).json({
          msg: "Usuario inexistente"
        })
      }

      await productEditado.update({ nome, preco, quantidade });

      productEditado.save();
      return res.status(200).json({
        msg: "PRODUTO EDITADO"
      }
      )
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        msg: "Contate o Mateus"
      })
    }
  },
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({
        msg: "Produtos encontrados com sucesso!",
        products: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const produtoEncontrado = await Product.findByPk(id);
      if (produtoEncontrado == null) {
        return res.status(400).json({
          msg: 'Produto nao encontrado!'
        })
      }

      res.status(200).json({
        msg: 'Produto encontrado!',
        user: produtoEncontrado
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Acione o suporte' });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const productFinded = await Product.findByPk(id);
      if (productFinded == null) {
        return res.status(404).json({
          msg: "Produto não encontrado",
        });
      }
      productFinded.destroy();
      return res.status(200).json({
        msg: "Produto deletado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
};
module.exports = ProductController;