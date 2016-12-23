import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper'

const Card = (props) => <div>
  <Paper style={props.style} zDepth={1}>
    {props.children}
  </Paper>
</div>

export default Card