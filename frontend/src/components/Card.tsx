import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from './ui/button'





const Card = () => {

    // Function to generate 50 sets of fake data
    const generateFakeData = () => {
        const fakeData = [];
        for (let i = 1; i <= 50; i++) {
        const video = {
            thumbnail: `https://i.ytimg.com/vi/NjoqMPsIioY/hqdefault.jpg?${i}`,
            avatar: `https://github.com/avatar${i}.png`,
            initials: `U${i}`,
            title: `I Played GTA ${i*1} on Android Smartphone ${i/5}`,
            buttonImage: '/dots.png', // Replace with actual button image source
        };
        fakeData.push(video);
        }
        return fakeData;
    };
    
    // Usage in your component
    const fakeVideos = generateFakeData();

  return (
<div className=' grid grid-cols-4 gap-4 px-10'>
{/* <div className="card w-75 h-42 shadow-xl ">
    <figure>
        <img
        src="https://i.ytimg.com/vi/NjoqMPsIioY/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_ID0oLTAP&rs=AOn4CLAoYYYXhWJsEodjvwMG95o-TnMf5g"
        className='w-76 h-43 rounded-lg'
        alt="Shoes"
        />
    </figure>
    <div className='flex pt-2 justify-evenly'>
        <Avatar  className='w-9 h-9'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar> 
        <h1 className=' text-md font-sans ml-3 font-semibold'>I Played GTA 5 on Android Smartphone ! *High Settings*</h1>
        <Button className='bg-transparent' style={{ filter: 'invert(1)' }}><img src='/dots.png' className=' w-12 h-6' /></Button>
    </div>
    </div> */}
      {fakeVideos.map((video:any, index:number) => (
        <div key={index} className="card w-75 h-42 shadow-xl rounded p-0 ">
          <figure>
            <img
              src={video.thumbnail}
              className='w-76 h-43 rounded-3xl'
              alt="Thumbnail"
            />
          </figure>
          <div className='flex justify-around'>
            <Avatar className='w-9 h-9'>
              <img src={video.avatar} alt="Avatar" />
              <span>{video.initials}</span> {/* AvatarFallback or initials */}
            </Avatar>
            <h1 className='text-md font-sans ml-3 font-semibold'>{video.title}</h1>
            <Button className='bg-transparent' style={{ filter: 'invert(1)' }}><img src='/dots.png' className=' w-6 h-6' /></Button>
          </div>
          </div>
      ))}
</div>
  )
}

export default Card