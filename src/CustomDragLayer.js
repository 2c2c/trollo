import React, {Component, PropTypes} from 'react'
import ItemTypes from './ItemTypes'
import CardDragPreview from './CardDragPreview'
import ColumnDragPreview from './ColumnDragPreview'
import Column from './Column'
import {DragLayer} from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

function handleItemMovement(props) {
  const {initialOffset, currentOffset} = props;
  if (!initialOffset || !currentOffset) {
    return {display: 'none'}
  }

  let {x, y} = currentOffset

  const transform = `translate(${x}px, ${y}px)`

  return {transform: transform, WebkitTransform: transform}
}

class CustomDragLayer extends Component {
  renderItem(type, item) {
    switch (type) {
      case ItemTypes.CARD:
        return (
          <CardDragPreview>
            {item.text}
          </CardDragPreview>
        );
      // issues TODO
      case ItemTypes.COLUMN:
        return (<ColumnDragPreview {...item}/>);
      default:
        return null;
    }
  }

  render() {
    const {item, itemType, isDragging} = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={handleItemMovement(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer)