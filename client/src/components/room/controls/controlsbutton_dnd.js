import React, {Component} from 'react'
import {getEmptyImage} from "react-dnd-html5-backend";

import {
  DragSource,
} from 'react-dnd'

const Types = {
  ITEM: "cardButton"
}

const buttonSource = {
  beginDrag(props) {
    return {
      value: props.value
    };
  },
  endDrag(props, monitor, component) {
    console.log(monitor.didDrop())
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop(),
    connectDragPreview: connect.dragPreview(),
  }
}

class ButtonDnd extends Component {

  componentDidMount() {
    const {connectDragPreview} = this.props;
    connectDragPreview(getEmptyImage());
  }

  render() {
    const {connectDragSource, value, isDragging} = this.props;

    const style = {
      // display: display ? "initial" : "none",
      backgroundColor: isDragging ? "white" : "#3f51b5",
      border: isDragging ? "1px dashed black" : "none",
      height: "10vh",
      margin: "1px",
      boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
      flex: 1,
      padding: "6px 16px",
      fontSize: "0.875rem",
      minWidth: "64px",
      boxSizing: "border-box",
      transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      lineHeight: "1.75",
      fontWeight: "500",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      borderRadius: "4px",
      textTransform: "uppercase",
      color: "#fff",
      alignItems: "center",
      verticalAlign: "middle",
      justifyContent: "center",
      outline: "0"
    }

    return connectDragSource(
      <button
        style={style}>{isDragging ? "" : value}</button>
    );
  }
}

export default DragSource(Types.ITEM, buttonSource, collect)(ButtonDnd);
