import { ConnectKitButton } from 'connectkit'
import React, { useState } from 'react'
import { Link } from '../../renderer/Link'
import { ThemeIcon } from '../ThemeButton';


export { TopNavbar }

function TopNavbar() {
    const [isOpenMenu, setOpenMenu] = useState(false);
    return (
        <>
            {isOpenMenu ? (
                <div onClick={() => { setOpenMenu(false) }} className="w-full h-full fixed block top-0 left-0 bg-white dark:bg-slate-800 opacity-75 z-10"></div>
            ) : null}
            <div className="relative bg-transparent border-b-2 border-gray-100 dark:border-slate-700 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between  py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <Link href="/">
                                <span className="sr-only">Send ETH</span>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="15" height="30" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
                                    viewBox="0 0 784.37 1277.39"
                                    xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <g id="Layer_x0020_1">
                                        <g id="_1421394342400">
                                            <g>
                                                <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 " />
                                                <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " />
                                                <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 " />
                                                <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " />
                                                <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " />
                                                <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                        </div>
                        <div className="-my-2 -mr-2 md:hidden">
                            <button type="button" onClick={() => { setOpenMenu(true) }} className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800  dark:text-white dark:hover:text-gray-400" aria-expanded="false">
                                <span className="sr-only">Open menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                        <nav className="hidden space-x-10 md:flex">
                            <Link className="text-base font-medium text-gray-500 hover:text-gray-900  dark:text-white dark:hover:text-gray-400" href="/app">
                                APP
                            </Link>
                        </nav>
                        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                            <ConnectKitButton />
                        </div>
                        <div className="items-center justify-end align-end flex ">
                            <ThemeIcon />
                        </div>
                    </div>
                </div>
                <div className={`absolute inset-x-0 top-0 origin-topRight transform p-2 transition ${isOpenMenu ? '' : 'hidden'} md:hidden`}>
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="space-y-6 py-6 px-5">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <Link className="text-base font-medium text-gray-500 hover:text-gray-900" href="/app">APP</Link>
                            </div>
                            <div>
                                <ConnectKitButton />
                            </div>
                            <div>
                                <ThemeIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
