import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'

import './overview.css'

const { Paragraph } = Typography

function Overview({ countRow, overview, genData }) {
  let countGenresRow = countRow
  let counterRow = 0
  let newOverview = overview
  if (genData) {
    let lengthGenres = 0
    genData.forEach((i) => {
      lengthGenres += i.name.length
      if (lengthGenres >= 25) {
        countGenresRow += 1
        lengthGenres = i.name.length
      }
    })
  }

  if (overview && overview.length > (6 - countGenresRow) * 36) {
    let lengthOverview = 0
    const newArray = overview
      .split(' ')
      .map((i) => {
        if (counterRow > 5 - countGenresRow) {
          return ''
        }
        lengthOverview += i.length + 1
        if (lengthOverview >= 37) {
          counterRow += 1
          lengthOverview = i.length + 1
          return i
        }
        return i
      })
      .join(' ')
      .trimEnd()
    newOverview = `${newArray.substring(0, newArray.lastIndexOf(' '))}...`
  }

  return (
    <Paragraph
      className="overview"
      ellipsis={{
        rows: 6 - countGenresRow,
        expandable: false,
        autoSize: {
          minRows: 3,
          maxRows: 6,
        },
      }}
    >
      {newOverview}
    </Paragraph>
  )
}

export default Overview

Overview.propTypes = {
  countRow: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  genData: PropTypes.arrayOf(PropTypes.shape),
}

Overview.defaultProps = {
  genData: [],
}
