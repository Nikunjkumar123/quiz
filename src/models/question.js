const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    descriptive: String,
    alternative: [
        {
            text: {
                type: String,
                required: true,
            },
            isCorrect:{
                type: Boolean,
                required: true,
                default: true,
            }     
        }
    ]
})

module.exports = mongoose.model('Question', questionSchema);