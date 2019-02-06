import React, {Component} from 'react'
import {
  DropTarget
} from 'react-dnd'

const Types = {
  ITEM: "cardButton"
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const cardTable = {
  drop(props, monitor) {
    if (!monitor.isOver()) {
      return
    }
    if (monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    props.handleSelectedCard(item.value)
  }
};

class CardTable extends Component {
  render() {
    const {connectDropTarget, isOver} = this.props
    const style = {
      backgroundColor: isOver ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.0)",
      display: "block",
      position: "relative",
      width: "100%",
      height: "89px",
      top: "-178px",
    }

    return connectDropTarget(
      <div style={style}>
      </div>,
    )
  }
}

export default DropTarget(Types.ITEM, cardTable, collect)(CardTable)
