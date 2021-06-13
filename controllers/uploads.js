const path = require('path')
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res) => {


    const tipo = req.params.tipo
    const id = req.params.id


    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']

    if(!tiposValidos.includes(tipo)){

        return res.status(400).json({
            ok: false,
            msg: 'Introduce un tipo válido: hospitales/medicos/usuarios'
        })
    }

    // Esto es una validación para asegurarse de que llega un archivo del req
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envió ningún archivo'
        })
    }

    // Procesar la imagen
    const file = req.files.imagen

    const nombreCortado = file.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

    if(!extensionesValidas.includes(extension)){

        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        })
    }

    // Generar nombre del archivo: Aquí vamos a cambiarle el nombre al archivo porque si me llegan dos
    // archivos con el mismo nombre, no van a poder guardarse porque uno sobrescribe. Para ello, lo que 
    // vamos a hacer es generar un nombre único para cada archivo.

    const nombreArchivo = `${uuidv4()}.${extension}`

    // Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`

    // Mover la imagen a su ruta
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        // Guardar en base de datos

        actualizarImagen( tipo, id, nombreArchivo)
    
        res.json({
            ok: true,
            msg: nombreArchivo
        })
    });

    
}

const retornaImagen = (req, res) => {

    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)

    // Imagen por defecto
    if( fs.existsSync(pathImg) ){

        res.sendFile( pathImg )

    } else {
        const pathImg = path.join( __dirname, '../uploads/noImg.jpg' )

        res.sendFile(pathImg)
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}