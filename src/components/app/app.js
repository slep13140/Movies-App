import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieService from '../../services/movie-services'
import MovieList from '../movie-list/movie-list'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'
import SearchForm from '../search-form/search-form'
import SearchToggle from '../search-toggle/search-toggle'

import 'antd/dist/antd.min.css'
import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      dataMovies: null,
      loading: true,
      error: false,
    }
    this.updateMovie()
  }

  updateMovie() {
    const moveSearch = 'return' // 529485 157336
    const url1 = 'https://api.themoviedb.org/3/search/'
    const url2 = 'movie?api_key=26d8f194568f965201933df62099f0a0&language=en-US&page=1&include_adult=false&query='

    MovieService(`${url1}${url2}${moveSearch}`)
      .then((movie) => {
        this.setState({
          dataMovies: movie.results,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const { dataMovies, loading, error } = this.state
    const errorMessage = loading && error ? <ErrorIndicator /> : null
    const spinner = loading && !error ? <Spinner /> : null

    const content = !loading && !error ? <MovieList dataMovies={dataMovies} /> : null

    return (
      <div className="app-container">
        <Online>
          <SearchToggle />
          <SearchForm />
          {errorMessage}
          {spinner}
          {content}
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    )
  }
}
