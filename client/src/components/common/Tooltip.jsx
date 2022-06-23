import React from 'react'

export default function Tooltip({message}) {
  return (
     <div className="
    absolute bg-gray-700 text-white px-2 py-1 z-50 rounded-lg
    bottom-1/2 translate-y-1/2 left-2/3 translate-x-1/2
    w-full
    ">
    {message}
    </div>

  )
}
