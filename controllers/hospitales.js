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

    const id = req.params.id
    const uid = req.uid
    try {

        const hospital  = await Hospital.findById(id)

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: "El hospital no existe"
            })
        }
        
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        // Lo del new en true es para que muestre el hospital actualizado, no el viejo
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})

        res.json({
            ok: true,
            msg: "Hospital actualizado",
            hospital: hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar hospital"
        })
    }
}

const deleteHospitales = async (req, res) => {


    const id = req.params.id
    try {

        const hospital  = await Hospital.findById(id)

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: "El hospital no existe"
            })
        }
        
        await Hospital.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: "Hospital eliminado"
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar hospital"
            
        })
    }
    
}


module.exports = { 
    getHospitales, 
    postHospitales,
    putHospitales,
    deleteHospitales
}