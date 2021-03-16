const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const BatchSchema = new mongoose.Schema({
    number: {
        required: true,
        type: Number,
        unique: [true, 'Batch number already exist'],
        min: [1, 'Minimum batch number is 1']
    },
    size: {
        required: true,
        type: String,
        enum: {
            values: ['S', 'M', 'L', 'XL'],
            message: 'size can only be one of S, M, L and XL'
        }
    },
    color: {
        required: true,
        type: String,
        enum: {
            values: ['red', 'blue', 'black', 'green'],
            message: 'size can only be one of red, blue, black and green'
        }
    },
    quantity: {
        required: true,
        type: Number,
        min: 1
    } 
})
BatchSchema.plugin(uniqueValidator, { message: 'Batch number already exist, please choose another number' });

const Batch = mongoose.model('Batch', BatchSchema);

module.exports = Batch;