import * as firebase from 'firebase';

// Game --------------------------------------------------------------------

export const generateGameId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const loadGame = () => {
  const playerId = localStorage.getItem('songuess-player');
  const activeGameId = localStorage.getItem('songuess-game');
  let isOwner = localStorage.getItem('songuess-game-owner');
  isOwner = isOwner === 'true' ? true : false;
  return { playerId, activeGameId, isOwner };
};

export const clearGame = gameId => {
  localStorage.removeItem('songuess-player');
  localStorage.removeItem('songuess-game');
  localStorage.removeItem('songuess-game-owner');
};

export const persistGame = ({ gameId, isOwner, playerId }) => {
  localStorage.setItem('songuess-game', gameId);
  localStorage.setItem('songuess-game-owner', isOwner);
  localStorage.setItem('songuess-player', playerId);
};

// Other --------------------------------------------------------------------

export const generateGradient = () => {
  const hexValues = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
  ];

  function hexcolor() {
    return range(6).reduce(acc => {
      const i = Math.round(Math.random() * 14);
      return `${acc}${hexValues[i]}`;
    }, '#');
  }

  const c1 = hexcolor();
  const c2 = hexcolor();
  const angle = Math.round(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${c1}, ${c2})`;
};
