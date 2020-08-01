import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../hooks/contexts/AuthContext'
import firebase from '../constants/firebase'

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { user, setUser } = useContext(AuthContext)
  const handleSignOut = (): any => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('ログアウトdone')
        setUser(null)
      })
      .catch((error) => {
        alert(`ログアウトできず: ${error}`)
      })
  }
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <p>プロフィール画面やで</p>
      <p>
        <button onClick={handleSignOut}>ログアウト</button>
      </p>
      <div>
        <Link to="profile/register">趣味趣向を登録する</Link>
        <button onClick={() => console.log(user)}>user</button>
        <p>名前: {user.displayName && user.displayName}</p>
      </div>
    </div>
  )
}

export default Profile
