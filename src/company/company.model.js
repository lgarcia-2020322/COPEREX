import { Schema, model } from 'mongoose'

const CompanySchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },

        impactLevel: { 
            type: String, 
            required: true 
        },

        yearsOfExperience: { 
            type: Number, 
            required: true, 
            min: 0 
        },

        category: { 
            type: Schema.Types.ObjectId, 
            ref: 'Category', 
            required: true 
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Company', CompanySchema)
