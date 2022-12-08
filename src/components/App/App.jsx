import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieService from '../../services/movie-services'
import SearchToggle from '../SearchToggle/SearchToggle'
import { Provider } from '../MovieConetext/MovieConetext'

import 'antd/dist/antd.min.css'
import './App.css'

const ratedMovies = []
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      dataMovies: null,
      searchResult: '',
      page: 1,
      totalResults: null,
      loading: true,
      error: false,
      sessionId: null,
      allGen: null,
    }
    this.movieService = new MovieService()
    this.updateMovieList = this.updateMovieList.bind(this)
    this.updatePage = this.updatePage.bind(this)
    this.rateMovie = (id, value) => {
      this.setState(({ dataMovies }) => {
        const idx = dataMovies.findIndex((el) => el.id === id)
        const oldItem = dataMovies[idx]
        const newItem = {
          ...oldItem,
          voteRate: value,
        }
        const newRate = {
          ...newItem,
          moveId: newItem.id,
          moveRate: newItem.voteRate,
        }
        const newArr = [...dataMovies.slice(0, idx), newItem, ...dataMovies.slice(idx + 1)]
        ratedMovies.push(newRate)
        localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies))
        return {
          dataMovies: newArr,
        }
      })
      const { sessionId } = this.state
      this.movieService.onRateMovie(id, sessionId, value)
    }
  }

  componentDidMount() {
    const { searchResult, page } = this.state
    if (searchResult) {
      this.movieService
        .getSearchMovie(searchResult, page)
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
    } else {
      this.setState({
        dataMovies: [],
        totalResults: 0,
        loading: false,
      })
    }

    this.movieService.getGuestSession().then((key) => {
      this.setState({ sessionId: key.guest_session_id })
    })
    this.movieService.getAllGenres().then((genres) => {
      this.setState({ allGen: genres })
    })
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies))
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
    const rateMovie = JSON.parse(localStorage.getItem('ratedMovies'))
    this.movieService
      .getSearchMovie(text, 1)
      .then((movie) => {
        const newArray = movie.results.map((elem) => {
          const index = { ...elem }
          const user = rateMovie.find((item) => item.moveId === index.id)
          if (user) {
            index.voteRate = user.moveRate
          }
          return index
        })
        this.setState({
          dataMovies: newArray,
          searchResult: text,
          page: 1,
          totalResults: movie.total_results,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  updatePage(num) {
    if (!num) {
      return
    }
    const { searchResult } = this.state
    const rateMovie = JSON.parse(localStorage.getItem('ratedMovies'))
    this.movieService
      .getSearchMovie(searchResult, num)
      .then((movie) => {
        const newArray = movie.results.map((elem) => {
          const index = { ...elem }
          const user = rateMovie.find((item) => item.moveId === index.id)
          if (user) {
            index.voteRate = user.moveRate
          }
          return index
        })
        this.setState({
          dataMovies: newArray,
          page: num,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const { dataMovies, loading, guestMovies } = this.state
    const { error, totalResults, page } = this.state
    const { allGen } = this.state

    return (
      <div className="app-container">
        <Online>
          <Provider value={allGen}>
            <SearchToggle
              newSearch={this.updateMovieList}
              ratedMovies={this.ratedMovies}
              dataMovies={dataMovies}
              updatePage={this.updatePage}
              totalResults={totalResults}
              currentPage={page}
              rateMovie={this.rateMovie}
              loading={loading}
              error={error}
              guestMovies={guestMovies}
            />
          </Provider>
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    )
  }
}
