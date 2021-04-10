import _ from 'lodash';
import { ref, computed } from 'vue';

export function createGame(deck) {
  const newPlayer = ref(true);

  const startGame = () => {
    newPlayer.value = false;
    restartGame();
  };

  const restartGame = () => {
    deck.value = _.shuffle(deck.value);

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        matched: false,
        visible: false,
        position: index,
      };
    });
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      return 'Player wins!';
    } else {
      return `Remaining Pairs: ${remainingPairs.value}`;
    }
  });

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter((card) => card.matched === false)
      .length;

    return remainingCards / 2;
  });

  const matchesFound = computed(() => {
    const matchedCards = deck.value.filter((card) => card.matched === true)
      .length;

    return matchedCards / 2;
  });

  return {
    newPlayer,
    startGame,
    restartGame,
    status,
    remainingPairs,
    matchesFound,
  };
}
