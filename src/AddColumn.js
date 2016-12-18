import React from 'react';
import FlatButton from 'material-ui/FlatButton'

class AddColumn extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      text: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .addColumn(this.state.text);
    this.setState({edit: false, text: '',})
  }

  render() {
    const input = <form onSubmit={e => this.handleSubmit(e)}>
      <input
        style={{
        width: "100%",
        height: "100%",
        borderStyle: 'none',
      }}
        onChange={e => this.setState({text: e.target.value})}/>
    </form>

    const add_column = <FlatButton onClick={e => this.setState({edit: true})}>Add column</FlatButton>

    let rendered = this.state.edit
      ? input
      : add_column
    return <div>
      {rendered}
    </div>
  }
}

AddColumn.defaultProps = {
  columns: []
}

export default AddColumn;
