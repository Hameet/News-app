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

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key={item.objectID}>

            <span>
              <a href={item.url}>{item.title}</a>
            </span>

            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
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
