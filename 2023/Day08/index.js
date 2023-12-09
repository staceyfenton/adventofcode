import input from './input.js';

const lines = input.split('\n');
const directions = lines[0].split('');
const network = lines.slice(2);
const parseNetwork = network.map(n => n.split(' = '));

const getNextNode = (nodes, direction) => {
  const [leftNode, rightNode] = nodes[1].slice(1, -1).split(', ');
  return direction === 'L' ? leftNode : rightNode;
}

const getNumberOfSteps = (location = 'AAA') => {
  let steps = 0;
  while (true) {
    // which direction are we going?
    const direction = directions[steps++ % directions.length];
    const node = parseNetwork.find(item => item[0] === location);
    location = getNextNode(node, direction);
    if (location.split('')[2] === 'Z') {
      break;
    }
  }
  return steps;
}

console.log(getNumberOfSteps());

/* Part 2 */

// find possible starting locations ending in A
const startingLocations = parseNetwork.filter(item => item[0].endsWith('A')).map(item => item[0]);

// calculate the Greatest Common Divisor (GCD)
const calculateGCD = (num1, num2) => (num2 === 0 ? num1 : calculateGCD(num2, num1 % num2));

// calculate the Least Common Multiple (LCM)
const calculateLCM = (num1, num2) => (num1 / calculateGCD(num1, num2)) * num2;

const steps = startingLocations.map(getNumberOfSteps).reduce(calculateLCM);
console.log(steps);