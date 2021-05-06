const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require("../helpers/jwt");


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find()
    res.json({
        ok: true,
        usuarios
    })
}

const postUsuarios = async (req, res) => {

    try{

        const existeEmail = await Usuario.findOne({email: req.body.email})

        if ( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }
        const usuario = new Usuario(req.body)

        // Aquí encriptamos la contraseña

        // Generamos un string aleatorio
        const salt = bcrypt.genSaltSync()
        console.log(salt);
        // Junto con el salt, hacemos el hash completo de la contraseña teniendo en cuenta la pass del
        // usuario
        usuario.password = bcrypt.hashSync(req.body.password, salt)
        const newUsuario = await usuario.save()

        const token = await generarJWT(newUsuario._id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    
}

const putUsuarios = async (req, res) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.query.id

    console.log(uid);

    try {

        const usuarioDb = await Usuario.findById(uid)

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // ACTUALIZAMOS AL USUARIO
        // Con los 3 puntos, lo que hacemos es decirle que nos cree una variable para password, otra
        // para google y el resto, que lo guarde en campos, porque esas dos, no las quiero actualizar
        const {password, google, email, ...campos} = req.body;

        // Con esto lo que hacemos es que si el email que viene de la petición es el mismo que el del 
        // usuario de base de datos, lo eliminamos para que no salte el error de validación del 
        // esquema donde el email debe ser único.
        if(usuarioDb.email !== email){
            // Esto es por si un usuario quiere cambiar su mail a uno que ya existe para otro usuario
            // de la base de datos
            const existeEmail = await Usuario.findOne({email: email})

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }

        campos.email = email
        // Con new:true le decimos que nos devuelva el usuario actualizado.
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteUsuarios = async (req, res) => {

    const uid = req.query.id

    try {

        const usuarioDb = await Usuario.findById(uid)

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.deleteOne({_id : uid})

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = { 
    getUsuarios, 
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}