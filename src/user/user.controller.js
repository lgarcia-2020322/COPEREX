// get all

import User from './user.model.js'

export const getAll = async(req,res)=>{
    try {
        const { limit = 20, skip = 0} = req.query
        const users = await User.finde()
            .skip
            .limit(limit)
        if (users.length === 0) return res.status(404).send(
            {
                message: 'Users not found',
                succses: false
            }
        )
        return res.send(
            {
                succses: true,
                message: 'Users found: ',
                users,
                total: users.length
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                succses: false,
                message: 'General error',
                err
            }
        )
        
    }
}

export const updateUser = async (req,res)=>{
    try {
        const { id } = req.params
        const { password, role, status, ...updateData } = req.body
        const user = await User.findByIdAndUpdate(id, updateData, {new: true})

        if(!user){
            return res.status(404).send(
                {
                    succses: false,
                    message: 'User not found'
                }
            )
        }
        return res.send(
            {
                succses: true,
                message: `User updated`,
                user
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                succses: false,
                message: 'General error',
                err
            }
        )
    }
}