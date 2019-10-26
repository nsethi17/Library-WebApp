const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: {type: String, required: true, max: 100},
    type: {type: String, required: true, max: 5 },
    dueDate: {type: Number, required: true},
    img: {type: String,required: true},
});

// Exporting the model
module.exports = mongoose.model('Item', ItemSchema);