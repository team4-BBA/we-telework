import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ProfileRegisterProps {}

const ProfileRegister: React.SFC<ProfileRegisterProps> = () => {
  return (
    <div>
      <p>完成を待て！</p>
      <p>
        <Link to={`/profile/registered`}>
          <button>登録</button>
        </Link>
      </p>
    </div>
  )
}

export default ProfileRegister
