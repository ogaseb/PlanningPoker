import React from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'

function collect (monitor) {
  let item = monitor.getItem()
  return {
    value: item && item.value,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function getItemStyles (currentOffset) {
  if (!currentOffset) {
    return {
      display: 'block'
    }
  }
  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  let x = currentOffset.x
  let y = currentOffset.y
  let transform = `translate(${x}px, ${y}px)`

  return {
    transform: transform,
    WebkitTransform: transform
  }
}

function ItemPreview ({ value, isDragging, currentOffset }) {
  if (!isDragging) {
    return null
  }
  const style = {
    height: '10vh',
    lineHeight: '69px',
    width: '64px',
    margin: '1px',
    textAlign: 'center',
    backgroundColor: '#3f51b5',
    boxShadow:
      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: '500',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    borderRadius: '4px',
    textTransform: 'uppercase',
    color: '#fff',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    outline: '0'
  }

  return (
    <div style={layerStyles}>
      <div style={{ ...style, ...getItemStyles(currentOffset) }}>{value}</div>
    </div>
  )
}

export default DragLayer(collect)(ItemPreview)
