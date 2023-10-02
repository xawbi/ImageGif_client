import {FC} from 'react'

const SearchButton: FC = () => {
  return (
    <>
      <button
        className="text-white hover:bg-[#202333] py-2 px-3 rounded-2xl border-2 border-gray-500 lg:text-base text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="inline-block w-5 h-5 mr-1.5 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
        Search
      </button>
    </>
  )
}

export default SearchButton