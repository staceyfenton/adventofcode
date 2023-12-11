import input from './input.js';

// Split the input into individual histories and convert string numbers to integers
const histories = input.split('\n').map(history => history.split(' ').map(str => parseInt(str)));

// Function to find the next number in a sequence recursively
const findNextInSequence = (history, isPartTwo = false) => {
  let differences = [];
  let nextNumber = 0;

  // Calculate the differences between consecutive numbers in the sequence
  for (let i = 0; i < history.length - 1; i++) {
    differences[i] = history[i + 1] - history[i];
    nextNumber += differences[i];
  }

  // If the next number is not zero, continue the sequence recursively
  if(nextNumber !== 0) {
    nextNumber = findNextInSequence(differences, isPartTwo);
  }

  // If part one, return the sum of the next number and the last number in the original sequence
  // If part two, return the first number in the original sequence minus the next number
  return isPartTwo ? history[0] - nextNumber : nextNumber + history[history.length-1];
};

// Calculate the sum of the next numbers in each history
const partOneSum = histories.reduce((acc, history) => acc + findNextInSequence(history), 0);
const partTwoSum = histories.reduce((acc, history) => acc + findNextInSequence(history, true), 0);

// Output the final sums
console.log(partOneSum, partTwoSum);
