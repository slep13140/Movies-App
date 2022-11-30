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
      searchResult: 'return',
      page: 1,
      totalResults: null,
      loading: true,
      error: false,
    }

    this.updateMovieList = this.updateMovieList.bind(this)
    this.updatePage = this.updatePage.bind(this)
  }

  componentDidMount() {
    const url1 = 'https://api.themoviedb.org/3/search/'
    const url2 = 'movie?api_key=26d8f194568f965201933df62099f0a0&language=en-US&page=1&include_adult=false&query='
    const { searchResult, page } = this.state
    MovieService(`${url1}${url2}${searchResult}&page=${page}`)
      .then((movie) => {
        this.setState({
          dataMovies: movie.results,
          totalResults: movie.total_results,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchResult: newResult, page: newPages } = this.state
    const { searchResult: oldResult, page: oldPages } = prevState

    if (newResult !== oldResult) {
      this.updateMovieList(newResult)
      this.updatePage(1)
    }
    if (newPages !== oldPages) {
      this.updatePage(newPages)
    }
  }

  updateMovieList(text) {
    if (!text) {
      return
    }

    this.setState({ searchResult: text, page: 1 })
    this.componentDidMount()
  }

  updatePage(num) {
    if (!num) {
      return
    }

    this.setState({ page: num })
    this.componentDidMount()
  }

  render() {
    const { dataMovies, loading } = this.state
    const { error, totalResults, page } = this.state
    const errorMessage = !loading && error ? <ErrorIndicator /> : null
    const spinner = loading && !error ? <Spinner /> : null
    const hasDate = !loading && !error

    const content = hasDate ? (
      <MovieList dataMovies={dataMovies} newPage={this.updatePage} res={totalResults} cur={page} />
    ) : null

    return (
      <div className="app-container">
        <Online>
          <SearchToggle />
          <SearchForm newSearch={this.updateMovieList} />
          {errorMessage}
          {spinner}
          {content}
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    )
  }
}
