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
  if (playerId) localStorage.setItem('songuess-player', playerId);
};