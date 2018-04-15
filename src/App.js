import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
import Gutter from 'react-components-kit/dist/Gutter';
import Button from 'react-components-kit/dist/Button';

import { loadGame, clearGame, generateGameId, persistGame } from './game.utils';
import { generateGradient } from './utils';

import Game from './components/Game';
import JoinGame from './components/JoinGame';

class App extends Component {
  constructor(props) {
    super(props);

    const { playerId, activeGameId, isOwner } = loadGame();

    this.db = firebase.database();
    this.state = {
      isOwner,
      playerId,
      activeGameId, // ID of the active game

      loading: true,
      game: null,
      joinModalVisible: false,
    };
  }

  componentDidMount() {
    const { activeGameId } = this.state;
    if (activeGameId) this.listenGameData(activeGameId);
    this.setState({ loading: false });
  }

  listenGameData = gameId => {
    this.db.ref(`games/${gameId}`).on('value', snapshot => {
      const game = snapshot.val();
      if (game) {
        this.setState({ game });
      } else {
        this.setState({ game: null, activeGameId: null, playerId: null });
        clearGame(); // host deleted the game
      }
    });
  };

  createGame = () => {
    const gameId = generateGameId();
    persistGame({ isOwner: true, gameId });
    this.db.ref(`games/${gameId}`).set({ id: gameId }); // create game in db
    this.setState({ activeGameId: gameId, isOwner: true });
    this.listenGameData(gameId);
  };

  deleteGame = () => {
    const { game } = this.state;
    clearGame();
    this.db.ref(`games/${game.id}`).remove(); // remove from game
    this.setState({ activeGameId: null, isOwner: false, playerId: null });
  };

  endGame = () => {
    const { game } = this.state;
    this.db.ref(`games/${game.id}`).update({
      gameOver: true,
    });
  };

  joinGame = playerName => {
    const { game } = this.state;
    const playerId = this.db.ref(`games/${game.id}/players`).push().key;

    // Add new player to game
    this.db.ref(`games/${game.id}/players/${playerId}`).set({
      id: playerId,
      name: playerName,
      color: generateGradient(),
    });

    persistGame({ isOwner: false, gameId: game.id, playerId });

    this.listenGameData(game.id);
    this.setState({ activeGameId: game.id });
  };

  findGame = gameId => {
    this.db.ref(`games/${gameId}`).once('value', snapshot => {
      const game = snapshot.val();
      if (game) this.setState({ game });
    });
  };

  startGame = () => {
    const { game } = this.state;
    this.db.ref(`games/${game.id}`).update({
      roundActive: true,
      guesses: null,
    });
  };

  endRound = () => {
    const { game } = this.state;
    const points = game.points || {};

    // Update player points
    Object.values(game.players).forEach(player => {
      const roundGuess = game.guesses[player.id];
      const currentPoints = points[player.id] || 0;
      const newPoint = roundGuess.isCorrect ? 1 : 0;
      points[player.id] = currentPoints + newPoint;
    });

    this.db.ref(`games/${game.id}`).update({
      points,
      guesses: null,
    });
  };

  // Add a new guess and later order guesses from first to last by timestamp
  onBuzzerPressed = () => {
    const { game, playerId } = this.state;
    this.db.ref(`games/${game.id}/guesses/${playerId}`).update({
      playerId,
      timestamp: Date.now(),
      pending: true,
    });
  };

  // Host marks guess either correct or incorrect
  markGuess = (playerId, isCorrect) => {
    const { game } = this.state;
    this.db.ref(`games/${game.id}/guesses/${playerId}`).update({
      pending: false,
      isCorrect,
    });
  };

  // Player accidentally pressed the buzzer
  dismissGuess = playerId => {
    const { game } = this.state;
    this.db.ref(`games/${game.id}/guesses/${playerId}`).remove();
  };

  render() {
    const {
      loading,
      activeGameId,
      game,
      isOwner,
      playerId,
      joinModalVisible,
    } = this.state;

    console.table(this.state);

    if (loading) {
      return (
        <Wrapper>
          <Content>How you doin?</Content>
        </Wrapper>
      );
    }

    if (!activeGameId) {
      return (
        <Wrapper>
          <Content>
            <LargeButton flat onClick={this.createGame}>
              Create game
            </LargeButton>
            <Gutter vertical />
            <LargeButton
              flat
              onClick={() => this.setState({ joinModalVisible: true })}
            >
              Join game
            </LargeButton>
          </Content>

          <JoinGame
            isVisible={joinModalVisible}
            hide={() => this.setState({ joinModalVisible: false })}
            gameFound={!!game}
            findGame={this.findGame}
            joinGame={this.joinGame}
          />
        </Wrapper>
      );
    }

    // Loading game data
    if (activeGameId && !game) {
      return (
        <Wrapper>
          <Content>Loading game data...</Content>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <Game
          game={game}
          mode={isOwner ? 'host' : 'player'}
          playerId={playerId}
          deleteGame={this.deleteGame}
          startGame={this.startGame}
          endGame={this.endGame}
          endRound={this.endRound}
          onBuzzerPressed={this.onBuzzerPressed}
          markGuess={this.markGuess}
          dismissGuess={this.dismissGuess}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  position: relative;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const LargeButton = styled(Button)`
  height: 60px;
  width: 100%;
`;

export default App;
