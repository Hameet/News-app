import React, { Component } from 'react'
import './App.css'

import Search from './Search'
import Table from './Table'
import Button from './Button'

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '100'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      results: null,
      serachKey: '',
      searchTerm: DEFAULT_QUERY
    }
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  needsToSearchTopStories (searchTerm) {
    return !this.state.results[searchTerm]
  }

  fetchSearchTopStories (searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  // This method concatenates the old and new list of hits from the local state and new result object
  setSearchTopStories (result) {
    const { hits, page } = result
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits]

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  onDismiss (id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  onSearchChange (event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit (event) {
    const { searchTerm } = this.state
    this.setState({ serachKey: searchTerm })
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault()
  }

  render () {
    const { searchTerm, results, searchKey } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || [
    ]
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
        {results && <Table list={list} onDismiss={this.onDismiss} />}
        <div className='interactions'>
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    )
  }
}

export default App
