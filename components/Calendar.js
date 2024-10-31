'use client'
import { baseRating, gradients } from '@/utils'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props
    const now = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())

    const numericMonth = monthsArr.indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val) { 
        if (numericMonth + val < 0) {
            setSelectedYear(curr => curr - 1)
            setSelectMonth(monthsArr[monthsArr.length - 1])   //updating both selected month and selected year
        } else if (numericMonth + val > 11) {
            setSelectedYear(curr => curr + 1)
            setSelectMonth(monthsArr[0])
        } else {
            setSelectMonth(monthsArr[numericMonth + val])
        }
    }

    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + daysInMonth

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
                <button onClick={() => {
                    handleIncrementMonth(-1)
                }} className='mr-auto text-teal-600 text-lg sm:text-xl duration-200 hover:opacity-60'>
                  <i className="fa fa-chevron-left"></i></button>
                <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + fugaz.className}>
                  {selectedMonth}, {selectedYear}</p>
                <button onClick={() => {
                    handleIncrementMonth(+1)
                }} className='ml-auto text-teal-600 text-lg sm:text-xl duration-200 hover:opacity-60'>
                  <i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
                {[...Array(numRows).keys()].map((row, rowIndex) =>  {
                    return (
                        <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                                let isToday = dayIndex === now.getDate()

                                if (!dayDisplay) {
                                    return (
                                        <div className='bg-white' key={dayOfWeekIndex} />
                                    )
                                }

                                let color = demo ?
                                    gradients.teal[baseRating[dayIndex]] :
                                    dayIndex in data ?
                                        gradients.teal[data[dayIndex]] :
                                        'white'

                                return (
                                    <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? ' border-teal-600' : ' border-teal-200') + (color === 'white' ? ' text-teal-600' : ' text-white')} key={dayOfWeekIndex}>
                                        <p>{dayIndex}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
