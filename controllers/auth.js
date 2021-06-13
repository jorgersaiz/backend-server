const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google.verify");


const login = async(req, res) => {


    const { email, password } = req.body

    try {

        // Verificar email
        const usuarioDb = await Usuario.findOne({ email: email})

        if ( !usuarioDb ){

            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDb.password)
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Token de autenticación - JWT

        const token = await generarJWT(usuarioDb._id)

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async (req, res) => {


    const googleToken = req.body.token
    
    try {
        
        const { name, email, picture } = await googleVerify( googleToken )

        // Verificamos si el usuario ya existe

        const usuarioDB = await Usuario.findOne({ email })
        let usuario
        if( !usuarioDB ){

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })

        } else {
            // Si el usuario ya existe en la base de datos, simplemente actualizamos que a partir de 
            // ahora se va a loguear con Google
            usuario = usuarioDB
            usuario.google = true
            usuario.password = '@@@'
        }

        await usuario.save()

        // Token de autenticación - JWT

        const jwtToken = await generarJWT(usuario._id)

        res.json({
            ok: true,
            jwtToken
        })

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}