import ExcelJS from 'exceljs'
import Company from '../company/company.model.js'
import { join } from 'path'
import fs from 'fs'

// Crear carpeta si no existe
const reportsPath = join('uploads', 'reports')
if (!fs.existsSync(reportsPath)) {
    fs.mkdirSync(reportsPath, { recursive: true })
}

export const generateReport = async (req, res) => {
    try {
        const companies = await Company.find().populate('category')

        if (companies.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'No companies found'
                }
            )
        }

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Companies Report')
        .// lo que lleva las columnas en excel
        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 25 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Years of Experience', key: 'yearsOfExperience', width: 20 },
            { header: 'Category', key: 'category', width: 25 }
        ]
        // datos del archivo
        companies.forEach(company => {
            worksheet.addRow(
                {
                    name: company.name,
                    impactLevel: company.impactLevel,
                    yearsOfExperience: company.yearsOfExperience,
                    category: company.category.name
                }
            )
        })

        const fileName = `companies_report_${Date.now()}.xlsx` // se pone con  la fecha en la que se crea con la cantidad de milisegundos que han pasado desde el 1 de enero de 1970 a las 00:00:00 UTC
        const filePath = join(reportsPath, fileName)

        await workbook.xlsx.writeFile(filePath)

        return res.send(
            {
                success: true,
                message: 'Archivo creado con éxito',
                filePath: `/uploads/reports/${fileName}` // Enlace donde se guarda el archivo
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
