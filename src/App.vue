<script>
import { ref, watch } from 'vue';
import { createDeck } from './features/createDeck.js';
import { createGame } from './features/createGame.js';
import { lunchConfetti } from './utilities/confetti';
import Card from './components/Card';
import halloweenDeck from './data/halloweenDeck.json';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const { cardList } = createDeck(halloweenDeck);
    const {
      newPlayer,
      startGame,
      status,
      restartGame,
      remainingPairs,
    } = createGame(cardList);

    const userSelection = ref([]);

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;
      if (userSelection.value[0]) {
        if (
          cardList.value[payload.position].matched ||
          (userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue)
        ) {
          return;
        } else {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    };

    watch(remainingPairs, (currentValue) => {
      if (currentValue === 0) {
        lunchConfetti();
      }
    });

    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 500);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      status,
      restartGame,
      startGame,
      newPlayer,
    };
  },
};
</script>

<template>
  <h1>Peek-a-Card</h1>
  <section class="description">
    <p>Welcome to Peek-a-Card</p>
    <p>A card matching game powered by Vue.js 3 !</p>
  </section>
  <transition-group tag="section" name="shuffle-card" class="game-board">
    <Card
      v-for="card in cardList"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      :image="card.image"
      :key="`card-${card.value}-${card.variant}`"
      @select-card="flipCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
  <button v-if="newPlayer" @click="startGame" class="button">
    <img src="@/assets/images/Halloween/play.svg" alt="Start Icon" />
    Start Game
  </button>
  <button v-else @click="restartGame" class="button">
    <img src="@/assets/images/Halloween/restart.svg" alt="Restart Icon" />
    Restart Game
  </button>
  <!-- <button @click="shuffleCards">Shuffle Cards</button> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap');

html,
body {
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 0;
  padding-top: 4px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-image: url('~@/assets/images/Halloween/page-bg.png');
  background-color: #00070c;
  height: 100vh;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}

.shuffle-card-move {
  transition: transform 0.8 ease-in;
}

.status {
  font-family: 'Titillium Web', sans-serif;
}

.button {
  background-color: orange;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.1rem;
  border-radius: 10px;
}

.button img {
  padding-right: 5px;
}

.description {
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.2rem;
}

.description p {
  margin: 0;
}

.description p:last-child {
  margin-bottom: 30px;
}
</style>
