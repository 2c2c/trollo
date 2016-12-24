import React from 'react';
import Column from './Column';
import AddColumn from './AddColumn'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class CardSpace extends React.Component {
  constructor() {
    super();
    this.moveCard = this
      .moveCard
      .bind(this)
    this.state = {
      columns: []
    }
  }
  addColumn(text) {
    this.setState({
      columns: [
        ...this.state.columns, {
          text,
          cards: []
        }
      ]
    })
  }

  handleAddCard(e, columnId) {
    let new_state = this.state.columns
    let cards = new_state[columnId].cards
    cards = [
      ...cards, {
        edit: true,
        text: ''
      }
    ]

    new_state[columnId].cards = cards
    this.setState({columns: new_state})
  }

  moveCard(dragIndex, hoverIndex, dragColumn, hoverColumn) {
    // if in same column
    let {columns} = this.state;
    const dragCard = columns[dragColumn].cards[dragIndex];

    columns[dragColumn].cards.splice(dragIndex, 1)
    columns[hoverColumn].cards.splice(hoverIndex, 0, dragCard)

    this.setState({columns: columns})

    // different access different columns cards
  }

  handleSubmit(e, cardId, colId) {
    e.preventDefault()
    e.stopPropagation()
    let {columns} = this.state
    columns[colId].cards[cardId].edit = false;
    this.setState({columns: columns})
  }

  handleChange(e, cardId, colId) {
    e.preventDefault()
    e.stopPropagation()
    let {columns} = this.state
    columns[colId].cards[cardId].text = e.target.value
    this.setState({columns: columns})
  }

  render() {
    return <span style={{
      display: 'flex',
      alignItems: 'flex-start'
    }}>
      {this
        .state
        .columns
        .map((c, i) => <Column
          key={i}
          id={i}
          name={c.text}
          cards={c.cards}
          handleAddCard={(e, cid) => this.handleAddCard(e, cid)}
          moveCard={this.moveCard}
          handleSubmit={(e, cardId, colId) => this.handleSubmit(e, cardId, colId)}
          handleChange={(e, cardId, colId) => this.handleChange(e, cardId, colId)}/>)}
      <AddColumn addColumn={this
        .addColumn
        .bind(this)}/>
    </span>
  }
}

export default DragDropContext(HTML5Backend)(CardSpace);
