"use client"

import React from 'react'



const userProfile = ({ params }: any) => {

    
    return (
        <>
             <div className="flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <h2 className='text-2xl font-bold leading-tight text-black'>PROFILE PAGE</h2>            
            </div>
            <div className="flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 "  >
                <h2 className=' text-2xl font-bold leading-tight text-black'> UserProfile
                    <span className=' rounded-md bg-orange-500 py-2 px-3 text-black ml-2'>{params.id}</span>
                </h2>
            </div>        
            
        
        </>
  )
}
 
export default userProfile