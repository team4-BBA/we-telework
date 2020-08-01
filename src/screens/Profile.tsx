import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../hooks/contexts/AuthContext'

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { user } = useContext(AuthContext)
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      プロフィール画面やで
      <div>
        <Link to="profile/register">趣味趣向を登録する</Link>
        <button onClick={() => console.log(user)}>user</button>
        <p>名前: {user.displayName && user.displayName}</p>
      </div>
    </div>
  )
}

export default Profile
