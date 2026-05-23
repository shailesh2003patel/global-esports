const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    game: {
        type: String,
        required: true
    },

    mode: {
        type: String,
        required: true
    },

    map: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    prizePool: {
        type: Number,
        required: true
    },

    perKill: {
        type: Number,
        required: true
    },

    entryFee: {
        type: Number,
        default: 0
    },

    maxPlayers: {
        type: Number,
        required: true
    },

    joinedPlayers: {
        type: Number,
        default: 0
    },

    roomId: {
        type: String,
        default: ""
    },

    roomPassword: {
        type: String,
        default: ""
    },

    bannerImage: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "upcoming"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Tournament", tournamentSchema);