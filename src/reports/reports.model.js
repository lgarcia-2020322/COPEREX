import { Schema, model } from 'mongoose'

const ReportSchema = new Schema(
    {
        generatedBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },

        generatedAt: { 
            type: Date, 
            default: Date.now 
        },

        filePath: { 
            type: String, 
            required: true 
        }
    }
)

export default model('Report', ReportSchema)
