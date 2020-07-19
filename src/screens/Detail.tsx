import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { appID } from '../constants/RakutenAPI'

export interface Hotel1Props {}

export const Detail = () => {
  const [basic, setBasic]: [any, any] = useState([])
  const history = useHistory()
  let { id } = useParams()
  console.log(id)

  useEffect(() => {
    axios
      .get(
        'https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426',
        { params: { applicationId: appID, format: 'json', hotelNo: id } }
      )
      .then(({ data }) => {
        console.log(data)
        setBasic(data.hotels[0].hotel[0].hotelBasicInfo)
      })
  }, [])

  const gotoApplied = () => {
    history.push('/recommends/hotel1/applied')
  }

  return (
    <div>
      <p>
        {/* <Link to={`/detail/${hotels[0].hotel[0].hotelBasicInfo.hotelNo}`}> */}
        <button>申し込み</button>
        {/* </Link> */}
      </p>
      <button onClick={() => console.log(basic)}>basic</button>
      {basic.length ? <h2>{basic.hotelName}</h2> : null}
    </div>
  )
}

export default Detail
