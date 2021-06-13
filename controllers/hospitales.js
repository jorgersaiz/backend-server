const Hospital = require('../models/hospital')


const getHospitales = async (req, res) => {

    // Para saber qué persona creó el hospital, usamos populate
    const hospitales = await Hospital.find().populate('usuario', 'nombre img')
    res.json({
        ok: true,
        hospitales
    })
}

const postHospitales = async (req, res) => {

    const uid = req.uid
    const hospital = new Hospital({ usuario: uid, ...req.body })

    try {
        
        const hospitalBd = await hospital.save()

        res.json({
            ok: true,
            hospital: hospitalBd
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        })
    }
    
}

const putHospitales = async (req, res) => {

    res.json({
        ok: true,
        msg: "Hospital actualizado"
    })
}

const deleteHospitales = async (req, res) => {

    res.json({
        ok: true,
        msg: "Hospital Eliminado"
    })
}


module.exports = { 
    getHospitales, 
    postHospitales,
    putHospitales,
    deleteHospitales
}