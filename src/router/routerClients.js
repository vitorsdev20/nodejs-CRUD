const { validadeCliete, validateClienteId } = require('../middlewares/validadeCliente');
const clienteController = require ('../controller/clienteController');
const { Router } = require('express');  
const router = Router();
/* Cliente */
router.post('/clientes', validadeCliete, (req, res) => {
    clienteController.create(req, res)
});

router.get('/clientes',  (req, res) => {
    clienteController.getAll(req, res)
});

router.delete('/cliente/:id', validadeCliete, validateClienteId, (req, res) => {
    clienteController.delete(req, res)
});

router.put('/cliente/:id', validateClienteId, validadeCliete, (req, res) => {
    clienteController.update(req, res)
})

router.get('/cliente/:id', validadeCliete, (req, res)=>{
    clienteController.getOne(req, res)
})

module.exports = router;


