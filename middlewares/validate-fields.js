const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => {
    // Con estas líneas, estamos guardando un array de errores que nos llegan cuando el usuario envía
    // la petición, la req
    const errores = validationResult( req )

    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }

    // Si el condicional no se cumple, se ejecutará la función de después de esta en router
    next()
}

module.exports = { validarCampos }