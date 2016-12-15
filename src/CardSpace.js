import React from 'react';
import Column from './Column';

const CardSpace = (props) =>
<div>
  {props.columns.map(c => <Column>c</Column>)}
</div>

export default CardSpace;
