const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: [true, 'All fields are required.'], minLength: [6, 'Name must be at least 6 characters long'] },
    type: { type: String, required: [true, 'All fields are required.'] },
    year: { type: Number, required: [true, 'All fields are required.'], min: [1850, 'Year should be min. 1850'], max: [2021, 'Year should be max. 2021'] },
    city: { type: String, required: [true, 'All fields are required.'], minLength: [4, 'City must be at least 4 characters long'] },
    homeImage: { type: String, required: [true, 'All fields are required.'], match: [/^https?/, 'Image must be valid URL'] },
    propertyDescription: { type: String, required: [true, 'All fields are required.'], maxLength: [60, 'Description must be max. 60 characters long']  },  
    availablePieces: { type: Number, required: [true, 'All fields are required.'], min: [0, 'Available must be at least 0'], max: [10, 'Available must be at max. 10'] },
    rentedAHome: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Housing', schema);