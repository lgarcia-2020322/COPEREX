import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },

        description: { 
            type: String, 
            default: 'No description provided' 
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Category', CategorySchema)
