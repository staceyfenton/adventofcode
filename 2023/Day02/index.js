import input from './input.js';

const games = input.split('\n').map((item) => {
  const [gameId, results] = item.split(': ');
  const id = gameId.replace('Game ', '');
  const sets = results.split('; ').map((set) => {
    return set.split(', ').map((cubes) => {
      const [num, colour] = cubes.split(' ');
      return [parseInt(num), colour];
    });
  });
  return { id, sets };
});

const isGamePossible = (game) => {
  const limits = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return !game.sets.some((set) =>
    set.some(([num, colour]) => num > limits[colour])
  );
}

const getMinCubes = (game) => {
  const minQuantities = { red: 0, blue: 0, green: 0 };
  
  for (const set of game.sets) {
    set.forEach(([num, colour]) => {
      minQuantities[colour] = Math.max(minQuantities[colour], num);
    });
  }
  
  return minQuantities;
}

const calculateGameIdsSum = (games) =>
  games.reduce((sum, game) => (isGamePossible(game) ? sum + parseInt(game.id) : sum), 0);

const calculatePowerSum = (games) => {
  const powers = games.map((game) => {
    const minValues = Object.values(getMinCubes(game));
    return minValues.reduce((acc, val) => acc * val, 1);
  });
  
  const totalPower = powers.reduce((acc, val) => acc + val, 0);
  return totalPower;
}

const gameIdsSum = calculateGameIdsSum(games);
const powerSum = calculatePowerSum(games);

console.log(gameIdsSum);
console.log(powerSum);