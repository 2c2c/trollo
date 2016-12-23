import React, {Component} from 'react';
import logo from './logo.svg';
import AppHeader from './AppHeader'
import './App.css';
import AppCard from './AppCard'
import CardSpace from './CardSpace'
import AppCardEdit from './AppCardEdit'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <CardSpace/>
      </div>
    );
  }
}

export default App;
