const Workout = require("../models/workoutsModel");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        // return all the workout and sort them by date (last to first)
        const workout = await Workout.find({}).sort({ createAt: -1 });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a single workout
const getSingleWorkout = async (req, res) => {
    // get the id from the req params (/:id)
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
};


// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete workout
//FIXME: work but generate an error
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    // in mongoDB id key = _id
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (workout) {
        res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
};

// update workout
//FIXME: work but generate an error
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    // in mongoDB id key = _id
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (workout) {
        res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
};


module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
};