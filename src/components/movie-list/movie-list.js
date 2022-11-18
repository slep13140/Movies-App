import { Card, List } from 'antd'
import React from 'react'

import CardMovie from '../cards/cards'
import './movie-list.css'

function MovieList(props) {
  const { dataMovies } = props
  return (
    <List
      grid={{
        gutter: 3,
        column: 2,
      }}
      className="movie-list"
      pagination={{
        pageSize: 6,
      }}
      dataSource={dataMovies}
      renderItem={(item) => (
        <List.Item className="movie-list-item">
          <Card className="movie-list-card">
            <CardMovie
              title={item.title}
              releaseDate={item.release_date}
              overview={item.overview}
              vote={item.vote_average}
              poster={item.poster_path}
              key={item.id}
            />
          </Card>
        </List.Item>
      )}
    />
  )
}

export default MovieList
