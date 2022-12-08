import React, { Component } from 'react'
import { debounce } from 'lodash'

import './SearchForm.css'

class SearchForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }
    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })

      this.searchResult(e.target.value)
    }
    this.searchResult = debounce((val) => {
      const { newSearch } = this.props
      newSearch(val)
    }, 800)
  }

  render() {
    const { label } = this.state
    return (
      <label htmlFor="newSearch" className="search-label">
        <input className="new-search" placeholder="Type to search..." onChange={this.onLabelChange} value={label} />
      </label>
    )
  }
}
export default SearchForm
