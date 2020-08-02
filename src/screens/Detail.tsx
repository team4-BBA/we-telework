// ごまかし用の画面だよ！！

import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'
import Button from '@material-ui/core/Button'
import HotelList from '../components/HotelList'
import { AuthContext } from '../hooks/contexts/AuthContext'

export interface DetailProps {}

export const Detail = () => {
  const [basic, setBasic]: [any, any] = useState([])
  let { id } = useParams()
  const history = useHistory()
  const [hotels, setHotels] = useState([])
  const { setBottomNav } = useContext(AuthContext)

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
        // console.log(data.hotels.map((i: any) => ({ ...i, match: Math.random() })).sort((a: any, b: any) => b.match - a.match))
        setHotels(data.hotels.map((i: any) => ({ ...i, match: Math.random() })).sort((a: any, b: any) => b.match - a.match))
      })
    setBottomNav(1)
  }, [])

  // const [value, setValue] = React.useState<number[]>([20, 37])
  const hotelLists = hotels.length
    ? hotels.map((hotel: any, i: number) => {
        return <HotelList hotel={hotel.hotel} key={i} match={hotel.match} />
      })
    : null

  return (
    <div>
      {/* <p>
        <Link to={`/detail/${hotels[0].hotel[0].hotelBasicInfo.hotelNo}/applied`}>
          <button>申し込み</button>
        </Link>
      </p> */}
      <div style={{ width: '95%', margin: '0 auto' }}>
        {' '}
        <span style={{ fontSize: '90%', color: 'grey' }}> エリア: </span>定山渓
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'spaceAround',
          width: '95%',
          margin: '0 auto'
        }}
      >
        {hotelLists}
      </div>

      {/* <Button variant="contained" color="secondary" onClick={() => history.push('/detail/:id/applied')}>
        申し込む
      </Button> */}
      {basic.length ? <h2>{basic.hotelName}</h2> : null}
    </div>
  )
}

export default Detail
