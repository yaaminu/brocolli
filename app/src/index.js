import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game'
import './index.css';

ReactDOM.hydrate(
  <Game />,
  document.getElementById('root')
);
