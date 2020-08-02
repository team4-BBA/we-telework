import React, { useContext, useEffect, useState } from 'react'
import '../static/css/SignIn.css'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../hooks/contexts/AuthContext'
import firebase from '../constants/firebase'
import 'firebase/auth'
import 'firebaseui-ja/dist/firebaseui.css'
import Logo from '../static/img/logo_transparent.png'
import Apple from '../static/img/signinwithapple.png'
import Microsoft from '../static/img/microsoft.png'
const firebaseui = require('firebaseui-ja')
export interface SignInProps {}

/* eslint react-hooks/exhaustive-deps:0 */

const SignIn: React.SFC<SignInProps> = () => {
  const { user, isLoading } = useContext(AuthContext)
  const [didMount, setDidMount] = useState(false)
  const [ui, setUi]: [any, any] = useState<any>(null)

  useEffect(() => {
    if (didMount && !ui) setUi(firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth()))
  }, [isLoading])

  useEffect(() => {
    setDidMount(true)
    if (!isLoading && !ui) setUi(firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth()))
    if (!isLoading && !!ui) uiStart()
  }, [])

  useEffect(() => {
    if (didMount) uiStart()
  }, [ui])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (user) {
    return <Redirect to="/" />
  }

  const uiStart = () => {
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/signin',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
      // tosUrl: '<your-tos-url>',
      // privacyPolicyUrl: '/policy'
    })
  }

  // const signInWithEmailAndPassword = () => {
  //   if (mail === '') {
  //     alert('メールアドレスを入力してください')
  //     return
  //   } else if (pass === '') {
  //     alert('パスワードを入力してください')
  //     return
  //   }
  //   history.push('/recommends')
  // }

  // const signInWithTwitter = () => { //tslint-disable-line
  //   firebase.auth().signInWithRedirect(provider)
  // }

  return (
    <div className="loginContainer">
      <div style={{ width: '100%' }}>
        <img src={Logo} alt="" style={{ width: '100%', objectFit: 'contain' }} />
      </div>
      <div>
        <div id="firebaseui-auth-container" />
        <div
          style={{
            // marginTop: '5px',
            width: '220px',
            height: '45px',
            cursor: 'pointer',
            background: 'white',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0px 0px 2px 2px lightgrey',
            marginTop: '-15px'
          }}
        >
          {/* <div style={{ height: '20px' }}></div> */}
          <img src={Microsoft} alt="" style={{ width: '100%', objectFit: 'contain', margin: '5px 0', padding: '0px 10px' }} />
        </div>
        <img src={Apple} alt="" style={{ width: '220px', cursor: 'pointer', display: 'inline-block', paddingTop: 0, marginTop: '15px' }} />
      </div>
    </div>
  )
}

export default SignIn
