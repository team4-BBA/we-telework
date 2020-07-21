import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import firebase from '../constants/firebase'
import { Link } from 'react-router-dom'

export interface TopProps {}

const Top: React.SFC<TopProps> = () => {
  const { setUser } = useContext(AuthContext)

  const handleSignOut = (): any => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('ログアウトdone')
        setUser(null)
      })
      .catch((error) => {
        alert(`ログアウトできず: ${error}`)
      })
  }

  return (
    <div>
      Top画面だよ
      <button onClick={handleSignOut}>ログアウト</button>
      <p>
        <Link to="/recommends">探す</Link>
      </p>
      <div style={{ textAlign: 'right' }}>
        {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
        <a
          href="https://webservice.rakuten.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://webservice.rakuten.co.jp/img/credit/200709/credit_22121.gif"
            // border="0"
            alt="楽天ウェブサービスセンター"
            title="楽天ウェブサービスセンター"
            width="221"
            height="21"
          />
        </a>
        {/* <!-- Rakuten Web Services Attribution Snippet TO HERE --> */}
      </div>
    </div>
  )
}

export default Top
