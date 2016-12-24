import React from 'react';
import AppCard from './AppCard'
import AppCardEdit from './AppCardEdit'
import FlatButton from 'material-ui/FlatButton'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './CustomDragLayer'

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this
      .moveCard
      .bind(this)
    this.state = {
      cards: []
    }
  }

  moveCard(dragIndex, hoverIndex) {
    let {cards} = this.state;
    const dragCard = cards[dragIndex];

    cards.splice(dragIndex, 1)
    cards.splice(hoverIndex, 0, dragCard)
    console.log(cards.map(c => c.text))

    this.setState({cards: cards})
  }

  handleSubmit(e, id) {
    e.preventDefault()
    e.stopPropagation()
    let {cards} = this.state
    cards[id].edit = false
    this.setState({cards: cards})
  }

  handleChange(e, id) {
    e.preventDefault()
    e.stopPropagation()
    let {cards} = this.state
    cards[id].text = e.target.value
    this.setState({cards: cards})
  }

  render() {
    return (
      <div
        style={{
        backgroundColor: '#DDDDDD',
        padding: "20px 10px 0px 10px",
        margin: "0px 5px 0px 5px"
      }}>
        <h3 style={{textAlign: 'left'}}>{this.props.name}</h3>
        <div>{this
            .state
            .cards
            .map((c, i) => <AppCard
              columnId={this.props.id}
              edit={c.edit}
              text={c.text}
              key={i}
              index={i}
              id={i}
              moveCard={this.moveCard}
              handleSubmit={(e, id) => this.handleSubmit(e, id)}
              handleChange={(e, id) => this.handleChange(e, id)}/>)}
        </div>
        <FlatButton
          style={{
          margin: '0 10 0 10',
          width: '100%',
          textAlign: 'left'
        }}
          onClick={e => this.setState({
          cards: [
            ...this.state.cards, {
              edit: true,
              text: ""
            }
          ]
        })}>Add new card</FlatButton>
        <CustomDragLayer />
      </div>
    )
  }
}

export default Column