import { Router } from 'express'
import { generateReport } from './reports.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get(
    '/generate',
    [validateJwt],
    generateReport
)

export default api
