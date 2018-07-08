import * as React from 'react'
import Button from './components/StatelessComponent'
import ButtonCounter from './components/StatefulComponent'
import ButtonWithDefaultProps from './components/DefaultPropsComponent'
import Toggle from './components/RenderCallbaclComponent'
import ToggleableMenu from './components/InjectionComponent'


export default class App extends React.Component {
  'use strict'

  render() {
    return (
      <div>
        <Button onClick={ () => alert('Button Click') }>
          <span>StatelessButton</span>
        </Button>
        <br />
        <ButtonCounter />
        <br/>
        <ButtonWithDefaultProps onClick={() => alert('Button Click')}>
          <span>ButtonWithDefaultParam</span>
        </ButtonWithDefaultProps>
        <br />
        <Toggle render={({show, toggle}) => (
          <>
            <div onClick={toggle}>
              <h1>Title (Click me to toggle show content)</h1>
            </div>
            {show ? <p>Some Content</p> : null}
          </>
        )} />
        <br/>
        <ToggleableMenu title="Menu Title">
          <h1>Menu Content</h1>
        </ToggleableMenu>
      </div>
    )
  }
}
