import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert className="mr-3" variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
