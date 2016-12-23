import React, {Component, PropTypes} from 'react'
import Card from './Card'

const styles = {
  height: 100,
  width: 200,
  textAlign: 'center',
  justifyContent: 'center',
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const CardDragPreview = (props) => <Card style={styles}>{props.children}</Card>

export default CardDragPreview;