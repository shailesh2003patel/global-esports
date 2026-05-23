const mongoose = require("mongoose");

const joinSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Join", joinSchema);