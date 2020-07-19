import * as React from 'react'
import '../static/css/SignIn.css'
import { useHistory, Link } from 'react-router-dom'

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  const history = useHistory()
  const [mail, setMail] = React.useState('')
  const [pass, setPass] = React.useState('')

  const signInWithEmailAndPassword = () => {
    console.log('ろぐいんするよ！')
    console.log(mail, pass)
    if (mail === '') {
      alert('メールアドレスを入力してください')
      return
    } else if (pass === '') {
      alert('パスワードを入力してください')
      return
    }
    history.push('/recommends')
  }

  return (
    <div className="loginContainer" style={{ border: '1px solid green' }}>
      ログインしてね！
      <form onSubmit={signInWithEmailAndPassword}>
        <table>
          <tbody>
            <tr>
              <td>メールアドレス</td>
              <td>
                <input
                  type="text"
                  id="email"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                />
              </td>
            </tr>
            <tr>
              <td>パスワード</td>
              <td>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                />
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
      <p>アカウントがない方はこちら</p>
      <p>
        <Link to={`/register`}>
          <button>ユーザー登録</button>
        </Link>
      </p>
    </div>
  )
}

export default SignIn
