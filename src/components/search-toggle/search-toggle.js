import React from 'react'
import { Tabs } from 'antd'

import SearchForm from '../search-form/search-form'
import MovieList from '../movie-list/movie-list'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'

import './search-toggle.css'

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
