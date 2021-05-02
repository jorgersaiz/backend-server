const express = require('express')
// Para que podamos leer las variables de entorno. Si hacemos log(process.env) podemos ver todas
require('dotenv').config()
const cors = require('cors')


const { dbConnection } = require('./database/config')


// Crear el servidor de Express

const app = express()

// Configurar cors

app.use(cors())

// Base de datos

dbConnection()


app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: "Hola mundo"
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})