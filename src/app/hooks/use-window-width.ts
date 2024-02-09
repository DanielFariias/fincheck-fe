import { useState } from 'react'

export function useWindowWidth() {
  const [width] = useState(window.innerWidth)

  // useEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth)
  //   }

  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  return { width }
}
