import { useState, useEffect } from 'react'

export interface WindowSize {
  width: number
  height: number
}

export default function useWindowDimensions(): WindowSize {
  const hasWindow = typeof window !== 'undefined'
  const getWindowDimensions = (): WindowSize => {
    const width = hasWindow ? window.innerWidth : 0
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = (): void => setWindowDimensions(getWindowDimensions())
    if (hasWindow) {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) //eslint-disable-line

  return windowDimensions
}
