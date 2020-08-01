import React, { useContext, useEffect, useState } from 'react'
import '../static/css/SignIn.css'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { AuthContext } from '../hooks/contexts/AuthContext'
import firebase from '../constants/firebase'
import 'firebase/auth'
import 'firebaseui-ja/dist/firebaseui.css'
import Logo from '../static/img/logo_transparent.png'
const firebaseui = require('firebaseui-ja')
export interface SignInProps {}

/* eslint react-hooks/exhaustive-deps:0 */

const SignIn: React.SFC<SignInProps> = () => {
  const history = useHistory()
  const { user, isLoading } = useContext(AuthContext)
  const [didMount, setDidMount] = useState(false)
  const [mail, setMail] = React.useState('')
  const [pass, setPass] = React.useState('')
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
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
      // tosUrl: '<your-tos-url>',
      // privacyPolicyUrl: '/policy'
    })
  }

  const signInWithEmailAndPassword = () => {
    if (mail === '') {
      alert('メールアドレスを入力してください')
      return
    } else if (pass === '') {
      alert('パスワードを入力してください')
      return
    }
    history.push('/recommends')
  }

  // const signInWithTwitter = () => { //tslint-disable-line
  //   firebase.auth().signInWithRedirect(provider)
  // }

  return (
    <div className="loginContainer">
      <div style={{ width: '100%' }}>
        <img src={Logo} alt="" style={{ width: '100%', objectFit: 'contain' }} />
      </div>
      <div id="firebaseui-auth-container" />
      {/* <p>
        <button onClick={signInWithTwitter}>ツイッターでログイン</button>
      </p> */}
      <small>又は</small>
      <p>
        <Link to={`/register`}>
          <button>ユーザー登録</button>
        </Link>
      </p>
      <p>
        <form onSubmit={signInWithEmailAndPassword}>
          <table>
            <tbody>
              <tr>
                <td>メールアドレス</td>
                <td>
                  <input type="text" id="email" onChange={(e) => setMail(e.target.value)} value={mail} />
                </td>
              </tr>
              <tr>
                <td>パスワード</td>
                <td>
                  <input type="password" id="password" onChange={(e) => setPass(e.target.value)} value={pass} />
                </td>
              </tr>
            </tbody>
          </table>
          <input
            // className="loginbutton"
            type="submit"
            value="ログイン"
          />
        </form>
      </p>
    </div>
  )
}

export default SignIn
