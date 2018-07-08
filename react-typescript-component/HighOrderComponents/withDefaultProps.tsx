import React from 'react'

export const withDefaultProps = (
  defaultProps, 
  Component
) => {
  Component.defaultProps = defaultProps
  return Component
}
