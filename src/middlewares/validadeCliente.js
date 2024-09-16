const validadeCliete = (req, res, next) => {
    const { nome, email, pedidos } = req.body;

    /*  preecimento / nao preechiente */
    if (!nome || !email || !pedidos) {
        return res.status(400).json({
            msg: "Campos invalidos, revise caro fdp."
        })
    }
    /* pode avançar */
    return next();
}

const validateClienteId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            msg: "parametro faltando"
        })
    }
    return next();
}

module.exports = {validateClienteId,  validadeCliete,}; 