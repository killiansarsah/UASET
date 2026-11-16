const assert = require('assert');
const { WorkoutTracker } = require('./src/tracker');

console.log('[*] Running FitTrack Mobile test suite...');
const tracker = new WorkoutTracker();

tracker.logWorkout('Running', 30, 320);
tracker.logWorkout('Cycling', 45, 450);

assert.strictEqual(tracker.workouts.length, 2);
assert.strictEqual(tracker.getTotalCalories(), 770);
assert.throws(() => tracker.logWorkout('Swimming', -10, 100), /Duration must be positive/);

console.log('[+] All FitTrack Mobile tests passed (3/3 assertions verified).');
