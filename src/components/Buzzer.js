import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Howl } from 'howler';

class Buzzer extends Component {
  static propTypes = {
    onBuzz: PropTypes.func.isRequired,
    sound: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.sound = new Howl({ src: [props.sound] });
    this.sound.on('end', this.handleSoundEnd);
    this.state = {
      isPlayingSound: false,
    };
  }

  handleSoundEnd = () => {
    this.setState({ isPlayingSound: false });
  }

  buzz = () => {
    const { isPlayingSound } = this.state;
    if (this.sound && !isPlayingSound) {
      this.setState({ isPlayingSound: true });
      this.sound.play();
      this.props.onBuzz();
    }
  };

  render() {
    return (
      <Wrapper>
        <BuzzerButton onClick={this.buzz} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ff7f7f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuzzerButton = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 50%;
  background-color: #bc1a1a;
  position: relative;

  &:after {
    content: 'Buzz';
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: -6px;
    left: 0;
    height: 300px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.4s ease;
    background-color: #ff3535;
  }

  &:active {
    &:after {
      background-color: #bc1a1a;
    }
  }
`;

export default Buzzer;
