import React, {Component} from 'react';
import logo from './logo.svg';
import AppHeader from './AppHeader'
import './App.css';
import AppCard from './AppCard'
import CardSpace from './CardSpace'
import AppCardEdit from './AppCardEdit'
let columns = [
  {
    name: 'column1',
    cards: ['helo', 'how are u doing',]
  }, {
    name: 'column2',
    cards: ['asdf', 'jlk;',]
  }, {
    name: 'column3',
    cards: ['fuk', 'jlk;',]
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <CardSpace columns={columns}/>
        <AppCardEdit />
      </div>
    );
  }
}

export default App;
