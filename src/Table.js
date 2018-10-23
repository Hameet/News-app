import React, { Component } from 'react'

function isSearched (searchTerm) {
  return function (item) {
    return item.author.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

const Button = ({ onClick, className = '', children }) => {
  return (
    <button onClick={onClick} className={className} type='button'>
      {children}
    </button>
  )
}

const largeColumn = {
  width: '40%'
}
const midColumn = {
  width: '30%'
}
const smallColumn = {
  width: '10%'
}

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className='table'>
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key={item.objectID} className='table-row'>
            <span style={largeColumn}>
              <h2><a href={item.url}>{item.title}</a></h2>
            </span>
            <span style={midColumn}>
              <h2>{item.author}</h2>
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
