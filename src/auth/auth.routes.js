import { Router } from 'express'
import { login, register } from './auth.controller.js'
import { loginValidator, registerValidator } from '../../helpers/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.error.js'

const api = Router ()

api.post(
    '/register',
    [
        registerValidator, 
        deleteFileOnError
    ],
    register
)

api.post(
    '/login', 
    [
        loginValidator
    ], 
    login
)


export default api