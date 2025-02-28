import { Router } from 'express'
import { getAll, updateUser, deleteUser } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateUserValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getAll', 
    [validateJwt], 
    getAll
)

api.put(
    '/updateProfile/:id',
    [
        validateJwt,
        updateUserValidator
    ],
    updateUser
)

api.delete(
    '/delete/:id',
    [validateJwt], 
    deleteUser
)

export default api
