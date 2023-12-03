import input from './input.js';

const lines = input.split('\n');
const numbersWithAdjacentSymbols = [];
const regexNumbers = /\d+/g;
const regexSymbols = /[^.\d]/g;

// find all positions of a symbol in a string
const findAllSymbolPositions = (str, symbol) => {
  const positions = [];
  let index = str.indexOf(symbol);
  while (index !== -1) {
    positions.push(index);
    index = str.indexOf(symbol, index + 1);
  }
  return positions;
}

// find adjacent symbols in the same row, row above, and row below
const findAdjacentSymbols = (inputArray, currentRow, currentPosition, numberLength) => {
  const adjacentSymbols = [];

  // Check the same row for adjacent symbols
  const currentRowSymbols = inputArray[currentRow].match(regexSymbols);
  if (currentRowSymbols) {
    for (const symbol of currentRowSymbols) {
      const symbolPositions = findAllSymbolPositions(inputArray[currentRow], symbol);
      for (const symbolPosition of symbolPositions) {
        if (symbolPosition >= currentPosition - 1 && symbolPosition < (currentPosition + numberLength + 1)) {
          adjacentSymbols.push({ value: symbol, position: symbolPosition, row: currentRow });
        }
      }
    }
  }

  // Check the row above for adjacent symbols
  if (currentRow > 0) {
    const aboveRowSymbols = inputArray[currentRow - 1].match(regexSymbols);
    if (aboveRowSymbols) {
      for (const symbol of aboveRowSymbols) {
        const symbolPositions = findAllSymbolPositions(inputArray[currentRow - 1], symbol);
        for (const symbolPosition of symbolPositions) {
          if (symbolPosition >= currentPosition - 1 && symbolPosition < (currentPosition + numberLength + 1)) {
            adjacentSymbols.push({ value: symbol, position: symbolPosition, row: currentRow - 1 });
          }
        }
      }
    }
  }

  // Check the row below for adjacent symbols
  if (currentRow < inputArray.length - 1) {
    const belowRowSymbols = inputArray[currentRow + 1].match(regexSymbols);
    if (belowRowSymbols) {
      for (const symbol of belowRowSymbols) {
        const symbolPositions = findAllSymbolPositions(inputArray[currentRow + 1], symbol);
        for (const symbolPosition of symbolPositions) {
          if (symbolPosition >= currentPosition - 1 && symbolPosition < (currentPosition + numberLength + 1)) {
            adjacentSymbols.push({ value: symbol, position: symbolPosition, row: currentRow + 1 });
          }
        }
      }
    }
  }

  return adjacentSymbols;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Extract numbers
  let matchNumbers;
  while ((matchNumbers = regexNumbers.exec(line)) !== null) {
    const numberInfo = {
      value: parseInt(matchNumbers[0]),
      position: matchNumbers.index,
      row: i
    };
   
    // Check for adjacent symbols in the same row, row above, and row below
    const adjacentSymbols = findAdjacentSymbols(lines, i, matchNumbers.index, numberInfo.value.toString().length);
    if (adjacentSymbols.length > 0) {
      numberInfo.adjacentSymbols = adjacentSymbols;
      numbersWithAdjacentSymbols.push(numberInfo);
    }
  }
}

// Add up the part numbers 
const sumOfPartNumbers = numbersWithAdjacentSymbols.reduce((sum, obj) => sum + obj.value, 0);

console.log(sumOfPartNumbers);

/*----- Part Two ----- */

// group an array of objects by a specific property
const groupBy = (array, property) => {
  const groups = {};
  array.forEach((item) => {
    const key = JSON.stringify(item[property]);
    groups[key] = groups[key] || [];
    groups[key].push(item);
  });
  return groups;
}

const groupedByAdjacentSymbols = groupBy(numbersWithAdjacentSymbols, 'adjacentSymbols');

// find gears with the same adjacentSymbols object when the symbol equals '*'
const gearsArray = Object.values(groupedByAdjacentSymbols)
  .filter((parts) => parts.length > 1 && parts.some(part => part.adjacentSymbols[0].value === '*'))
  .reduce((gears, parts) => {
    const numbers = parts.map(part => part.value);
    gears.push(numbers);
    return gears;
  }, []);

// Get the gear ratio by multiplying the numbers together
const gearRatios = gearsArray.map(array => array.reduce((acc, value) => acc * value, 1));

// Get the sum of all gear ratios
const sumOfGearRatios = gearRatios.reduce((acc, value) => acc + value, 0);

console.log(sumOfGearRatios);