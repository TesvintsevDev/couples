import Card from './card.js';

function newGame(container, cardsCount) {
    // Создание поля
    let cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }

  // Логика игры
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard === null) {
      firstCard = card;
    } else {
      if (secondCard === null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number === secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.success').length === cardsNumberArray.length) {
	  // Сброс игры
      alert('Поздравляю, вы выиграли!');
      container.innerHTML = '';
      cardsNumberArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;

	  newGame(container, cardsCount)
    }
  }
}

newGame(document.getElementById('game'), 16);
