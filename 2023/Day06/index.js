import input from './input.js';

const extractValues = (label) => {
  const line = label === 'Time' ? 0 : 1;
  return input.split('\n')[line].split(`${label}:`)[1].trim().split(/\s+/).filter(n => n);
}

const times = extractValues('Time');
const distances = extractValues('Distance');
const recordNumbers = [];

const calculateRecords = (time, distance) => {
  const records = [];

  for (let t = 0; t < time; t++) {
    const bottomHoldMs = t;
    const travelTime = time - bottomHoldMs;
    const possibleDistance = travelTime * bottomHoldMs;

    if (possibleDistance > distance) {
      records.push(bottomHoldMs);
    }
  }

  return records.length;
}

times.forEach((time, i) => {
  recordNumbers.push(calculateRecords(time, distances[i]));
});

const marginOfError = recordNumbers.reduce((acc, val) => acc * val, 1);
console.log(marginOfError);

/* Part 2 */

const raceTime = times.join('');
const raceDistance = distances.join('');
const raceRecords = calculateRecords(raceTime, raceDistance);

console.log(raceRecords);
