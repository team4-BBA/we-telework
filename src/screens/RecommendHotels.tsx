import React, { useEffect, useState } from 'react'
// import HotelList from '../components/HotelList'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'
import Calendar from 'react-calendar'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import 'react-calendar/dist/Calendar.css'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

export interface RecommendHotelsProps {}

const useStyles = makeStyles({
  root: {
    width: '80vw'
  }
})

const RecommendHotels: React.SFC<RecommendHotelsProps> = () => {
  // const [hotels, setHotels] = useState([])
  const [date_value, onChange] = useState<any>(new Date())
  const classes = useStyles()
  const [value, setValue] = React.useState([1000, 50000])
  const [wifi, setWifi] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [bigbath, setBigbath] = useState(false)
  const [spa, setSpa] = useState(false)

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  useEffect(() => {
    axios
      .get('https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426', {
        params: {
          format: 'json',
          largeClassCode: 'japan',
          middleClassCode: 'hokkaido',
          smallClassCode: 'jozankei',
          applicationId: appID
        }
      })
      .then(({ data }) => {
        // setHotels(data.hotels)
      })
  }, [])

  function valuetext(value: any) {
    return `${value}°C`
  }

  // const hotelLists = hotels.length
  //   ? hotels.map((hotel: any, i: number) => {
  //       return <HotelList hotel={hotel.hotel} key={i} />
  //     })
  //   : null

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'spaceAround',
        margin: '0 auto',
        width: '95%'
      }}
    >
      {/* {hotelLists} */}
      <h5>期間</h5>
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
        <h5>値段選んでね～</h5>
        <div className={classes.root}>
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
        <div>
          <Button variant="contained" color="primary" endIcon={<SearchIcon>検索</SearchIcon>}>
            検索
          </Button>
          {/* ボタン */}
        </div>
      </div>
    </div>
  )
}

export default RecommendHotels
