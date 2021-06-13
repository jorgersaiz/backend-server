const Medico = require('../models/medicos')


const getMedicos = async (req, res) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img')
                                       .populate('hospital', 'nombre')
    
    res.json({
        ok: true,
        medicos
    })
}

const postMedicos = async (req, res) => {

    const uid = req.uid
    const medico = new Medico({ usuario: uid, ...req.body })

    try {
        
        const medicoBd = await medico.save()

        res.json({
            ok: true,
            medico: medicoBd
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        })
    }
    
}

const putMedicos = async (req, res) => {

    res.json({
        ok: true,
        msg: "Hospital actualizado"
    })
}

const deleteMedicos = async (req, res) => {

    res.json({
        ok: true,
        msg: "Hospital Eliminado"
    })
}


module.exports = { 
    getMedicos, 
    postMedicos,
    putMedicos,
    deleteMedicos
}