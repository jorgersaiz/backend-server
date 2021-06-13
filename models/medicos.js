const { Schema, model } = require('mongoose')

const MedicoSchema = Schema ({

    nombre: {

        type: String,
        required: true

    },
    img: {
        type: String
        
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Hospital"
    }
})

// Esto de abajo, es simplemente para cambiar _id por uid y quitar lo de la versión. Lo que estamos
// haciendo es guardar en variables tanto la versión, como el _id como el resto de atributos del
// modelo. Luego, solo enviamos el resto de atributos, pero antes creamos uno nuevo (uid) que va a ser
// igual al antiguo _id
// UsuarioSchema.method('toJSON', function(){
//     const { __v, _id, ...object } = this.toObject()

//     object.uid = _id

//     return object
// })

module.exports = model('Medico', MedicoSchema)