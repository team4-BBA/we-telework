import React, { useState, useEffect } from 'react'
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

const App = () => {
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [signInSuccessOpen, setSignInSuccessOpen] = useState(false)

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

  return (
    <div className="App" style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/recommends" component={RecommendHotels} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/detail/:id/applied" component={Applied} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/registered" component={Registered} />
          <Route exact path="/profile/register" component={ProfileRegister} />
          <Route
            exact
            path="/profile/registered"
            component={ProfileRegistered}
          />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
