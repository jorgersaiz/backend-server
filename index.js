const express = require('express')
// Para que podamos leer las variables de entorno. Si hacemos log(process.env) podemos ver todas
require('dotenv').config()
const cors = require('cors')


const { dbConnection } = require('./database/config')


// Crear el servidor de Express

const app = express()

// Configurar cors

app.use(cors())
// Parseo del body
app.use(express.json())

// Base de datos

dbConnection()

// Directorio público: Con esto, lo que hacemos es crear una página web estática que se ejecuta en el
// mismo servidor que el back end

app.use(express.static('public'))


// Rutas

app.use( '/api/usuarios', require('./routes/usuarios'))
app.use( '/api/login', require('./routes/auth'))
app.use( '/api/todo', require('./routes/busquedas'))
app.use( '/api/hospitales', require('./routes/hospitales'))
app.use( '/api/medicos', require('./routes/medicos'))
app.use( '/api/upload', require('./routes/uploads'))




app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})