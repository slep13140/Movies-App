import React from 'react'
import { Typography } from 'antd'
import './overview.css'

const { Paragraph } = Typography

function Overview({ countRow, overview }) {
  let counterRow = 0
  let newOverview = overview
  if (overview && overview.length > (6 - countRow) * 36) {
    let lengthOverview = 0
    const newArray = overview
      .split(' ')
      .map((i) => {
        if (counterRow > 5 - countRow) {
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
        rows: 6 - countRow,
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
