import React from 'react'
import { Fugaz_One } from 'next/font/google';
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });


export default function Button(props) {
  const { text, dark, full, clickHandler } = props 
  return (
      <button 
          onClick={clickHandler} 
          className={
              'rounded-full overflow-hidden border-2 duration-200 border-solid border-teal-600 ' +
              (dark 
                  ? 'text-black  border-teal-600 hover:bg-teal-500 hover:bg-opacity-80' 
                  : 'text-green  border-teal-600 hover:bg-teal-500 hover:bg-opacity-80') +
              (full ? ' grid place-items-center w-full ' : ' ')
          }
      >
          <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fugaz.className}>
              {text}
          </p>
      </button>
  )
}

