import React, { useEffect, useState, useContext } from 'react'
// import HotelList from '../components/HotelList'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'
import Calendar from 'react-calendar'
// import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import 'react-calendar/dist/Calendar.css'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export interface SearchProps {}

const useStyles = makeStyles({
  root: {
    width: '80vw'
  }
})

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: 'snow',
    backgroundColor: '#AE214B',
    padding: '0.9rem 1rem',
    fontSize: '100%',
    borderRadius: '15px'
  }
}))(Button)

const Search: React.SFC<SearchProps> = () => {
  const { setBottomNav } = useContext(AuthContext)
  const [date_value, onChange] = useState<any>(new Date())
  const classes = useStyles()
  const [value, setValue] = React.useState([1000, 50000])
  const [wifi, setWifi] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [bigbath, setBigbath] = useState(false)
  const [spa, setSpa] = useState(false)
  const history = useHistory()

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  useEffect(() => setBottomNav(1), [])

  function valuetext(value: number) {
    return `${value}°C`
  }
  // export default function RangeSlider() {
  // const [value, setValue] = React.useState<number[]>([20, 37])

  // const hotelLists = hotels.length
  //   ? hotels.map((hotel: any, i: number) => {
  //       return <HotelList hotel={hotel.hotel} key={i} />
  //     })
  //   : null

  return (
    <div
      style={{
        margin: '0 auto',
        width: '92%'
      }}
    >
      <div style={{ width: '100%' }}>
        <div className="spacer1"></div>
        <div className="sagasu" style={{ margin: '0 auto' }}>
          <ColorButton
            variant="contained"
            color="secondary"
            // className={classes.button}
            endIcon={<SearchIcon />}
            onClick={() => history.push('/profile/register')}
          >
            あなたにぴったりの場所を探す
          </ColorButton>
        </div>
        <div className="spacer1"></div>
        <div className="spacer1"></div>
        <div style={{ height: '1px', width: '100%', margin: '0 auto', backgroundColor: 'grey' }}></div>
      </div>
      {/* {hotelLists} */}
      <div>
        <h3>条件を絞って探す</h3>
      </div>
      <div>
        <h5>期間</h5>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Calendar onChange={onChange} value={date_value} selectRange={true} />
      </div>
      <div>
        <div>
          <h5>場所のタイプ</h5>
        </div>
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={wifi} onChange={() => setWifi(!wifi)} name="check_wifi" />} label="インターネット完備" />
          <FormControlLabel control={<Checkbox checked={smoke} onChange={() => setSmoke(!smoke)} name="check_smoke" />} label="禁煙ルーム" />
          <FormControlLabel control={<Checkbox checked={bigbath} onChange={() => setBigbath(!bigbath)} name="check_bigbath" />} label="大浴場あり" />
          <FormControlLabel control={<Checkbox checked={spa} onChange={() => setSpa(!spa)} name="check_spa" />} label="温泉" />
        </FormGroup>
      </div>
      <div>
        <h5>価格帯を選ぶ</h5>
        <div className={classes.root}>
          {/* <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography> */}
          <Slider
            min={0}
            max={100000}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" endIcon={<SearchIcon>検索</SearchIcon>}>
            検索
          </Button>
          {/* ボタン */}
        </div>
        <div className="spacer1"></div>
        <div className="spacer1"></div>
      </div>
    </div>
  )
}

export default Search
