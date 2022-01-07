import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    content: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model('Profile', profileSchema)