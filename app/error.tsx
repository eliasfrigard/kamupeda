'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: any
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className=''>
      <h2>{error.status}</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}