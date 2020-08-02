import * as React from 'react'
import { Link } from 'react-router-dom'

export interface RegisteredProps {}

const Registered: React.SFC<RegisteredProps> = () => {
  return (
    <div>
      {/* 使わないよ！ */}
      <p>登録完了しました！</p>
      <p>
        <Link to={`/`}>
          <button>ログイン画面へ</button>
        </Link>
      </p>
    </div>
  )
}

export default Registered
