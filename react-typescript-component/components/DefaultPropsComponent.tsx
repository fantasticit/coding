import React, { MouseEvent, SFC } from 'react'
import {withDefaultProps} from '../HighOrderComponents/withDefaultProps'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  color?: string
}

const defaultProps = {
  color: 'blue'
}

const ButtonWithDefaultParam: SFC<Props> = ({ onClick: handleClick, color, children }) => (
  <button style={{color}} onClick={handleClick}>{ children }</button>
)

export default withDefaultProps(defaultProps, ButtonWithDefaultParam)
