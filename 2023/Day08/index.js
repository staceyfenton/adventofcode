import input from './input.js';

const lines = input.split('\n');
const directions = lines[0].split('');
const network = lines.slice(2);
const parseNetwork = network.map(n => n.split(' = '));
// console.log(parseNetwork);

// console.log(directions);
// console.log(network);

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
    if (location === 'ZZZ') {
      break;
    }
  }
  return steps;
}

console.log(getNumberOfSteps());
