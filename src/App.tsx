import React, { useEffect, useContext } from 'react'
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
import Profile from './screens/Profile'
import { User, Observer } from 'firebase'

/* eslint react-hooks/exhaustive-deps:0 */

const handleRedirectFromTwitter = () => {
  console.log('sign in with twitter')
  firebase
    .auth()
    .getRedirectResult()
    .then((result: any) => {
      console.log(result)
      if (result.credential) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        // var token = result.credential.accessToken
        // var secret = result.credential.secret
        // ...
      }
      // The signed-in user info.
      // var user = result.user
    })
    .catch((error) => {
      console.error(error)
      // Handle Errors here.
      // var errorCode = error.code
      // var errorMessage = error.message
      // The email of the user's account used.
      // var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential
      // ...
    })
}

const App = () => {
  const { setUser, isLoading, setLoading } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: Observer<any, Error> | User | null) => {
      if (user) {
        handleRedirectFromTwitter()
        setUser(user)
        console.log(`successfully logged in!`)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

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
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/register" component={ProfileRegister} />
                <Route exact path="/profile/registered" component={ProfileRegistered} />
                <Route render={() => <div>404</div>} status={404} />
              </Switch>
            </Auth>
          </Switch>
          <div style={{ height: '8vh' }} />
          <Footer />
        </BrowserRouter>
      </div>
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
