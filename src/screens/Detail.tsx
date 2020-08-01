import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'

export interface Hotel1Props {}

export const Detail = () => {
  const [basic, setBasic]: [any, any] = useState([])
  let { id } = useParams()

  useEffect(() => {
    axios
      .get('https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426', {
        params: { applicationId: appID, format: 'json', hotelNo: id }
      })
      .then(({ data }) => {
        setBasic(data.hotels[0].hotel[0].hotelBasicInfo)
      })
  }, []) // eslint-disable-line

  return (
    <div>
      <p>{/* <Link to={`/detail/${hotels[0].hotel[0].hotelBasicInfo.hotelNo}/applied`}>
          <button>申し込み</button>
        </Link> */}</p>
      <button onClick={() => console.log(basic)}>basic</button>
      {basic.length ? <h2>{basic.hotelName}</h2> : null}
    </div>
  )
}

export default Detail
