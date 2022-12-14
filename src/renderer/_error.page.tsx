import React from 'react'
import { Link } from './Link'

export { Page }

function Page({ is4024 }: { is4024: boolean }) {
  const is404 = false
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">{is404 ? '404' : '500'}</h1>
      {!is404 ? <h3 className="text-2xl font-bold text-white tracking-widest">Internal Server Error</h3> : null}
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        {is404 ? 'Page Not Found' : 'Something went wrong.'}
      </div>
      <button className="mt-5">
          <a
            className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              
            </span>
          </a>
        </button>
    </main>
  )
}
