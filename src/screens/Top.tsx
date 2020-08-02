import React from 'react'
// import { AuthContext } from '../hooks/contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Roten from '../static/img/roten.jpg'
import Goto from '../static/img/goto.jpg'
import Hoshinoya from '../static/img/hoshinoya.jpg'
import Kenmin from '../static/img/kenmin.jpg'
import SearchIcon from '@material-ui/icons/Search'
// import { makeStyles } from '@material-ui/core'
import { withStyles, Theme } from '@material-ui/core/styles'
// import { green, purple } from '@material-ui/core/colors'
export interface TopProps {}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: 'snow',
    backgroundColor: '#AE214B',
    padding: '0.5rem 1.5rem',
    fontSize: '130%',
    borderRadius: '15px'
  }
}))(Button)

const Top: React.SFC<TopProps> = () => {
  const history = useHistory()
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      {/* <p>Top画面だよ</p> */}
      <p
        style={{
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        あなたへのおすすめ
      </p>
      <ul className="recommend">
        <li>
          <img src={Roten} alt="" />
        </li>
        <li>
          <img src={Goto} alt="" />
        </li>
        <li>
          <img src={Hoshinoya} alt="" />
        </li>
        <li>
          <img src={Kenmin} alt="" />
        </li>
      </ul>
      <div className="spacer1" />
      <div className="sagasu">
        <ColorButton
          variant="contained"
          color="secondary"
          // className={classes.button}
          endIcon={<SearchIcon />}
          onClick={() => history.push('/search')}
        >
          場所を探す
        </ColorButton>
      </div>
      <div className="spacer1" />
      <p
        style={{
          fontWeight: 600
          // textAlign: 'center'
        }}
      >
        地図から探す
      </p>
      <p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5192.055766076073!2d141.33115807900117!3d43.08469503790298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b28fd1c5ddf91%3A0x1ffe6cdbf652dd86!2z5YyX5rW36YGT5aSn5a2mIOODleODvOODiSbjg6Hjg4fjgqPjgqvjg6vjgqTjg47jg5njg7zjgrfjg6fjg7Plm73pmpvmi6Dngrk!5e0!3m2!1sja!2sjp!4v1596253424179!5m2!1sja!2sjp"
          width="600"
          height="450"
          style={{ border: 0, width: '100vw', height: '40vh' }}
          aria-hidden="false"
          title="map"
        />
      </p>
      <p
        style={{
          fontWeight: 600
          // textAlign: 'center'
        }}
      >
        キーワードから探す
      </p>
      <div className="form" style={{ margin: '0 auto' }}>
        <div style={{ margin: '0 auto' }}>
          <form>
            <TextField id="standard-basic" label="キーワード" />
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
      </div>
      {/* 検索画面を作ってつながない */}

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
