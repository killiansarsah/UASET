class WorkoutTracker {
  constructor() {
    this.workouts = [];
  }
  logWorkout(type, durationMins, calories) {
    if (durationMins <= 0) throw new Error('Duration must be positive');
    const entry = { id: this.workouts.length + 1, type, durationMins, calories, timestamp: Date.now() };
    this.workouts.push(entry);
    return entry;
  }
  getTotalCalories() {
    return this.workouts.reduce((sum, w) => sum + w.calories, 0);
  }
}
module.exports = { WorkoutTracker };
