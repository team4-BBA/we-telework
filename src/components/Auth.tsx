import React, { useContext } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const pathnames: Array<string> = ['/', '/search']

const Auth = (props: any) => {
  const location = useLocation()
  const { user, isLoading } = useContext(AuthContext)
  const { children } = props

  if (isLoading) {
    return <div>loading...</div>
  }

  if (user) {
    return children
  } else {
    if (!pathnames.includes(location.pathname)) {
      return <div>404もしくはログインしてないやで</div>
    } else {
      return <Redirect to="/signin" />
    }
  }
}

export default Auth
