import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin();

const ThemedApp = () =>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>

ReactDOM.render(
  <ThemedApp />,
  document.getElementById('root')
);
