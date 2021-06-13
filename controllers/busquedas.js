// getTodo

const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')

const getTodo = async (req, res) => {

    const busqueda = req.params.busqueda

    // Puesto que esto va a ser una búsqueda, no quiero hacer que sea case sensitive, sino que sea más 
    // flexible. Vamos a utilizar regex para ello. En este caso, le estoy diciendo que sea insensitive
    // si quito tildes, mayúsculas o acorto el nombre, lo va a entender

    const regex = new RegExp(busqueda, 'i')

    const [usuarios, hospitales, medicos] = await Promise.all([

        Usuario.find({nombre: regex}),
        Hospital.find({nombre: regex}),
        Medico.find({nombre: regex})

    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}


const getDocumentosColeccion = async (req, res) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda

    const regex = new RegExp(busqueda, 'i')


    let resp

    if (tabla == 'medicos'){

        const medicos = await Medico.find({nombre: regex})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')
        resp = medicos

    } else if (tabla == 'usuarios') {

        const usuarios = await Usuario.find({nombre: regex})
        resp = usuarios

    } else if(tabla == "hospitales"){

        const hospitales = await Hospital.find({nombre: regex})
                                         .populate('usuario', 'nombre img')
        resp = hospitales
    } else {

        res.status(400).json({
            ok: false,
            msg: 'La tabla no existe'
        })
    }


    res.json({
        ok: true,
        res: resp
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}