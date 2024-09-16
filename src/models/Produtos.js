const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Produtos = sequelize.define('produtos', {
    /* id  */
    nome :{
        type: DataTypes.STRING,
        allowNull: false
    },
    preco:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});
module.exports = Produtos;