import React from 'react';
import AppCard from './AppCard'
import FlatButton from 'material-ui/FlatButton'

export default class Column extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }
  render() {
    return (
      <div
        style={{
        backgroundColor: '#DDDDDD',
        padding: "20px 10px 0px 10px",
        margin: "0px 5px 0px 5px"
      }}>
        <h3>{this.props.name}</h3>
        <div>{this
            .state
            .cards
            .map(c => <AppCard>{c}</AppCard>)}</div>
        <FlatButton
          style={{
          margin: '0 10 0 10',
          width: '100%',
          textAlign: 'left'
        }}
          onClick={e => this.setState({
          cards: [
            ...this.state.cards,
            'asdf',
          ]
        })}>Add new card</FlatButton>
      </div>
    )
  }
}
