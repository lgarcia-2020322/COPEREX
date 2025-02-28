import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async (req,res)=>{
    
    try {
        const existAdmin = await User.findOne({role: 'ADMIN'})
        if(!existAdmin){
            const adminData = {
            name: "admin",
            surname: "admin",
            username: "admin",
            email: "admin@admin.com",
            password: await encrypt("Lqie1983#"),
            phone: "12345678",
            role: "ADMIN",
            status: true
            } 
            const adminUser = new User(adminData)
            await adminUser.save()
            console.log("Admin created successfully")
        }
        
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'ADMIN' 
        await user.save()
        return res.send (
            {
                succses: true,
                message: `Registered successfully, can be logged with username: ${user.username}`
            }
        )
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}