import React from 'react'
import { Tabs } from 'antd'

import './search-toggle.css'

function SearchToggle() {
  const items = [
    { label: 'Search', key: 'item-1' },
    { label: 'Rated', key: 'item-2' },
  ]
  return <Tabs className="search-toggle" items={items} />
}
export default SearchToggle
