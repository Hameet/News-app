import React, { Component } from 'react'
import './App.css'

import Search from './Search'
import Table from './Table'
import Button from './Button'

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  fetchSearchTopStories (searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  setSearchTopStories (result) {
    this.setState({ result })
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
  }

  onDismiss (id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    this.setState({ ...this.state.result, hits: updatedHits })
  }

  onSearchChange (event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit (event) {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  render () {
    const { searchTerm, result } = this.state
    const page = (result && result.page) || 0
    console.log(this.state)
    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div className='interactions'>
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    )
  }
}

export default App
