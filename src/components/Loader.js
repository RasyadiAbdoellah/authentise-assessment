import React from 'react'

export default function Loader({status, children}) {
  return (
    <>
      {status === "getting" && <div className='loader-message loading'>Loading...</div>}
      {status === "success" && children}
      {status === "failed" && <div className='loader-message error'>Failed to load resource. Check console for more details.</div>}
    </>
  )
}