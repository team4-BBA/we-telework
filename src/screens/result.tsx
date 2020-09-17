import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export interface ResultProps {}

const Result: React.FC<ResultProps> = () => {
  const { hotels } = useContext(AuthContext)

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <p>結果やで</p>
    </div>
  )
}

export default Result
