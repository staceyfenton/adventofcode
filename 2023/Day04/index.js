import input from './input.js';

// Process cards to get winning numbers and my numbers
const cleanedCardData = cards.map(card => {
  const [, cardData] = card.split(': ');
  const [winningNumbers, myNumbers] = cardData.split('|').map(part => part.replace(/\s+/g, ' ').trim());
  return { winningNumbers, myNumbers };
});

// Calculate total points based on matching numbers
let totalPoints = 0;

const getMatchingNumbers = (winningNumbers, myNumbers) => {
  return myNumbers.split(' ').filter(number => winningNumbers.split(' ').includes(number));
}

cleanedCardData.forEach(({ winningNumbers, myNumbers }) => {
  const matchingNumbers = getMatchingNumbers(winningNumbers, myNumbers);

  if (matchingNumbers.length > 0) {
    const points = Math.pow(2, matchingNumbers.length - 1);
    totalPoints += points;
  }
});

console.log(`Total points: ${totalPoints}`);

/* Part Two */ 

let amountOfCardsArray = Array(cards.length).fill(1);

for (let i = 0; i < cards.length; i++) {
  const { winningNumbers, myNumbers } = cleanedCardData[i];
  const numberOfMatches = getMatchingNumbers(winningNumbers, myNumbers).length

  for (let x = 1; x <= numberOfMatches; x++) {
    amountOfCardsArray[i + x] += amountOfCardsArray[i];
  }
}

console.log(`Total scratchcards: ${amountOfCardsArray.reduce((acc, val) => acc + val, 0)}`);