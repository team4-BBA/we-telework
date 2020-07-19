import React from 'react'
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

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App
