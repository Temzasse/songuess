import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Gutter from 'react-components-kit/dist/Gutter';
import Button from 'react-components-kit/dist/Button';
import Modal from 'react-components-kit/dist/Modal';
import Heading from 'react-components-kit/dist/Heading';
import TextField from 'react-components-kit/dist/TextField';

class JoinModal extends Component {
  static propTypes = {
    joinGame: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };

  state = {
    name: '',
    gameId: '',
  };

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleGameIdChange = ({ target }) => {
    const gameId = target.value;
    this.setState({ gameId });
  };

  findGame = () => {
    const { gameId } = this.state;
    this.props.findGame(gameId);
  };

  joinGame = () => {
    this.props.hide();
    this.props.joinGame(this.state.name);
  };

  render() {
    const { name, gameId } = this.state;
    const { isVisible, gameFound } = this.props;

    return (
      <Modal
        visible={isVisible}
        hide={this.props.hide}
        backdropBg="rgba(0, 0, 255, 0.5)"
      >
        {!gameFound ? (
          <Modal.Body>
            <Heading h2>Enter game ID</Heading>
            <Gutter vertical />
            <TextField
              name="game"
              label="Game ID"
              onChange={this.handleGameIdChange}
              value={gameId}
            />
            <Modal.Footer>
              <Button flat onClick={this.findGame}>
                Join game
              </Button>
            </Modal.Footer>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Heading h2>What's your name?</Heading>
            <Gutter vertical />
            <TextField
              name="player"
              label="Player name"
              onChange={this.handleNameChange}
              value={name}
            />
            <Modal.Footer>
              <Button flat onClick={this.joinGame}>
                Let's go!
              </Button>
            </Modal.Footer>
          </Modal.Body>
        )}
      </Modal>
    );
  }
}

export default JoinModal;
