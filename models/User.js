const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: [true, 'All fields are required.'] },
    username: { type: String, required: [true, 'All fields are required.'] },
    hashedPassword: { type: String, required: [true, 'All fields are required.'] }
});

module.exports = model('User', schema);