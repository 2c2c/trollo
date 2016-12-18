import React from 'react';
import Column from './Column';
import AddColumn from './AddColumn'

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
        .map(c => <Column name={c}/>)}
      <AddColumn addColumn={this.addColumn.bind(this)}/>
    </span>
  }
}

export default CardSpace;
