import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './screens/SignIn'
import RecommendHotels from './screens/RecommendHotels'
import Navbar from './components/Navbar'
import Detail from './screens/Detail'
import Applied from './screens/Applied'
import Register from './screens/Register'
import Registered from './screens/Registered'
import ProfileRegister from './screens/ProfileRegister'
import ProfileRegistered from './screens/ProfileRegistered'
import Footer from './components/Footer'
import firebase from './constants/firebase'
import 'firebase/auth'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext'
import Auth from './components/Auth'
import Top from './screens/Top'

const App = () => {
  const { user, setUser, isLoading, setLoading } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user)
        console.log(`successfully logged in!`)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="App" style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <Navbar />
      <div style={{ minHeight: '90vh' }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Auth>
              <Switch>
                <Route exact path="/" component={Top} />
                <Route exact path="/recommends" component={RecommendHotels} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route exact path="/detail/:id/applied" component={Applied} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/registered" component={Registered} />
                <Route
                  exact
                  path="/profile/register"
                  component={ProfileRegister}
                />
                <Route
                  exact
                  path="/profile/registered"
                  component={ProfileRegistered}
                />
                <Route render={() => <div>404</div>} status={404} />
              </Switch>
            </Auth>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  )
}

const AppContainer: any = (): any => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

export default AppContainer
