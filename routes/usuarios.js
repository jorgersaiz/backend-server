// Ruta: /api/usuarios

const { Router } = require('express')
// Esto es un middleware de validación
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')

const router = Router()

const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get( '/', validarJWT,getUsuarios )

// Vamos a colocar una serie de validaciones en el post, lo haremos utilizando un array de  middlewares
router.post( '/', 
    [
        // Estas son las validaciones que tengo. Si alguna ocurre, se enviarán los errores a la 
        // función validarCampos.
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    postUsuarios 
)

router.put( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('role', 'El role es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    putUsuarios 
)

router.delete( '/', validarJWT, deleteUsuarios)



module.exports = router;