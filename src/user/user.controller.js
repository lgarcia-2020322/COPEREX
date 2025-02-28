// get all

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
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        return res.status(500).send({ message: 'Error updating user', err });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.status = false;
        await user.save();

        return res.send({ message: 'User deactivated successfully' });
    } catch (err) {
        return res.status(500).send({ message: 'Error deactivating user', err });
    }
};