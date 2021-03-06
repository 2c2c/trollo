import React from 'react';
import AppCard from './AppCard'
import AppCardEdit from './AppCardEdit'
import FlatButton from 'material-ui/FlatButton'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './CustomDragLayer'
import {findDOMNode} from 'react-dom'
import {getEmptyImage} from 'react-dnd-html5-backend'

const columnSource = {
  beginDrag(props) {
    return {...props};
  }
};

const cardTarget = {
  drop(props, monitor, component) {

    if (monitor.getItemType() === 'card') {
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
    if (monitor.getItemType() === 'column') {
      const dragIndex = monitor
        .getItem()
        .id;

      const hoverIndex = props.id

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientX = clientOffset.x - hoverBoundingRect.right

      props.moveColumn(dragIndex, hoverIndex)

      monitor
        .getItem()
        .id = hoverIndex;
    }
  }
};

class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this
      .props
      .connectDragPreview(getEmptyImage(), {captureDraggingState: true})
  }

  render() {
    const {
      type,
      isDragging,
      isOver,
      canDrop,
      connectDragSource,
      connectDropTarget,
      handleAddCard,
      moveCard,
      handleSubmit,
      handleChange
    } = this.props;

    let opacity = 1;
      if (isOver && canDrop && type === 'column') {
        opacity = .2
      }


    return connectDragSource(connectDropTarget(

      <div
        style={{
        minWidth: 200,
        backgroundColor: '#DDDDDD',
        padding: "20px 10px 0px 10px",
        margin: "0px 5px 0px 5px",
        opacity
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
    ))
  }
}

export default DropTarget([
  ItemTypes.CARD, ItemTypes.COLUMN
], cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  type: monitor.getItemType()
}))(DragSource(ItemTypes.COLUMN, columnSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(Column))
