import React from 'react'
import { Typography } from 'antd'
import './overview.css'

const { Paragraph } = Typography

function Overview({ countRow, overview }) {
  let counterRow = 0
  let overview1 = overview
  if (overview && overview.length > (6 - countRow) * 36) {
    let lengthOverview = 0
    const newOverview = overview
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
    overview1 = `${newOverview.substring(0, newOverview.lastIndexOf(' '))}...`
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
      {overview1}
    </Paragraph>
  )
}

export default Overview
