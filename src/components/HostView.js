import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import CorrectIcon from 'react-icons/lib/io/ios-checkmark-outline';
import IncorrectIcon from 'react-icons/lib/io/ios-close-outline';
import DismissIcon from 'react-icons/lib/io/ios-circle-outline';
import Card from 'react-components-kit/dist/Card';
import Button from 'react-components-kit/dist/Button';
import Text from 'react-components-kit/dist/Text';
import Heading from 'react-components-kit/dist/Heading';
import Gutter from 'react-components-kit/dist/Gutter';

class HostView extends Component {
  static propTypes = {
    foo: PropTypes.object,
  };

  render() {
    const { game } = this.props;
    const guesses = game.guesses
      ? sortBy(Object.values(game.guesses), g => g.timestamp).filter(
          g => g.pending
        )
      : [];

    return (
      <Wrapper>
        <RoundNum>
          Round: {game.roundNum}
        </RoundNum>

        {guesses.length === 0 && <NoGuesses>No guesses</NoGuesses>}

        {guesses.slice(0, 1).map((guess, index) => (
          <GuessCard depth={1} key={guess.timestamp}>
            <GuessHeader>
              <GuessHeading h2>
                {game.players[guess.playerId].name}
              </GuessHeading>
            </GuessHeader>

            <GuessActions>
              <ActionButton
                flat
                outline
                onClick={() => this.props.dismissGuess(guess.playerId)}
              >
                <ActionText color="#222">DISMISS</ActionText>
                <DismissIcon size={32} color="#444" />
              </ActionButton>

              <ActionButton
                flat
                danger
                onClick={() => this.props.markGuess(guess.playerId, false)}
              >
                <ActionText color="#fff">INCORRECT</ActionText>
                <IncorrectIcon size={32} color="#fff" />
              </ActionButton>

              <ActionButton
                flat
                onClick={() => this.props.markGuess(guess.playerId, true)}
              >
                <ActionText color="#fff">CORRECT</ActionText>
                <CorrectIcon size={32} color="#fff" />
              </ActionButton>
            </GuessActions>
          </GuessCard>
        ))}

        <GameActions>
          <GameActionButton flat danger onClick={this.props.endGame}>
            End game
          </GameActionButton>

          <Gutter />

          <GameActionButton flat onClick={this.props.endRound}>
            Next round
          </GameActionButton>
        </GameActions>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const RoundNum = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
`;

const NoGuesses = styled(Text)`
  text-align: center;
`;

const GuessCard = styled(Card.Animated)`
  padding: 16px;
  border: 1px solid #f5f5f5;
`;

const GuessHeader = styled.div`
  padding: 8px;
  border-bottom: #eee;
`;

const GuessHeading = styled(Heading)`
  margin-top: 0px;
  margin-bottom: 8px;
`;

const GuessActions = styled.div`
  padding: 0px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled(Button)`
  flex-direction: column;
`;

const ActionText = styled(Text)`
  font-size: 8px;
  letter-spacing: 1.2px;
  margin-bottom: 4px;
`;

const GameActions = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 16px;
`;

const GameActionButton = styled(Button)`
  flex: 1;
`;

export default HostView;
