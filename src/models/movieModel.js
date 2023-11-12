const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectI,
        ref: "User",
    },
    genre: {
        type: [String],
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        // default: 
    },
    ratings: {
        type: Number,
        default: 0,
    },
    actors: {
        type: [String],
        required: true,
        trim: true
    },
    director: {
        type: String,
        required: true
    },
    technicians: {
        type: [String],
        required: true,
        trim: true
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Movie', movieSchema) 