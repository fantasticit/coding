import React, { MouseEvent, SFC } from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
}

// SFC: alias of interface StatelessComponent<P>
const Button: SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{ children }</button>
)

export default Button
