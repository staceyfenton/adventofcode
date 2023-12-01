import input from './input.js';

const calculateSum = (digits) => {
  if (!digits) {
    return 0;
  }

  const first = digits[0];
  const last = digits.at(-1);
  return parseInt(first + last);
}

const partOne = (input) => {
  return input.reduce((sum, item) => {
    const digits = item.match(/\d/g);
    return sum + calculateSum(digits);
  }, 0);
}

const partTwo = (input) => {
  let sum = 0;
  const wordToNumber = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
  };
  const words = Object.keys(wordToNumber);
  
  for(let i = 0; i < input.length; i++) {
    let item = input[i];
    
    for (const word of words) {
      item = item.replaceAll(word, `${word[0]}${wordToNumber[word]}${word.at(-1)}`);
    }
    
    const digits = item.match(/\d/g);
    sum += calculateSum(digits);
  }

  return sum;
}

const partOneSum = partOne(input);
const partTwoSum = partTwo(input);
console.log(partOneSum, partTwoSum);