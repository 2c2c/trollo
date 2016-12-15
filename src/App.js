import React, { Component } from 'react';
import logo from './logo.svg';
import AppHeader from './AppHeader'
import './App.css';
import AppCard from './AppCard'
import CardSpace from './CardSpace'

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppHeader />
      <AppCard text="hi" />
      <AppCard text="hi" />
      <AppCard text="hi" />
      <CardSpace columns={['a']}/>
      </div>
    );
  }
}

export default App;
