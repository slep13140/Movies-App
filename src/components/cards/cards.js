import React from 'react'
import { Card, Rate } from 'antd'
import { format } from 'date-fns'

import Tags from '../tags/tags'
import Overview from '../overview/overview'

import './cards.css'

const { Meta } = Card
function CardMovie(props) {
  const imgBase = 'https://image.tmdb.org/t/p/original'
  const {
    title,
    releaseDate,
    genres = [
      { name: 'Action', id: 1 },
      { name: 'Drama', id: 2 },
    ],
    overview,
    vote,
    poster,
    voteAverage,
  } = props
  let countRow = 0
  if (genres) {
    let lengthGenres = 0
    genres.forEach((i) => {
      lengthGenres += i.name.length
      if (lengthGenres >= 25) {
        countRow += 1
        lengthGenres = i.name.length
      }
    })
  }

  if (title && title.length > 20) {
    const word = title.split(' ')
    let langTitle = 0
    word.forEach((i) => {
      langTitle += i.length
      if (langTitle >= 20) {
        countRow += 1
        langTitle = i.length
      }
    })
  }

  const release = releaseDate ? format(new Date(releaseDate), 'PP') : null

  return (
    <div className="card-movie">
      <img alt="example" src={`${imgBase}${poster}`} />
      <Card className="cards-meta">
        <img alt="example" src={`${imgBase}${poster}`} />
        <div className="card-title">
          <Meta title={title} description={voteAverage} />
          <span className="createDate">{release}</span>
          <Tags genresData={genres} />
        </div>
        <Overview countRow={countRow} overview={overview} />
        <Rate count="10" allowHalf disabled value={vote} />
      </Card>
    </div>
  )
}

export default CardMovie
