import React, {Component} from 'react'
import classNames from 'classNames'
import PropTypes from 'prop-types'
import {DropTarget} from 'react-dnd'

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  },
}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    droppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const {name, isOver, canDrop, connectDropTarget, droppedItem,} = this.props
    const isActive = isOver && canDrop

    const classes = classNames(
      'dustbin',
      {active: isActive,},
      {available: canDrop,}
    )
    return connectDropTarget(
      <div className={classes}>
        <p className="dustbin__name">{name}</p>
        <p className="dustbin__details">
          {!droppedItem &&
            <span className="drop">
              {isActive ? 'Release to drop' : ''}
            </span>}
          &nbsp;
          <If condition={droppedItem}>
            <span className="show__name">{droppedItem.name}</span>
            <span className="show__size">{droppedItem.size}</span>
          </If>
        </p>
      </div>
    )
  }
}
