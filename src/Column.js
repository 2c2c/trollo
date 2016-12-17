import React from 'react';
import AppCard from './AppCard'
import View from 'react-flexbox'

const Column = (props) => <div>
  <h1>{props.name}</h1>{props
    .cards
    .map(c => <AppCard>{c}</AppCard>)}</div>

export default Column;
