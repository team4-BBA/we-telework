import * as React from 'react'
import { Link } from 'react-router-dom'

export interface RegisterProps {}

const Register: React.SFC<RegisterProps> = () => {
  return (
    <div>
      {/* 使わないよ！ */}
      <p>鋭意作成中！</p>
      <p>
        <Link to={`/registered`}>
          <button>登録</button>
        </Link>
      </p>
    </div>
  )
}

export default Register
