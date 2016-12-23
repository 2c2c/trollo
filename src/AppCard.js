import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import {findDOMNode} from 'react-dom'

const style = {
  height: 100,
  width: 200,
  margin: "0px 0px 0px 0px",
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
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      edit: true,
      text: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({edit: false})
  }

  render() {
    const {isDragging, connectDragSource, connectDropTarget} = this.props;
    const input = <form
      style={{
      width: "100%",
      height: "100%"
    }}
      onSubmit={e => this.handleSubmit(e)}>
      <input
        style={{
        width: "100%",
        height: "100%",
        borderStyle: 'none'
      }}
        onChange={e => this.setState({text: e.target.value})}/>
    </form>

    const rendered = this.state.edit
      ? input
      : this.state.text

    return connectDragSource(connectDropTarget(
      <div>
        <Paper onClick={e => this.setState({edit: true})} style={style} zDepth={1}>
          {rendered}
        </Paper>
      </div>
    ));
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(AppCard))
