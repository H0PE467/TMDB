import React from 'react'
import {IPill} from './types'

const Pill: React.FC<IPill> = ({title, color}) => {

  return (
    <div className={`bg-red-500 inline-block p-1.5 rounded-lg`}>
        <p className='text-white text-xs font-semibold'>{title}</p>
    </div>
  )
}

export default Pill