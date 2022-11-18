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

  if (title && title.length > 25) {
    const word = title.split(' ')
    let langTitle = 0
    word.forEach((i) => {
      langTitle += i.length
      if (langTitle >= 25) {
        countRow += 1
        langTitle = i.length
      }
    })
  }
  return (
    <div>
      <Card hoverable className="cardsMovie" cover={<img alt="example" src={`${imgBase}${poster}`} />}>
        <Meta title={title} />
        <span className="createDate">{format(new Date(releaseDate), 'PP')}</span>

        <Tags genresData={genres} />
        <Overview countRow={countRow} overview={overview} />
        <Rate count="10" allowHalf disabled value={vote} />
      </Card>
    </div>
  )
}

export default CardMovie
