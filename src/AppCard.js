import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 100,
  width: 200,
  margin: "0px 0px 0px 0px",
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

class AppCard extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: true,
      text: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({edit: false})
  }

  render() {
    const input = <form
      style={{
      width: "100%",
      height: "100%",
    }}
      onSubmit={e => this.handleSubmit(e)}>
      <input
        style={{
        width: "100%",
        height: "100%",
        borderStyle: 'none',
      }}
        type="text"
        onChange={e => this.setState({text: e.target.value})}/>
    </form>

    const rendered = this.state.edit
      ? input
      : this.state.text

    return <div>
      <Paper style={style} zDepth={1}>
        {rendered}
      </Paper>
    </div>
  }
}

export default AppCard;
