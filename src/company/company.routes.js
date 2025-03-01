import { Router } from 'express'
import { getAllCompanies, addCompany, updateCompany } from './company.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { companyValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getAll', 
    [validateJwt], 
    getAllCompanies
)

api.post(
    '/add', 
    [
        validateJwt,
        companyValidator
    ], 
    addCompany
)

api.put(
    '/update/:id',
    [
        validateJwt,
        companyValidator
    ],
    updateCompany
)

export default api
