import React from 'react'
import Button from './StatelessComponent'

const initialState = { count: 0 }
type State = Readonly<typeof initialState>

export default class ButtonCounter extends React.Component<Object, State> {
  readonly state: State = { count: 1 }

  private handleDecrement = () => this.setState(decrementCount)
  private handleIncrement = () => this.setState(incrementCount)

  render() {
    const {count} = this.state

    return (
      <>
        <Button onClick={this.handleDecrement}>-</Button>
        <span>You've click { count } times</span>
        <Button onClick={this.handleIncrement}>+</Button>
      </>
    )
  }
}

const decrementCount = (prevState: State) => ({
  count: prevState.count - 1
})

const incrementCount = (prevState: State) => ({
  count: prevState.count + 1
})
