require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router =  require('./router/router');
const sequelize = require('./config/config');
const User = require("./models/User");
const Produtos = require("./models/Produtos");
const app = express();

//modelo API json
app.use(express.json());

app.use(cors());

app.use('/api', router);

// rotas
//req -> requisicao
//res -> Reponse
app.get('/healthcheck', (req, res) => {

    // 200 -> Ok
    return res.status(200).json({
        message: 'Estamos vivos',
        alive: true
    });
})


//Listen -> ouvindo na porta 8080
sequelize.authenticate()
.then(async ()  => {
    console.log("Conecção estabelecida co sucesso!");
    await sequelize.sync();
})
.then(() => {
    app.listen(process.env.PORT == null ? 8080: process.env.PORT, () =>{
        console.log("##############################");
        console.log("Rodando na porta 8080");
        console.log("##############################");
    })
})
.catch((error) => {
    console.log("erro ao se conectar com o banco:",error);
});
