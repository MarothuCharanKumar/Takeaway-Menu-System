const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(error=>{
            console.error('connection error',error.message)
        })

const db= mongoose.connection

module.exports =db