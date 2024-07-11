import React from 'react'

const Footer = () => {
  return (
    <div className=' flex flex-col w-full'>
        <div className=' grid grid-cols-1 w-full gap-4 my-5 md:grid-cols-3'>
        <div className=' flex flex-col gap-2'>
            <h1 className=' font-bold'>CONTENT</h1>
            <p className=' text-sm text-neutral-600'>Authors</p>
            <p className=' text-sm text-neutral-600'>New Posts</p>
            <p className=' text-sm text-neutral-600'>Workspace</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className=' font-bold'>HELP</h1>
            <p className=' text-sm text-neutral-600'>Support</p>
            <p className=' text-sm text-neutral-600'>FAQS</p>
            <p className=' text-sm text-neutral-600'>Editor</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className=' font-bold'>COMPANY</h1>
            <p className=' text-sm text-neutral-600'>About</p>
            <p className=' text-sm text-neutral-600'>Contact us</p>
            <p className=' text-sm text-neutral-600'>Our license</p>
        </div>
        
    </div>
    <hr className=' bg-neutral-400 h-[0.5px] border-none' />
    <div className=' text-sm text-neutral-600 py-4'>Copyright @ 2010-2024 Prompt-G Company. All rights reserved</div>
    </div>
  )
}

export default Footer