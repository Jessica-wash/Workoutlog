const { query } = require('express');
let Express = require('express');
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { WorkoutModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey, this is a practice route.')
});

router.post('/create', validateJWT, async (req, res) => {
    const { title, date, entry } = req.body.journal;
    const { id } = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner: id
    }
    try {
        const newJournal = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    WorkoutModel.create(workoutEntry)
});

/**
 * 
 *      Get all workouts
 * 
 */
router.get("/", async (req, rea) => {
    try {
        const entries = await WorkoutModel.findAll();
        res.status(500).json({ error: err });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/**
 * 
 *      Get workouts by user
 * 
 */

router.get("/mine", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userWorkouts = await WorkoutModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userWorkouts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

/**
 * 
 *   Get workouts by title
 * 
 */

router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const results = await WorkoutModel.findAll({
            where: { title: title }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});


router.get('/about', (req, res) => {
    res.send('This is the about route.')
});


/*
 
  Updtate a workout
 
 */

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {title, date, entry } = req.body.workout;
    const workoutId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: workoutId,
            owner: userId
        }
    };

    const updatedWorkout ={
        title: title,
        date: date,
        entry: entry
    };

    try{
        const update = await WorkoutModel.update(updatedWorkout, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

/*
        Delete  a workout
 */

router.delete("/delete/:id", validateJWT, async(req, res) =>{
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try {
        const query ={
            where:{
                id: workoutId,
            owner: ownerId
            }
        };

    await WorkoutModel.destroy(query);
    res.status(200).json({message: "Journal Entry Removed"});
    } catch(err) {
        res.status(500).json({error: err});
    }
})


module.exports = router;