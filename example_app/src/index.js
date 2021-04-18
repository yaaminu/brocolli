import React from 'react';
import ReactDOM from 'react-dom';
import App from './sample_app'
import './index.css';
import {initialize, main_props} from './brocolli'

initialize()

ReactDOM.hydrate(
   React.createElement(App, main_props()),
   document.getElementById('root')
);
