import React from 'react'
import { Tabs } from 'antd'
import PropTypes from 'prop-types'

import SearchForm from '../SearchForm/SearchForm'
import MovieList from '../MovieList/MovieList'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import './SearchToggle.css'

function SearchToggle(props) {
  const { newSearch, ratedMovies, dataMovies } = props
  const { updatePage, totalResults, currentPage } = props
  const { rateMovie, loading, error } = props

  let guestMovies = []
  let rateTotalResults
  if (dataMovies) {
    guestMovies = JSON.parse(localStorage.getItem('ratedMovies'))
    rateTotalResults = guestMovies.length
  }

  const errorMessage = !loading && error ? <ErrorIndicator /> : null
  const spinner = loading && !error ? <Spinner /> : null
  const hasDate = !loading && !error
  const content = hasDate ? (
    <MovieList
      dataMovies={dataMovies}
      updatePage={updatePage}
      totalResults={totalResults}
      currentPage={currentPage}
      rateMovie={rateMovie}
    />
  ) : null
  const items = [
    {
      label: 'Search',
      key: 'item-1',
      children: (
        <div className="containerSearch">
          <SearchForm newSearch={newSearch} />
          {errorMessage}
          {spinner}
          {content}
        </div>
      ),
    },
    {
      label: 'Rated',
      key: 'item-2',
      children: (
        <div className="containerRated">
          {errorMessage}
          {spinner}
          <MovieList
            dataMovies={guestMovies}
            updatePage={updatePage}
            totalResults={rateTotalResults}
            currentPage={currentPage}
          />
        </div>
      ),
    },
  ]
  return <Tabs className="search-toggle" items={items} onChange={ratedMovies} />
}
export default SearchToggle

SearchToggle.propTypes = {
  newSearch: PropTypes.func.isRequired,
  dataMovies: PropTypes.arrayOf(PropTypes.shape),
  updatePage: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  rateMovie: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}

SearchToggle.defaultProps = {
  totalResults: 0,
  dataMovies: [],
}
