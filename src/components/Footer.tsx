import React from 'react'
import { NavLink } from 'react-router-dom'

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        background: 'orange',
        padding: 0,
        margin: 0,
        height: '7vh',
        display: 'flex',
        justifyContent: 'stretch'
      }}
    >
      <NavLink to="/" style={styles.navlink} exact activeStyle={styles.active}>
        <div>トップ</div>
      </NavLink>
      <NavLink
        exact
        to="/recommends"
        style={styles.navlink}
        activeStyle={styles.active}
      >
        <div>さがす</div>
      </NavLink>
      <NavLink
        exact
        to="/register"
        style={styles.navlink}
        activeStyle={styles.active}
      >
        <div>おしゃべり</div>
      </NavLink>
      <NavLink to="/profile" style={styles.navlink} activeStyle={styles.active}>
        <div>マイページ</div>
      </NavLink>
    </div>
  )
}

const styles = {
  navlink: {
    border: '1px solid grey',
    flex: 1
  },
  active: {
    backgroundColor: 'red'
  }
}

export default Footer
