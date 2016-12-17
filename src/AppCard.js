import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 100,
  width: 200,
  margin: "0px 0px 0px 0px",
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const AppCard = (props) => <div>
  <Paper style={style} zDepth={1}>
    {props.children}
  </Paper>
</div>

export default AppCard;
