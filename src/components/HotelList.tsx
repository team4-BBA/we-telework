import React from 'react'
// import { Link } from 'react-router-dom'
import '../static/css/HotelList.css'
import { Button } from '@material-ui/core'

export interface HotelListProps {}

const HotelList = (props: any) => {
  const { hotel } = props
  const hotelBasicInfo = hotel[0].hotelBasicInfo

  return (
    <div className="hotellist">
      <h3>{hotelBasicInfo.hotelName}</h3>
      <img className="img" src={hotelBasicInfo.hotelThumbnailUrl} alt="thubnail of hotel" />
      <div>
        {/* <p>交通手段：{hotelBasicInfo.access}</p> */}
        <p>
          住所：{hotelBasicInfo.address1}
          {hotelBasicInfo.address2}
          <br />
          {hotelBasicInfo.hotelSpecial}
        </p>
        {/* <p>電話番号：{hotelBasicInfo.telephoneNo}</p> */}
        {/* <p>FAX番号：{hotelBasicInfo.faxNo}</p> */}
        {/* <p></p> */}
        {/* <p>{hotelBasicInfo.hotelThumbnailUrl}</p> */}
        {/* <p>最寄り駅：{hotelBasicInfo.nearestStation}</p> */}
        {/* <p>駐車場：{hotelBasicInfo.parkingInformation}</p> */}
        {/* <p>お客様の声：{hotelBasicInfo.userReview}</p> */}
        <p>平均評価：{hotelBasicInfo.reviewAverage}</p>
        <p>
          {/* <Link to={`/detail/${hotelBasicInfo.hotelNo}`}> */}
          {/* <button>詳細</button> */}
          {/* </Link> */}
        </p>
      </div>
      <div style={{ textAlign: 'right', position: 'relative', height: '4rem' }}>
        <span
          style={{
            display: 'inline-block',
            position: 'absolute',
            left: 0,
            bottom: '1px',
            padding: '2px',
            border: '2px solid red',
            borderRadius: '4px',
            borderColor: Math.round(props.match * 100) > 80 ? 'red' : Math.round(props.match * 100) > 50 ? 'orange' : '#222'
          }}
        >
          あなたとのマッチ度
          <span
            style={{
              color: props.match - 0 > 80 ? 'red' : props.match - 0 > 50 ? 'orange' : '#222',
              fontSize: '140%',
              display: 'inline-block',
              padding: '3px 3px 2px 6px',
              transform: 'translateY(6px)'
            }}
          >
            {Math.round(props.match * 1000) / 10}%
          </span>
        </span>
        <Button variant="contained">詳細</Button>
      </div>
      <div className="spacer1"></div>
      <div style={{ height: '1px', background: 'grey' }}></div>
    </div>
  )
}

export default HotelList
