import { Tag } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

import './tags.css'

function Tags({ genData }) {
  let elements = null
  if (genData) {
    elements = genData.map((item) => (
      <Tag key={item.id} color="#FAFAFA">
        {item.name[0].toUpperCase() + item.name.slice(1)}
      </Tag>
    ))
  }

  return <div className="genres">{elements}</div>
}

export default Tags

Tags.propTypes = {
  genData: PropTypes.arrayOf(PropTypes.shape),
}
Tags.defaultProps = {
  genData: [],
}
