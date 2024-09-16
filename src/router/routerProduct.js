const { validateProduct, validateProductId } = require('../middlewares/ValidadeProduct');
const produtosController = require ('../controller/produtosController');
const { Router } = require('express');  
const router = Router();


/* Produtos */
router.post('/produtos', validateProduct, (req, res) => {
    produtosController.create(req, res)
});
router.get('/produtos', (req, res) => {
    produtosController.getAll(req, res)
});

router.delete('/produtos/:id', validateProduct, (req, res) => {
    produtosController.delete(req, res)
});
router.put('/produtos/:id', validateProductId, validateProduct, (req, res) => {
    produtosController.update(req, res)
})
router.get('/produtos/:id', validateProduct, (req, res)=>{
    produtosController.getOne(req, res)
})

module.exports = router;