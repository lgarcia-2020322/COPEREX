import ExcelJS from 'exceljs'
import Company from '../company/company.model.js'
import { unlink } from 'fs/promises'
import { join } from 'path'
import fs from 'fs'

// Crear carpeta si no existe donde se ponen los archivos excel
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

        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 25 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Years of Experience', key: 'yearsOfExperience', width: 20 },
            { header: 'Category', key: 'category', width: 25 }
        ]

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

        const fileName = `companies_report_${Date.now()}.xlsx`
        const filePath = join(reportsPath, fileName)

        await workbook.xlsx.writeFile(filePath)

        return res.download(filePath, fileName, async (err) => {
            if (err) {
                console.error('Error sending file:', err)
                return res.status(500).send(
                    {
                        success: false,
                        message: 'Error generating report'
                    }
                )
            }

            // Opcional: Eliminar el archivo después de enviarlo
            try {
                await unlink(filePath)
            } catch (unlinkErr) {
                console.error('Error deleting file:', unlinkErr)
            }
        })
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
