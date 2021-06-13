// api/todo/:busqueda

const { Router } = require('express')
// Esto es un middleware de validación
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')

const router = Router()

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get( '/:busqueda', validarJWT, getTodo )
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion )



module.exports = router