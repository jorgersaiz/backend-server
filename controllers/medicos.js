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

    const id = req.params.id
    const uid = req.uid
    try {

        const medico  = await Medico.findById(id)

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: "El médico no existe"
            })
        }
        
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        // Lo del new en true es para que muestre el hospital actualizado, no el viejo
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})

        res.json({
            ok: true,
            msg: "Médico actualizado",
            hospital: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar médico"
        })
    }
}

const deleteMedicos = async (req, res) => {

    const id = req.params.id
    try {

        const medico  = await Medico.findById(id)

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: "El médico no existe"
            })
        }
        
        await Medico.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: "Médico eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar médico"
        })
    }
}


module.exports = { 
    getMedicos, 
    postMedicos,
    putMedicos,
    deleteMedicos
}