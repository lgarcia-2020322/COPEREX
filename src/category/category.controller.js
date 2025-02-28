import Category from './category.model.js'

export const getAllCategories = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)

        if (categories.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Categories not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Categories found',
                categories,
                total: categories.length
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

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        const defaultCategory = await Category.findOne({ name: "uncategory" })
        if (!defaultCategory) {
            await new Category(
                {
                    name: "uncategory",
                    description: "Default category."
                }
            ).save()
        }

        const category = new Category({ name, description })
        await category.save()

        return res.send(
            {
                success: true,
                message: 'Category created successfully',
                category
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

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatedCategory) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                category: updatedCategory
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

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        if (category.name.toLowerCase() === "uncategory") {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Cannot delete the default category | uncategory |'
                }
            )
        }

        await Category.findByIdAndDelete(id)

        return res.send(
            {
                success: true,
                message: 'Category deleted successfully'
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
