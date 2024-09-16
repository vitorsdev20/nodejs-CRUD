const { validateUser, validateUserId } = require('../middlewares/ValidateUsers');
const UserController = require ('../controller/UserController');
const { Router } = require('express');  
const router = Router();

 //Configurar as rotas crud
    /*  /api/user/:id -> /api/user/3217 (params) */
    /*  /api/user?id=3216 -> (query) */
    /* /api/searh?s=Vitor%Sousa -> (Query) */



    /* {body: {id: "3212" } } -> (body) */
    router.post('/', validateUser, (req, res ) => {
        UserController.create(req, res)
    });
    router.get('/', (req, res) => {
        UserController.getAll(req, res)
    });
    
    router.delete('/:id', validateUserId, (req, res) => {
        UserController.delete(req, res)
    });
    router.put('/:id', validateUserId, validateUser, (req, res) => {
        UserController.update(req, res)
    })
    router.get('/:id', (req, res) => {
        UserController.getOne(req, res)
    })

    module.exports = router;