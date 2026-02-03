import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='border-b border-[#F2F4F7] w-full'>
        <div className='flex items-center gap-2 px-6 py-[21px]'>
            <Image src="/assets/home.svg" alt="Logo" width={20} height={20} className='' />
            <h1 className='text-[15px]/[20px] font-semibold'>Dashboard</h1>
        </div>
    </header>
  )
}

export default Header