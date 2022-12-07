import React from 'react'
import { Card, Rate } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import Tags from '../tags/tags'
import Overview from '../overview/overview'
import { Consumer } from '../movie-conetext/movie-conetext'

import './cards.css'

const { Meta } = Card
function Cards(props) {
  const imgBase = 'https://image.tmdb.org/t/p/original'
  const {
    title,
    releaseDate,
    genId,

    overview,
    vote,
    poster,
    voteAverage,
    movieID,
    rateMovie,
  } = props

  let countRow = 0

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
  const picture = poster ? <img alt="example" src={`${imgBase}${poster}`} /> : <img alt="" className="posterErr" />

  return (
    <div className="card-movie">
      {picture}
      <Consumer>
        {(allGen) => {
          let newArrayGenres
          if (allGen) {
            newArrayGenres = genId.map((item) => {
              const newItem = allGen.find((index) => item === index.id)
              return newItem
            })
          }

          return (
            <Card className="cards-meta">
              {picture}
              <div className="card-title">
                <Meta title={title} description={voteAverage} />
                <span className="createDate">{release}</span>
                <Tags genData={newArrayGenres} />
              </div>
              <Overview countRow={countRow} overview={overview} genData={newArrayGenres} />
              <Rate
                count="10"
                allowHalf
                value={vote}
                onChange={(value) => {
                  rateMovie(movieID, value)
                }}
              />
            </Card>
          )
        }}
      </Consumer>
    </div>
  )
}

export default Cards

Cards.defaultProps = {
  vote: 0,
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  genId: PropTypes.arrayOf(PropTypes.shape).isRequired,
  overview: PropTypes.string.isRequired,
  vote: PropTypes.number,
  poster: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  movieID: PropTypes.number.isRequired,
  rateMovie: PropTypes.func.isRequired,
}
