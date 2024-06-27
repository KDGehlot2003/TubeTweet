import React from 'react'
import { Button } from './ui/button'

const Category = () => {
    const ytCategories = ['All', 'Music', 'Gaming', "Live", "Movies", "News", "Sports", "Trending", "Learning", "Fashion", "Spotlight", "360", "Browse channels", "Browse channels"]
  return (
    <div className="carousel rounded-box">
  <div className="carousel-item m-3 p-2 rounded-lg ">
    {ytCategories.map((item, index) => (
        <div key={index} className="flex items-center justify-center ml-3 rounded-lg ">
            <Button className='bg-slate-800 text-white hover:text-black'>{item}</Button>
        </div>
        ))}
  </div>
</div>
  )
}

export default Category