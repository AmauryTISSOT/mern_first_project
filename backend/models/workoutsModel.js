const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema who describe the structure of workout database
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

//Create and export model
module.exports = mongoose.model('Workout', workoutSchema);