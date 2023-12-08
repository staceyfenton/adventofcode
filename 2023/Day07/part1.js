import input from './input.js';

const camelCards = input.split('\n').map(game => game.split(' '));
const hands = camelCards.map(game => game[0]);
const bids = camelCards.map(game => game[1]);
const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const countOccurrences = (hand) => {
  const countMap = new Map();

  hand.forEach(draw => {
    countMap.set(draw, (countMap.get(draw) || 0) + 1);
  });

  return countMap;
};

const countOfSameCard = (hand, count) => {
  const countMap = countOccurrences(hand);
  const found = Array.from(countMap.values()).some(total => total === count);
  return found;
};

const isFullHouse = (hand) => {
  const countMap = countOccurrences(hand);

  let threeSame = false;
  let twoDifferent = false;

  for (const count of countMap.values()) {
    if (count === 3) {
      threeSame = true;
    }
  }

  if (countMap.size === 2) {
    twoDifferent = true;
  }

  return threeSame && twoDifferent;
}

const isTwoPair = (hand) => {
  const countMap = countOccurrences(hand);
  const valuesCount = Array.from(countMap.values());
  return valuesCount.length === 3 && valuesCount.includes(2) && valuesCount.includes(2) && valuesCount.includes(1);
}

const isOnePair = (hand) => {
  const countMap = countOccurrences(hand);
  const valuesCount = Array.from(countMap.values());
  return valuesCount.length === 4 && valuesCount.includes(2);
}

const isHighCard = (hand) => {
  const unique = [...new Set(hand)];
  return unique.length === hand.length;
}

const determineHandType = (hand) => {
  const handDraws = hand.split('');

  if (countOfSameCard(handDraws, 5)) {
    return 'Five of a kind';
  } else if (countOfSameCard(handDraws, 4)) {
    return 'Four of a kind';
  } else if (isFullHouse(handDraws)) {
    return 'Full house';
  } else if (countOfSameCard(handDraws, 3)) {
    return 'Three of a kind';
  } else if (isTwoPair(handDraws)) {
    return 'Two pair';
  } else if (isOnePair(handDraws)) {
    return 'One pair';
  } else {
    return 'High card';
  }
};

const handsWithType = hands.map((hand, index) => ({ hand, bid: bids[index], type: determineHandType(hand) }));

const sortedHands = handsWithType.sort((a, b) => {
  const strengthOrder = {
    'Five of a kind': 1,
    'Four of a kind': 2,
    'Full house': 3,
    'Three of a kind': 4,
    'Two pair': 5,
    'One pair': 6,
    'High card': 7,
  };

  // If the types are the same, compare based on hand value
  if (strengthOrder[a.type] === strengthOrder[b.type]) {
    for (let i = 0; i < a.hand.length; i++) {
      const labelIndexA = labels.indexOf(a.hand[i]);
      const labelIndexB = labels.indexOf(b.hand[i]);

      if (labelIndexA !== labelIndexB) {
        return labelIndexA - labelIndexB;
      }
    }
  }

  return strengthOrder[a.type] - strengthOrder[b.type];
});

// console.log(sortedHands.reverse());

const totalWinnings = sortedHands.reverse().reduce((sum, hand, index) => sum + hand.bid * (index + 1), 0);
console.log(`Total Winnings: ${totalWinnings}`);
