'use strict'
// comit de app.js
import express from 'express'
import morgan from 'morgan'
import authRoutes from '../src/auth/auth.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(authRoutes)

}

export const initServer = async()=>{
    const app = express() //express
    try{
        configs(app) //configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}