import React from 'react'

type SeatsProps = {
    index: number,
    size:number
}

const Seats = ({index, size}:SeatsProps) => {
  return (
    <div className='rounded-full border-2 border-black' style={{width:size,height:size}}>seats{index}</div>
  )
}

export default Seats
