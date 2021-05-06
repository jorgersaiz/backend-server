const jwt = require('jsonwebtoken')


const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No has enviado un token en la petición'
        })
    }

    try {

        // Si esto funciona, me acabaría devolviendo el id del usuario, lo saca del token.
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        req._id = _id
        next()
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }

    next()
}

module.exports = {
    validarJWT
}