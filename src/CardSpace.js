import React from 'react';
import Column from './Column';
import View from 'react-flexbox';

const CardSpace = (props) => <span style={{display: 'flex'}}>
  {props
    .columns
    .map(c => <Column name={c.name} cards={c.cards}></Column>)}
</span>

export default CardSpace;
