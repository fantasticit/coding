import React, { ReactNode, ComponentType } from 'react'

const initialState = { show: false }
type State = Readonly<typeof initialState>

const defaultProps = { props: {} as { [name: string]: any} }

export type ToggleProps<P extends object = object> = {
  show: State['show'],
  toggle: Toggle['toggle']
} & P

type RenderCallback = (args: ToggleProps) => JSX.Element

type Props = Partial<{
  children: RenderCallback | ReactNode,
  render: RenderCallback,
  component: ComponentType<any>
} & typeof defaultProps>

class Toggle extends React.Component<Props, State> {
  readonly state: State = initialState

  private toggle = () => this.setState(updateShowState)

  render() {
    const { props, render, children, component: InjectionComponent } = this.props
    const renderProps = {
      show: this.state.show,
      toggle: this.toggle
    }

    if (InjectionComponent) {
      return (
        <InjectionComponent {...props} {...renderProps}>
          { children }
        </InjectionComponent>
      )
    }

    if (render) {
      return render(renderProps)
    }

    return typeof children === 'function' ? children(renderProps) : null
  }
}

const updateShowState = (prevState: State) => ({
  show: !prevState.show
})

export default Toggle
