import input from './input.js';

const camelCards = input.split('\n').map(game => game.split(' '));
const labels = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const assignCardStrength = (cards) => {
  return cards.split('').map(card => labels.indexOf(card));
};

const scoreHand = (cards) => {
  const cardCountMap = new Map();
  let jokers = 0;

  // count the occurances of each card
  cards.split('').forEach(card => {
    if (card === 'J') {
      jokers++;
    } else {
      cardCountMap.set(card, (cardCountMap.get(card) || 0) + 1);
    }
  });
  
  // determine the score based on the card counts
  const [first = 0, second = 0] = [...cardCountMap.values()].sort((a, b) => b - a);
  return (first + jokers) * 2 + second;
};

// compare two hands for sorting
const compareHands = ({ cards: handA, score: scoreA }, { cards: handB, score: scoreB }) => {
  if (scoreA !== scoreB) return scoreA - scoreB;

  // Compare card strengths if scores are equal
  for (let i = 0; ; i++) {
    if (handA[i] !== handB[i]) {
      return handA[i] - handB[i];
    }
  }
};

// Calculate the total winnings for all hands in the game based on the bid and the hand's position in the sorted list
const calculateTotalWinnings = (hands) => {
  return hands
    .sort(compareHands)
    .map(({ bid }, i) => bid * (i + 1))
    .reduce((sum, num) => sum + num, 0);
};

const hands = camelCards.map(([cards, bid]) => ({ cards: assignCardStrength(cards), bid: Number(bid), score: scoreHand(cards) }));
// console.log(hands);

console.log(calculateTotalWinnings(hands));
