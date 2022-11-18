import React, { Component } from 'react'

import MovieService from '../../services/movie-services'
import MovieList from '../movie-list/movie-list'

import 'antd/dist/antd.min.css'
import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      dataMovies: null,
    }
    this.updateMovie()
  }

  updateMovie() {
    const moveSearch = 'return' // 529485 157336
    const url1 = 'https://api.themoviedb.org/3/search/'
    const url2 = 'movie?api_key=26d8f194568f965201933df62099f0a0&language=en-US&page=1&include_adult=false&query='

    MovieService(`${url1}${url2}${moveSearch}`).then((movie) => {
      this.setState({
        dataMovies: movie.results,
      })
    })
  }

  render() {
    const { dataMovies } = this.state
    if (dataMovies) {
      return (
        <div>
          <MovieList dataMovies={dataMovies} />
        </div>
      )
    }
    return null
  }
}
