import React from 'react'
import { Link } from 'react-router-dom'

export interface ProfileProps {}

const Profile: React.SFC<ProfileProps> = () => {
  return (
    <div>
      プロフィール画面やで
      <p>
        <Link to="profile/register">趣味趣向を登録する</Link>
      </p>
    </div>
  )
}

export default Profile
