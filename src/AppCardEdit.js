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

const AppCardEdit = (props) => <div>
  <Paper style={style} zDepth={1}>
    <input
      style={{
      width: "100%",
      height: "100%",
      borderStyle: 'none',
    }}
      type="text"/>
  </Paper>
</div>

export default AppCardEdit;
