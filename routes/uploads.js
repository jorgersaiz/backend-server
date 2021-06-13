// api/upload/

const { Router } = require('express')
const expressFileUpload = require('express-fileupload');

const router = Router()

const { fileUpload, retornaImagen } = require('../controllers/uploads')
const { validarJWT } = require('../middlewares/validar-jwt')

router.use(expressFileUpload());



router.put( '/:tipo/:id', validarJWT, fileUpload )
router.get( '/:tipo/:foto', validarJWT, retornaImagen )



module.exports = router