import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import {findDOMNode} from 'react-dom'
import Card from './Card'
import {getEmptyImage} from 'react-dnd-html5-backend'

const style = {
  height: 100,
  width: 200,
  margin: "0px 0px 10px 0px",
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  cursor: 'pointer'
};

const cardSource = {
  beginDrag(props) {
    return {id: props.id, index: props.index, text: props.text, columnId: props.columnId};
  }
};

const cardTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor
      .getItem()
      .index;

    const dragColumn = monitor
      .getItem()
      .columnId

    const hoverIndex = props.index;
    const hoverColumn = props.columnId;

    //dont replace with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    //get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // mouse position
    const clientOffset = monitor.getClientOffset();

    // get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50% When dragging
    // upwards, only move when the cursor is above 50% Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveCard(dragIndex, hoverIndex, dragColumn, hoverColumn)

    // ?
    monitor
      .getItem()
      .index = hoverIndex;

  }
}

class AppCard extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

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
      columnId,
      id,
      handleSubmit,
      handleChange,
      isDragging,
      connectDragSource,
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;
    const input = <form
      style={{
      width: "100%",
      height: "100%"
    }}
      onSubmit={e => handleSubmit(e, id, columnId)}>
      <input
        style={{
        width: "100%",
        height: "100%",
        borderStyle: 'none'
      }}
        onChange={e => handleChange(e, id, columnId)}/>
    </form>

    const rendered = this.props.edit
      ? input
      : this.props.text

    return connectDragSource(connectDropTarget(isOver && canDrop
      ? <div><Card
          style={{
          ...style,
          backgroundColor: '#C2C6C9'
        }}/>
        </div>
      : <div>
        <Card style={style}>{rendered}</Card>
      </div>));
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(AppCard))
