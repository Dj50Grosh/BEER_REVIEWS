import express from 'express'
import dotenv from 'dotenv'
import beerRoutes from './routes/beer.js'
import mongoose from 'mongoose'

dotenv.config()

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

//routes
app.use('/api/beer', beerRoutes)

//jungtis prie db
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((err) => console.log(err))
