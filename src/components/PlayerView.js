import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sample from 'lodash.sample';
import Buzzer from './Buzzer';

class PlayerView extends Component {
  static propTypes = {
    onBuzzerPressed: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sound: this.getRandomSound(),
    };
  }

  getRandomSound = () => {
    const sounds = [
      'church',
      'cubes',
      'dog',
      'fart',
      'goat',
      'gong',
      'hyena',
      'ring',
      'toilet',
      'train',
    ];

    return `assets/audio/${sample(sounds)}.mp3`;
  };

  render() {
    const { sound } = this.state;
    const { game, playerId } = this.props;
    const buzzerPressed = game.guesses && game.guesses[playerId];
    const player = game.players[playerId];

    // Waiting for host to mark aswer
    if (buzzerPressed && game.guesses[playerId].pending) {
      return (
        <Centered color={player.color}>
          <TextWrapper>What's the song?</TextWrapper>
        </Centered>
      );
    }

    // Answer was correct
    if (buzzerPressed && game.guesses[playerId].isCorrect) {
      return (
        <Centered color={player.color}>
          <TextWrapper>
            Correct!{' '}
            <span role="img" aria-label="tada">
              🎉
            </span>
          </TextWrapper>
        </Centered>
      );
    }

    // Answer was incorrect
    if (buzzerPressed && !game.guesses[playerId].isCorrect) {
      return (
        <Centered color={player.color}>
          <TextWrapper>
            Incorrect{' '}
            <span role="img" aria-label="evil">
              😈
            </span>
          </TextWrapper>
        </Centered>
      );
    }

    return (
      <Wrapper>
        <Buzzer sound={sound} onBuzz={this.props.onBuzzerPressed} />
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

const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
`;

const TextWrapper = styled.span`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
`;

export default PlayerView;
