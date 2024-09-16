const validateProduct = (req, res, next) => {
    const { nome, email, senha } = req.body;

    /*  preecimento / nao preechiente */
    if (!nome || !email || !senha) {
        return res.status(400).json({
            msg: "Campos invalidos, revise caro fdp."
        })
    }
    /* pode avançar */
    return next();
}

const validateProductId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            msg: "parametro faltando"
        })
    }
    return next();
}

module.exports = { validateProductId, validateProduct }; 