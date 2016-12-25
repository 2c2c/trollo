import React, {Component, PropTypes} from 'react'
import Column from './Column'
import Card from './Card'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const cardstyle = {
  height: 100,
  width: 200,
  margin: "0px 0px 10px 0px",
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  cursor: 'pointer'
};

const ColumnDragPreview = (props) => <div
  style={{
  backgroundColor: '#DDDDDD',
  padding: "20px 10px 0px 10px",
  margin: "0px 5px 0px 5px",
  ...styles
}}>
  <h3 style={{
    textAlign: 'left'
  }}>{props.name}</h3>
  {props
    .cards
    .map((c,i) => <Card key={i} style={cardstyle}>{c.text}</Card>)}
  <FlatButton
    style={{
    margin: '0 10 0 10',
    width: '100%',
    textAlign: 'left'
  }}>Add new card</FlatButton>
</div>

export default ColumnDragPreview;