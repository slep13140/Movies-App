import { Card, List } from 'antd'
import React from 'react'

import CardMovie from '../cards/cards'

import './movie-list.css'

function MovieList(props) {
  const { dataMovies, newPage } = props
  const { res, cur } = props

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
        current: cur,
        defaultCurrent: 1,
        total: res,
        pageSize: 20,
        onChange: (page) => {
          newPage(page)
        },
      }}
      dataSource={dataMovies}
      renderItem={(item) => (
        <List.Item>
          <Card className="card-container">
            <CardMovie
              title={item.title}
              releaseDate={item.release_date}
              overview={item.overview}
              vote={item.vote_average}
              poster={item.poster_path}
              key={item.id}
              voteAverage={item.vote_average}
            />
          </Card>
        </List.Item>
      )}
    />
  )
}

export default MovieList
