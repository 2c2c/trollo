import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import {findDOMNode} from 'react-dom'

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
    return {id: props.id, index: props.index};
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor
      .getItem()
      .index;
    const hoverIndex = props.index;

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

    props.moveCard(dragIndex, hoverIndex)

    monitor
      .getItem()
      .index = hoverIndex;

  }
}

class AppCard extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
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
      onSubmit={e => handleSubmit(e, id)}>
      <input
        style={{
        width: "100%",
        height: "100%",
        borderStyle: 'none'
      }}
        onChange={e => handleChange(e, id)}/>
    </form>

    const rendered = this.props.edit
      ? input
      : this.props.text

    const render_nodrag = <div>
      <Paper style={style} zDepth={1}>
        {rendered}
      </Paper>
    </div>

    const render_dragover =
      <div>
        <Paper style={{...style, backgroundColor: '#C2C6C9'}} zDepth={1}>
        </Paper>
      </div>

    return connectDragSource(connectDropTarget(
      isOver && canDrop ? render_dragover : render_nodrag
    ));
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(AppCard))
