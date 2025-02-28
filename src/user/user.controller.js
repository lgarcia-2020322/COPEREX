import User from './user.model.js'

export const getAll =async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if (users.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Users not found'
            })
        }

        return res.send({
            success: true,
            message: 'Users found',
            users,
            total: users.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        if (user.status === false) {
            return res.status(400).send({
                success: false,
                message: 'Cannot update a deactivated user'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })

        return res.send({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        if (user.status === false) {
            return res.status(400).send({
                success: false,
                message: 'User is already deactivated'
            }
        )
        }

        user.status = false
        await user.save()

        return res.send({
            success: true,
            message: 'User deactivated successfully'
        }
    )
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        }
    )
    }
}