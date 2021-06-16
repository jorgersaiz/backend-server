// Path: /api/login

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { login, googleSignIn, renewToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validate-fields')

router.post('/',

    [

        check('email', 'El email es necesario').notEmpty(),
        check('password', 'La contraseña es necesaria').notEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',

    [
        check('token', 'El token de Google es obligatorio').notEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get('/renew',

    validarJWT,
    renewToken
)

module.exports = router