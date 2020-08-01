import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import ForumIcon from '@material-ui/icons/Forum'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { AuthContext } from '../hooks/contexts/AuthContext'

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const history = useHistory()
  const location = useLocation()
  const { bottomNav, setBottomNav } = useContext(AuthContext)
  if (location.pathname === '/signin' || location.pathname === '/profile/register') {
    return null
  }
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        padding: 0,
        margin: 0,
        height: '8vh',
        overflowY: 'hidden'
      }}
    >
      <BottomNavigation
        value={bottomNav}
        onChange={(event, newValue) => {
          setBottomNav(newValue)
        }}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction label="Top" icon={<HomeIcon />} onClick={() => history.push('/')} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={() => history.push('/search')} />
        <BottomNavigationAction label="Community" icon={<ForumIcon />} onClick={() => history.push('/register')} />
        {/* registerは暫定！ */}
        <BottomNavigationAction label="MyPage" icon={<AccountCircleIcon />} onClick={() => history.push('/profile')} />
      </BottomNavigation>
    </div>
  )
}

// const styles = {
//   navlink: {
//     border: '1px solid grey',
//     flex: 1
//   },
//   active: {
//     backgroundColor: 'red'
//   }
// }

export default Footer
