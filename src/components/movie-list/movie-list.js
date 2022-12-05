import React from 'react'
import { Card, List } from 'antd'

import Cards from '../cards/cards'

import './movie-list.css'

function MovieList(props) {
  const { dataMovies, updatePage } = props
  const { totalResults, currentPage, rateMovie } = props

  return (
    <List
      className="movie-list"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      pagination={{
        current: currentPage,
        defaultCurrent: 1,
        total: totalResults,
        pageSize: 20,
        onChange: (page) => {
          updatePage(page)
        },
      }}
      dataSource={dataMovies}
      renderItem={(item) => {
        let colorRate = 'lowRate'
        if (item.vote_average > 3 && item.vote_average <= 5) {
          colorRate = 'smallRate'
        } else if (item.vote_average > 5 && item.vote_average <= 7) {
          colorRate = 'middleRate'
        } else if (item.vote_average > 7) {
          colorRate = 'hightRate'
        }
        return (
          <List.Item>
            <Card className={colorRate}>
              <Cards
                title={item.title}
                releaseDate={item.release_date}
                genId={item.genre_ids}
                overview={item.overview}
                vote={item.voteRate}
                poster={item.poster_path}
                key={item.id}
                movieID={item.id}
                voteAverage={item.vote_average}
                rateMovie={rateMovie}
              />
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default MovieList
