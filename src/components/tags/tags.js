import { Tag } from 'antd'
import React from 'react'
import './tags.css'

function Tags({ genresData }) {
  let elements = null
  if (genresData) {
    elements = genresData.map((item) => (
      <Tag key={item.id} color="#FAFAFA">
        {item.name[0].toUpperCase() + item.name.slice(1)}
      </Tag>
    ))
  }

  return <div className="genres">{elements}</div>
}

export default Tags
