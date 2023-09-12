import React from 'react'

function Container({children}) {
  return (
    <div className='w-[93%] md:w-[80%] lg:w-[89%] 2xl:w-[87%] m-auto'>
        {children}
    </div>
  )
}

export default Container