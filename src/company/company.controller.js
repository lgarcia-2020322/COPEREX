import Company from './company.model.js'
import Category from '../category/category.model.js'

export const getAllCompanies = async (req, res) => {
    try {
        const { limit = 20, skip = 0, filter, order } = req.query
        let query = {}

        if (filter === 'years') query = { yearsOfExperience: 1 }
        else if (filter === 'category') query = { category: 1 }
        else if (filter === 'A-Z') query = { name: 1 }
        else if (filter === 'Z-A') query = { name: -1 }

        const companies = await Company.find()
            .populate('category')
            .sort(query)
            .skip(skip)
            .limit(limit)

        if (companies.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Companies found',
                companies,
                total: companies.length
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

export const addCompany = async (req, res) => {
    try {
        const { name, impactLevel, yearsOfExperience, category } = req.body

        let foundCategory = await Category.findById(category)
        if (!foundCategory) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid category'
                }
            )
        }

        const company = new Company({ name, impactLevel, yearsOfExperience, category })
        await company.save()

        return res.send(
            {
                success: true,
                message: 'Company added successfully',
                company
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

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatedCompany) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Company not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Company updated successfully',
                company: updatedCompany
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
