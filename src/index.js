import render, { getCord } from '../modules/render.js';
// import TasksBluePrint from '../modules/tasks-functionality';

// const copyTasksBluePrint = new TasksBluePrint();

require('./styles.css');

render();
const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

// cards.forEach((card) => {
//   registerEventsOnCard(card);
// });
function getCardAfterDraggingCard(list, yDraggingCard) {
  const listCards = [...list.querySelectorAll('.card:not(.dragging)')];

  return listCards.reduce(
    (closestCard, nextCard) => {
      const nextCardRect = nextCard.getBoundingClientRect();
      const offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;

      if (offset < 0 && offset > closestCard.offset) {
        return { offset, element: nextCard };
      }
      return closestCard;
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}

lists.forEach((list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    const cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
    if (cardAfterDraggingCard) {
      cardAfterDraggingCard.parentNode.insertBefore(
        draggingCard,
        cardAfterDraggingCard,
      );
    } else {
      list.appendChild(draggingCard);
    }
  });
});

// function getCardAfterDraggingCard(list, yDraggingCard) {
//   const listCards = [...list.querySelectorAll('.card:not(.dragging)')];

//   return listCards.reduce(
//     (closestCard, nextCard) => {
//       const nextCardRect = nextCard.getBoundingClientRect();
//       const offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;

//       if (offset < 0 && offset > closestCard.offset) {
//         return { offset, element: nextCard };
//       }
//       return closestCard;
//     },
//     { offset: Number.NEGATIVE_INFINITY },
//   ).element;
// }

function registerEventsOnCard(card) {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');

    const liCords = getCord();
    const localArr = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < liCords.length; i += 1) {
      localArr[i].description = liCords[i].text;
    }
    localStorage.setItem('todos', JSON.stringify(localArr));
  });
}

cards.forEach((card) => {
  registerEventsOnCard(card);
});
