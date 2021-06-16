// Ruta: /api/medicos

const { Router } = require('express')
// Esto es un middleware de validación
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')

const router = Router()

const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require('../controllers/medicos')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get( '/', validarJWT,getMedicos )

// Vamos a colocar una serie de validaciones en el post, lo haremos utilizando un array de  middlewares
router.post( '/', 
    [
        // Estas son las validaciones que tengo. Si alguna ocurre, se enviarán los errores a la 
        // función validarCampos.
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos,
    ], 
    postMedicos 
)

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos,
    ], 
    putMedicos 
)

router.delete( '/:id', validarJWT, deleteMedicos)



module.exports = router;