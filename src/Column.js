import React from 'react';
import AppCard from './AppCard'
import AppCardEdit from './AppCardEdit'
import FlatButton from 'material-ui/FlatButton'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Column extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const {cards} = this.state;
    const dragCard = cards[dragIndex];

    this.setState({
      cards: cards
        .splice(dragIndex, 1)
        .splice(hoverIndex, 0, dragCard)
    })
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
            .map((c, i) => <AppCard key={i} index={i} id={i} moveCard={this.moveCard}>{c}</AppCard>)}
        </div>
        <FlatButton
          style={{
          margin: '0 10 0 10',
          width: '100%',
          textAlign: 'left'
        }}
          onClick={e => this.setState({
          cards: [
            ...this.state.cards,
            'asdf'
          ]
        })}>Add new card</FlatButton>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Column)