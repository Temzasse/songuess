import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Trash from 'react-icons/lib/io/ios-trash';

import Gutter from 'react-components-kit/dist/Gutter';
import Button from 'react-components-kit/dist/Button';
import Layout from 'react-components-kit/dist/Layout';

class Game extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['host', 'player']).isRequired,
    game: PropTypes.shape({
      id: PropTypes.number.isRequired,
      players: PropTypes.object,
      points: PropTypes.object,
    }).isRequired,
    deleteGame: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
  };

  renderPlayers = () => {
    const { game: { players } } = this.props;
    return (
      Object.values(players).map(player => (
        <Player key={player.id}>
          <PlayerColor color={player.color} />
          <Gutter />
          <PlayerName>
            {player.name}
          </PlayerName>
        </Player>
      ))
    );
  };

  render() {
    const { game, mode } = this.props;

    return (
      <Wrapper>
        <Header>
          <span>Game ID</span>
          <Gutter />
          <GameID>{game.id}</GameID>
          <Layout.Box flex={1} />
          <Trash size={32} color="#888" onClick={this.props.deleteGame} />
        </Header>

        <PlayerList>
          {game.players ? (
            this.renderPlayers()
          ) : (
            <NoPlayers>No players yet</NoPlayers>
          )}
        </PlayerList>

        {mode === 'host' && (
          <StartGameButton onClick={this.props.startGame}>
            Start game
          </StartGameButton>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
`;

const GameID = styled.span`
  padding: 4px 8px;
  font-size: 14;
  background-color: tomato;
  color: #fff;
  border-radius: 8px;
  letter-spacing: 2px;
`;

const NoPlayers = styled.div`
  padding: 16px;
`;

const PlayerList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

const Player = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const PlayerColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const PlayerName = styled.span`
  font-size: 18px;
`;

const StartGameButton = styled(Button)`
  height: 80px;
  width: 100%;
`;

export default Game;
