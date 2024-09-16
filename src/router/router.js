const { Router } = require ('express');
const routerUser = require('./routerUser');
const routerProduct = require('./routerProduct');
const routerClients = require('./routerClients')
const UserController = require('../controller/UserController');
const authenticateToken = require('../middlewares/authenticateToken');

const uploadRouters = require("./routerUpload");

// const ProdutosController = require('../controller/ProdutosController');
// const { validateUser, ValidateUserId, validateProduto, validateProdutoId, validateFunc, validateFuncId } = require('../middlewares/Validate');
// const FuncionarioController = require('../controller/FuncionarioController');

const router = Router();
router.use('/image',uploadRouters)

router.use('/user/', routerUser);

router.post('/login', (req, res) =>{
    UserController.login(req, res)
});

router.use('/produtos/', routerProduct);

router.use('/cliente/', routerClients );



module.exports = router;