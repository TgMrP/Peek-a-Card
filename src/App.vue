<template>
  <h1>Peek-a-Card</h1>
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
  <h2>{{ status }}</h2>
  <button @click="restartGame" class="button">
    <img src="@/assets/images/Halloween/restart.svg" alt="Restart Icon" />
    Restart Game
  </button>
  <!-- <button @click="shuffleCards">Shuffle Cards</button> -->
</template>

<script>
import _ from 'lodash';
import { computed, ref, watch } from 'vue';
import Card from './components/Card';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'Player wins!';
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    const restartGame = () => {
      cardList.value = _.shuffle(cardList.value);

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          visible: false,
          position: index,
        };
      });
    };

    const cardItems = [
      'bat',
      'candy',
      'cauldron',
      'cupcake',
      'ghost',
      'moon',
      'pumpkin',
      'witch-hat',
    ];

    cardItems.forEach((item) => {
      cardList.value.push({
        value: item,
        variant: 1,
        visible: false,
        position: null,
        matched: false,
        image: require(`@/assets/images/Halloween/${item}.png`),
      });

      cardList.value.push({
        value: item,
        variant: 2,
        visible: false,
        position: null,
        matched: false,
        image: require(`@/assets/images/Halloween/${item}.png`),
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

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
    };
  },
};
</script>

<style>
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

.button {
  background-color: orange;
  color: white;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
}

.button img {
  padding-right: 5px;
}
</style>
