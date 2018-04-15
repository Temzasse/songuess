import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gutter from 'react-components-kit/dist/Gutter';

const propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const Player = ({ name, color }) => (
  <Wrapper>
    <PlayerColor color={color} />
    <Gutter />
    <PlayerName>
      {name}
    </PlayerName>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const PlayerColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const PlayerName = styled.span`
  font-size: 18px;
`;

Player.propTypes = propTypes;

export default Player;
