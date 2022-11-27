import React, { Component } from 'react'

import './search-form.css'

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
    }
    this.onSubmit = (e) => {
      if (e.code === 'Enter') {
        this.setState({
          label: '',
        })
      }
    }
  }

  render() {
    const { label } = this.state
    return (
      <input
        className="new-search"
        placeholder="Type to search..."
        onChange={this.onLabelChange}
        onKeyPress={this.onSubmit}
        value={label}
      />
    )
  }
}
export default SearchForm
