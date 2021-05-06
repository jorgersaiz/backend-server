const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


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

module.exports = {
    login
}