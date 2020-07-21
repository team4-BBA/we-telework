import React, { useEffect, useState } from 'react'
import HotelList from '../components/HotelList'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'

export interface RecommendHotelsProps {}

const RecommendHotels: React.SFC<RecommendHotelsProps> = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    axios
      .get(
        'https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426',
        {
          params: {
            format: 'json',
            largeClassCode: 'japan',
            middleClassCode: 'hokkaido',
            smallClassCode: 'jozankei',
            applicationId: appID
          }
        }
      )
      .then(({ data }) => {
        setHotels(data.hotels)
      })
  }, [])

  const hotelLists = hotels.length
    ? hotels.map((hotel: any, i: number) => {
        return <HotelList hotel={hotel.hotel} key={i} />
      })
    : null

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'spaceAround'
      }}
    >
      {hotelLists}
    </div>
  )
}

export default RecommendHotels
