import input from './input.js';

const almanac = input.split('\n\n').map(input => input.split('\n'));

// Extract seeds and mappings
const seeds = almanac[0][0].split(':')[1].trim().split(' ').map(number => parseInt(number));
const maps = almanac.slice(1).map(section => section.slice(1).map(item => item.split(' ').map(number => parseInt(number))));
const locations = [];

// Function to find location from seed
const findLocationFromSeed = (seed) => {
  let current = seed;
  for (const map of maps) {
    for (const [destinationStart, sourceStart, rangeLength] of map) {
      const maxSeed = sourceStart + rangeLength;
      const minSeed = sourceStart;

      // console.log(`current: ${current}, min: ${minSeed}, max: ${maxSeed}`);
      if (current >= minSeed && current <= maxSeed) {
        current = destinationStart + (current - minSeed);
        break;
      }
    }
  }
  return current;
}

for (const seed of seeds) {
  locations.push(findLocationFromSeed(seed));
}

const min = Math.min(...locations);
console.log(min);
