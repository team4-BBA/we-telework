import React from 'react'
// import { Link } from 'react-router-dom'
import '../static/css/HotelList.css'

export interface HotelListProps {}

const HotelList = (props: any) => {
  const { hotel } = props
  const hotelBasicInfo = hotel[0].hotelBasicInfo

  return (
    <div className="hotellist">
      <h2>{hotelBasicInfo.hotelName}</h2>
      <img className="img" src={hotelBasicInfo.hotelThumbnailUrl} alt="thubnail of hotel" />
      <div>
        <p>交通手段：{hotelBasicInfo.access}</p>
        <p>
          住所：{hotelBasicInfo.address1}
          {hotelBasicInfo.address2}
        </p>
        <p>電話番号：{hotelBasicInfo.telephoneNo}</p>
        <p>FAX番号：{hotelBasicInfo.faxNo}</p>
        <p>{hotelBasicInfo.hotelSpecial}</p>
        {/* <p>{hotelBasicInfo.hotelThumbnailUrl}</p> */}
        <p>最寄り駅：{hotelBasicInfo.nearestStation}</p>
        <p>駐車場：{hotelBasicInfo.parkingInformation}</p>
        <p>お客様の声：{hotelBasicInfo.userReview}</p>
        <p>平均評価：{hotelBasicInfo.reviewAverage}</p>
        <p>
          {/* <Link to={`/detail/${hotelBasicInfo.hotelNo}`}> */}
          {/* <button>詳細</button> */}
          {/* </Link> */}
        </p>
      </div>
    </div>
  )
}

export default HotelList
