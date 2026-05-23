const express = require("express");

const router = express.Router();

const Tournament = require("../models/Tournament");

const Join = require("../models/Join");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware =
    require("../middleware/adminMiddleware");


// CREATE TOURNAMENT
router.post(
    "/create",
    authMiddleware,
    adminMiddleware,

    async (req, res) => {

    try {

        const tournament = new Tournament(req.body);

        await tournament.save();

        res.status(201).json({
            message: "Tournament created successfully",
            tournament
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete(
    "/:id",

    authMiddleware,
    adminMiddleware,

    async (req, res) => {

        try {

            await Tournament.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message: "Tournament deleted"
            });

        } catch(error){

            res.status(500).json({
                error: error.message
            });

        }

});

router.put(
    "/release-room/:id",

    authMiddleware,
    adminMiddleware,

    async (req, res) => {

        try {

            const {
                roomId,
                roomPassword
            } = req.body;

            const tournament =
                await Tournament.findByIdAndUpdate(

                    req.params.id,

                    {
                        roomId,
                        roomPassword
                    },

                    { new: true }

                );

            res.json({
                message: "Room released",
                tournament
            });

        } catch(error){

            res.status(500).json({
                error: error.message
            });

        }

});


// GET ALL TOURNAMENTS
router.get("/", async (req, res) => {

    try {

        const tournaments = await Tournament.find().sort({
            createdAt: -1
        });

        res.json(tournaments);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});

router.post("/join/:id", authMiddleware, async (req, res) => {

    try {

        const tournamentId = req.params.id;

        const userId = req.user.id;

        // CHECK IF ALREADY JOINED
        const alreadyJoined = await Join.findOne({
            userId,
            tournamentId
        });

        if(alreadyJoined){

            return res.status(400).json({
                message: "Already joined tournament"
            });

        }

        // SAVE JOIN
        const join = new Join({
            userId,
            tournamentId
        });

        await join.save();

        // UPDATE PLAYER COUNT
        await Tournament.findByIdAndUpdate(
            tournamentId,
            {
                $inc: {
                    joinedPlayers: 1
                }
            }
        );

        res.json({
            message: "Tournament joined successfully"
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/my-matches", authMiddleware, async (req, res) => {

    try {

        const joins = await Join.find({
            userId: req.user.id
        }).populate("tournamentId");

        const tournaments = joins.map(join => join.tournamentId);

        res.json(tournaments);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});
module.exports = router;