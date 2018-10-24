import React, { Component } from 'react'

import Button from '../Button/Button'

const largeColumn = {
  width: '50%'
}
const midColumn = {
  width: '20%'
}
const smallColumn = {
  width: '10%'
}

const Table = ({ list, onDismiss }) => {
  return (
    <div className='table'>
      {list.map(item => {
        return (
          <div key={item.objectID} className='table-row'>
            <span style={largeColumn}>
              <h3><a href={item.url}>{item.title}</a></h3>
            </span>
            <span style={midColumn}>
              <h3>{item.author}</h3>
            </span>
            <span style={smallColumn}>
              {item.num_comments}
            </span>
            <span style={smallColumn}>
              {item.points}
            </span>
            <span style={smallColumn}>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>
        )
      })}
    </div>
  )
}
export default Table
