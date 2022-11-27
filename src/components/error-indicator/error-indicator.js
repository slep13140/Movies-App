import React from 'react'
import { Alert } from 'antd'

import './error-indicator.css'

function ErrorIndicator() {
  return <Alert className="error-indicator" message="Error Text" type="error" />
}

export default ErrorIndicator
