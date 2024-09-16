const jwt = require('jsonwebtoken');

function authenticateToken (req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            msg: "acesso negado"
        });
    }

    jwt.verify(token, process.env.SECRET,(err, user) => {
        if (err) {
            return res.status(403).json({
                msg: "Acesso negado"
            })
        }

        req.user = user;

        next();
    });

}

module.exports = authenticateToken;