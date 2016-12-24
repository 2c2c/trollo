import React from 'react';
import Column from './Column';
import AddColumn from './AddColumn'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class CardSpace extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: []
    }
  }
  addColumn(text) {
    this.setState({
      columns: [
        ...this.state.columns,
        text,
      ]
    })
  }
  render() {
    return <span style={{
      display: 'flex',
      alignItems: 'flex-start',
    }}>
      {this
        .state
        .columns
        .map((c,i) => <Column key={i} id={i} name={c}/>)}
      <AddColumn addColumn={this.addColumn.bind(this)}/>
    </span>
  }
}

export default DragDropContext(HTML5Backend)(CardSpace);
