import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game'
import './index.css';
import {restore_component_states} from './brocolli'


restore_component_states()
ReactDOM.hydrate(
  <Game />,
  document.getElementById('root')
);
