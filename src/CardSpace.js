import React from 'react';
import Column from './Column';
import View from 'react-flexbox';

const CardSpace = (props) => <span style={{
  display: 'flex',
  alignItems: 'flex-start',
}}>
  {props
    .columns
    .map(c => <Column name={c.name} cards={c.cards}/>)}
</span>

export default CardSpace;
