const jwt = require('jsonwebtoken')


const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        // Nuestro payload solo va a tener el uid, pero podríamos meter más cosas siempre que no sea 
        // información sensible, ni trajetas de crédito ni contraseñas...
        const payload = {
            uid
        }

        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: '12h'}, (err, token) => {

            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}