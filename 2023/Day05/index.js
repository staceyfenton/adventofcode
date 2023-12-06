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
      const maxSeed = sourceStart + (rangeLength - 1);
      const minSeed = sourceStart;

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

/* ----- Part 2 ----- */

const seedRanges = [];

for (let i = 0; i < seeds.length; i += 2) {
  const minSeed = seeds[i];
  const maxSeed = minSeed + seeds[i + 1] - 1;

  seedRanges.push({ min: minSeed, max: maxSeed });
}

const findSeedFromLocation = (location) => {
  let seed = location;
  for (let i = (maps.length - 1); i > -1; i--) {
    for (const [destinationStart, sourceStart, rangeLength] of maps[i]) {
      const maxSource = destinationStart + (rangeLength - 1);
      const minSource = destinationStart;

      if (seed <= maxSource && seed >= minSource) {
        seed = sourceStart + (seed - minSource);
        break;
      }
    }
  }
  return seed;
}

const isSeedInRange = (seed) => {
  for (const range of seedRanges) {
    if (seed >= range.min && seed <= range.max) {
      return true;
    }
  }
  return false; 
}

let currentLocation = 0;

while (true) {
  currentLocation++;
  const seed = findSeedFromLocation(currentLocation);
  if (isSeedInRange(seed)) {
    console.log(currentLocation);
    break;
  }
}
