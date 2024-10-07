const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({
    name: req.body.name,
    duration: req.body.duration,
  });

  newWorkout
    .save()
    .then((savedWorkout) => res.status(201).send(savedWorkout))
    .catch((saveErr) => {
      console.error("Error in saving the Workout: ", saveErr);
      return res.status(500).send({ error: "Failed to save the Workout" });
    });
};

module.exports.getMyWorkouts = (req, res) => {
  Workout.find({})
    .then((Workouts) => {
      if (Workouts.length > 0) {
        return res.status(200).send({ Workouts });
      } else {
        return res.status(200).send({ message: "No Workouts found." });
      }
    })
    .catch((err) => res.status(500).send({ error: "Error finding Workouts." }));
};

module.exports.getWorkoutById = (req, res) => {
  Workout.findById(req.params.id)
    .then((foundWorkout) => {
      if (!foundWorkout) {
        return res.status(404).send({ error: "Workout not found" });
      }
      return res.status(200).send({ foundWorkout });
    })
    .catch((err) => {
      console.error("Error in fetching the Workout: ", err);
      return res.status(500).send({ error: "Failed to fetch Workout" });
    });
};

module.exports.updateWorkout = (req, res) => {
  let WorkoutUpdates = {
    name: req.body.name,
    duration: req.body.duration,
  };

  return Workout.findByIdAndUpdate(req.params.id, WorkoutUpdates)
    .then((updatedWorkout) => {
      if (!updatedWorkout) {
        return res.status(404).send({ error: "Workout not found" });
      }

      return res.status(200).send({
        message: "Workout updated successfully",
        updatedWorkout: updatedWorkout,
      });
    })
    .catch((err) => {
      console.error("Error in updating an Workout : ", err);
      return res.status(500).send({ error: "Error in updating an Workout." });
    });
};

module.exports.deleteWorkout = (req, res) => {
  return Workout.deleteOne({ _id: req.params.id })
    .then((deletedResult) => {
      if (deletedResult < 1) {
        return res.status(400).send({ error: "No Workout deleted" });
      }

      return res.status(200).send({
        message: "Workout deleted successfully",
      });
    })
    .catch((err) => {
      console.error("Error in deleting an Workout : ", err);
      return res.status(500).send({ error: "Error in deleting an Workout." });
    });
};
