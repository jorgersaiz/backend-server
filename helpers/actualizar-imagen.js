const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')

const fs = require('fs')

const borrarImagen = (tipo, modelo) => {

    // Con esto lo que hacemos es ver si el usuario ya tiene una imagen, si es así, la borramos
    // para subir una nueva y que no quede la antigua de basura
    const pathViejo = `./uploads/${tipo}/${modelo.img}`

    if(fs.existsSync(pathViejo)){
        fs.unlinkSync(pathViejo)
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {


    if( tipo == 'medicos'){

        const medico = await Medico.findById(id)

        if(!medico){
            console.log("No existe el médico");
            return false
        }

        // Borramos imagen si existe
        borrarImagen(tipo, medico)

        // Actualizamos la base de datos. Si usas el save con un objeto que ya tiene id, solo lo modifica
        // no crea uno nuevo
        medico.img = nombreArchivo

        await medico.save()
        return true



    } else if ( tipo == 'hospitales' ){

        const hospital = await Hospital.findById(id)

        if(!hospital){
            console.log("No existe el médico");
            return false
        }

        // Borramos imagen si existe
        borrarImagen(tipo, hospital)

        // Actualizamos la base de datos. Si usas el save con un objeto que ya tiene id, solo lo modifica
        // no crea uno nuevo
        hospital.img = nombreArchivo

        await hospital.save()
        return true

    } else if ( tipo == 'usuarios' ){

        const usuario = await Usuario.findById(id)

        if(!usuario){
            console.log("No existe el médico");
            return false
        }

        borrarImagen(tipo, usuario)

        usuario.img = nombreArchivo
        await usuario.save()
        return true

    } else {

    }

}


module.exports = {
    actualizarImagen
}