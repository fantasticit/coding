import React, { SFC } from 'react'
import Toggle, { ToggleProps } from './RenderCallbaclComponent'

type MenuItemProps = {
  title: string
}

const MenuItem: SFC<MenuItemProps & ToggleProps> = ({
  title,
  toggle,
  show,
  children
}) => (
  <>
    <div onClick={toggle}>
      <h1>{ title }</h1>
    </div>
    { show ? children : null }
  </>
)

// const ToggleableMenu: SFC<MenuItemProps> = ({
//   title,
//   children
// }) => (
//   <Toggle>
//     {({ show, toggle }) => (
//       <MenuItem show={show} toggle={toggle} title={title}>
//         {children}
//       </MenuItem>
//     )}
//   </Toggle>
// )

const ToggleableMenu: SFC<MenuItemProps> = ({
  title,
  children
}) => (
  <Toggle component={MenuItem} props={{ title }}>
    {children}
  </Toggle>
)

export default ToggleableMenu
