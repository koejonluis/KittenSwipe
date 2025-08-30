const images = [
  'https://placekitten.com/300/400',
  'https://placekitten.com/301/400',
  'https://placekitten.com/300/401',
  'https://placekitten.com/302/400'
];

const deck = document.getElementById('deck');
const summary = document.getElementById('summary');
const likedContainer = document.getElementById('liked');
const liked = [];

function createCard(url) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.backgroundImage = `url(${url})`;

  let startX = 0;
  let currentX = 0;
  let dragging = false;

  const onPointerDown = (e) => {
    startX = e.clientX;
    dragging = true;
    card.style.transition = 'none';
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    card.style.transition = '';
    if (currentX > 100) {
      like();
    } else if (currentX < -100) {
      dislike();
    } else {
      card.style.transform = '';
    }
    currentX = 0;
  };

  const like = () => {
    liked.push(url);
    removeCard();
  };

  const dislike = () => {
    removeCard();
  };

  function removeCard() {
    card.removeEventListener('pointerdown', onPointerDown);
    card.removeEventListener('pointermove', onPointerMove);
    card.removeEventListener('pointerup', onPointerUp);
    card.removeEventListener('pointerleave', onPointerUp);
    card.remove();
    if (!deck.children.length) {
      showSummary();
    }
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('pointerleave', onPointerUp);

  return card;
}

function showSummary() {
  deck.classList.add('hidden');
  summary.classList.remove('hidden');
  liked.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    likedContainer.appendChild(img);
  });
}

// Initialize deck
document.addEventListener('DOMContentLoaded', () => {
  images.slice().reverse().forEach((url) => deck.appendChild(createCard(url)));
});
