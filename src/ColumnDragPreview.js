import React, {Component, PropTypes} from 'react'
import Column from './Column'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const ColumnDragPreview = (props) => <Column {...props} />

export default ColumnDragPreview;