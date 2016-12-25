import React from 'react';
import AppCard from './AppCard'
import AppCardEdit from './AppCardEdit'
import FlatButton from 'material-ui/FlatButton'
import {DragDropContext} from 'react-dnd'
import {DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './CustomDragLayer'

const cardTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor
      .getItem()
      .index;

    const dragColumn = monitor
      .getItem()
      .columnId

    if (props.cards.length !== 0) {
      return;
    }

    // empty so index 0 ? fix
    const hoverColumn = props.id
    const hoverIndex = 0;

    props.moveCard(dragIndex, hoverIndex, dragColumn, hoverColumn)

    // ?
    monitor
      .getItem()
      .index = hoverIndex;

  }
};

class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget, handleAddCard, moveCard, handleSubmit, handleChange} = this.props;

    return connectDropTarget(
      <div
        style={{
        backgroundColor: '#DDDDDD',
        padding: "20px 10px 0px 10px",
        margin: "0px 5px 0px 5px"
      }}>
        <h3 style={{
          textAlign: 'left'
        }}>{this.props.name}</h3>
        <div>{this
            .props
            .cards
            .map((c, i) => <AppCard
              columnId={this.props.id}
              edit={c.edit}
              text={c.text}
              key={i}
              index={i}
              id={i}
              moveCard={moveCard}
              handleSubmit={handleSubmit}
              handleChange={handleChange}/>)}
        </div>
        <FlatButton
          style={{
          margin: '0 10 0 10',
          width: '100%',
          textAlign: 'left'
        }}
          onClick={e => handleAddCard(e, this.props.id)}>Add new card</FlatButton>
        <CustomDragLayer/>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(Column)