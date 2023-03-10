const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema ({

    title: {
        type: String
    },

    episodes: {
        type: Number
    },

    synopsis: {
        type: String
    },
    
    status: {
        type: String,
        required: true,
        enum: {values: ['Not Started', 'In Progress', 'Completed'], message: 'Required field'}
    },

    comment: {
        type: String
    }

}, {timestamps:true} )

const Anime = mongoose.model('anime', AnimeSchema)
module.exports = Anime; 