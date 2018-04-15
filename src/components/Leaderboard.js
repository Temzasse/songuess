import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import orderBy from 'lodash.orderby';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';
import Gutter from 'react-components-kit/dist/Gutter';
import Layout from 'react-components-kit/dist/Layout';
import Button from 'react-components-kit/dist/Button';

class Leaderboard extends Component {
  static propTypes = {
    game: PropTypes.shape({
      points: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const { game, mode } = this.props;
    const points = orderBy(
      Object.entries(game.points),
      ([_, points]) => points,
      ['desc']
    );

    return (
      <Wrapper>
        <PointsHeading h2>Points:</PointsHeading>

        <LeaderboardItems>
          {points.map(([playerId, points], index) => (
            <LeaderboardItem key={playerId}>
              <Order color={game.players[playerId].color}>{index + 1}</Order>
              <Gutter />
              <Text>{game.players[playerId].name}</Text>
              <Layout.Box flex={1} />
              <Text size="18px" bold>
                {points}
              </Text>
            </LeaderboardItem>
          ))}
        </LeaderboardItems>

        {mode === 'host' && (
          <Actions>
            <Button flat onClick={this.props.deleteGame}>
              Done
            </Button>
          </Actions>
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

const PointsHeading = styled(Heading)`
  margin-top: 8px;
  padding: 0px 16px;
`;

const LeaderboardItems = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 16px 70px 16px;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  margin-bottom: 16px;
`;

const Order = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
`;

const Actions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default Leaderboard;
