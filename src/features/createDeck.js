import { ref } from 'vue';

const cardList = ref([]);

const initDeck = (deckData) => {
  deckData.forEach((item) => {
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
      visible: true,
      position: null,
      matched: false,
      image: require(`@/assets/images/Halloween/${item}.png`),
    });
  });
};

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
};

export default function createDeck(deckData) {
  initDeck(deckData);
  updateCardPosition();
  return {
    cardList,
  };
}
