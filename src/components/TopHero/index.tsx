import { Link } from "../../renderer/Link";

export function TopHero() {
  
  return (
    <section className="pt-24 pb-24 bg-white dark:bg-inherit">
        <div className="px-12 mx-auto max-w-7xl">
            <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 dark:text-white md:text-6xl md:tracking-tight">
                    <span>Mint</span> <span className="block w-full py-2 text-transparent bg-clip-text dark:shadow-white leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">Digital Postcards</span> <span>on the Blockchain</span>
                </h1>
                <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                    Create a custom postcard and send it to your friends as NFT
                </p>
                <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                    <Link href="/app" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 hover:bg-green-500 rounded-2xl sm:w-auto sm:mb-0">
                        OPEN APP
                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    
                    {/*<a href="#_" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    </a>*/ ""}
                </div>
            </div>
        </div>
    </section>
  )
}



