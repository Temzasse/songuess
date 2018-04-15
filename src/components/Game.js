import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import HostView from './HostView';
import PlayerView from './PlayerView';
import Lobby from './Lobby';
import Leaderboard from './Leaderboard';

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      id: PropTypes.number.isRequired,
      players: PropTypes.object,
      points: PropTypes.object,
      roundActive: PropTypes.bool,
    }).isRequired,
  };

  render() {
    const { game, mode } = this.props;

    if (!game.roundActive) {
      return <Lobby {...this.props} />
    }

    if (game.gameOver) {
      return <Leaderboard {...this.props} />
    }

    if (mode === 'host') {
      return (
        <HostView {...this.props} />
      );
    }

    return (
      <PlayerView {...this.props} />
    );
  }
}

export default Game;
