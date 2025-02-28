import { Router } from 'express'
import { getAllCategories, createCategory, updateCategory, deleteCategory } from './category.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { categoryValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getAll', 
    [validateJwt], 
    getAllCategories
)

api.post(
    '/create', 
    [
        validateJwt,
        categoryValidator
    ], 
    createCategory
)

api.put(
    '/update/:id',
    [
        validateJwt,
        categoryValidator
    ],
    updateCategory
)

api.delete(
    '/delete/:id',
    [validateJwt], 
    deleteCategory
)

export default api
