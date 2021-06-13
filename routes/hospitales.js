// Ruta: /api/hospitales

const { Router } = require('express')
// Esto es un middleware de validación
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')

const router = Router()

const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require('../controllers/hospitales')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get( '/', validarJWT,getHospitales )

// Vamos a colocar una serie de validaciones en el post, lo haremos utilizando un array de  middlewares
router.post( '/', 
    [
        // Estas son las validaciones que tengo. Si alguna ocurre, se enviarán los errores a la 
        // función validarCampos.
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
        validarCampos,
    ], 
    postHospitales 
)

router.put( '/', 
    [
        
    ], 
    putHospitales 
)

router.delete( '/', validarJWT, deleteHospitales)



module.exports = router;