import React from 'react'
import { Link } from 'react-router-dom'
import '../static/css/HotelList.css'

export interface HotelListProps {}

const HotelList = (props: any) => {
  const { hotel } = props
  const hotelBasicInfo = hotel[0].hotelBasicInfo

  return (
    <div className="hotellist">
      <h2>{hotelBasicInfo.hotelName}</h2>
      <img
        className="img"
        src={hotelBasicInfo.hotelThumbnailUrl}
        alt="thubnail of hotel"
      />
      <div>
        <p>{hotelBasicInfo.access}</p>
        <p>{hotelBasicInfo.address1}</p>
        <p>{hotelBasicInfo.address2}</p>
        <p>{hotelBasicInfo.faxNo}</p>
        <p>{hotelBasicInfo.hotelSpecial}</p>
        <p>{hotelBasicInfo.hotelThumbnailUrl}</p>
        <p>{hotelBasicInfo.nearestStation}</p>
        <p>{hotelBasicInfo.parkingInformation}</p>
        <p>{hotelBasicInfo.telephoneNo}</p>
        <p>{hotelBasicInfo.userReview}</p>
        <p>{hotelBasicInfo.reviewAverage}</p>
        <p>
          <Link to={`/detail/${hotelBasicInfo.hotelNo}`}>
            <button>詳細</button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default HotelList
