import React, { useContext } from 'react'
import { AuthContext } from '../hooks/contexts/AuthContext'
import firebase from '../constants/firebase'
import { Link } from 'react-router-dom'
import '../static/css/top.css'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
      <p>Top画面だよ</p>
      <button onClick={handleSignOut}>ログアウト</button>
      <p>あなたへのおすすめ!!!!!!!!!!</p>
      {/* ここにrecommendの上2つの画像入れたい */}
      <div className="recommend">
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div className="sagasu">
        <Link to="/recommends">探す</Link>
      </div>
      <p>地図から探す</p>
      <p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5192.055766076073!2d141.33115807900117!3d43.08469503790298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b28fd1c5ddf91%3A0x1ffe6cdbf652dd86!2z5YyX5rW36YGT5aSn5a2mIOODleODvOODiSbjg6Hjg4fjgqPjgqvjg6vjgqTjg47jg5njg7zjgrfjg6fjg7Plm73pmpvmi6Dngrk!5e0!3m2!1sja!2sjp!4v1596253424179!5m2!1sja!2sjp"
          width="600"
          height="450"
          style={{ border: 0, width: '100vw', height: '40vh' }}
          aria-hidden="false"
        />
      </p>
      <p>キーワードから探す</p>
      <p className="form">
        <div>
          <form>
            <TextField id="standard-basic" label="検索" />
          </form>
        </div>
        <div
          style={{
            lineHeight: '50px'
          }}
        >
          <Button variant="contained" color="primary">
            検索
          </Button>
        </div>
      </p>
      {/* 検索画面を作ってつなぐ */}

      <div style={{ textAlign: 'right' }}>
        {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
        <a href="https://webservice.rakuten.co.jp/" target="_blank" rel="noopener noreferrer">
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
