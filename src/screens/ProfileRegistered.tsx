import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ProfileRegisteredProps {}

const ProfileRegistered: React.SFC<ProfileRegisteredProps> = () => {
  return (
    <div>
      {/* 使わないよ！ */}
      <p>プロフィールを登録しました！</p>
      <p>
        <Link to={`/search`}>
          <button>ホーム画面へ</button>
        </Link>
      </p>
    </div>
  )
}

export default ProfileRegistered
