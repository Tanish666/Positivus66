'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Marquee } from './ui/marquee'


export default function HeroMarquee() {
    const reviews = [
        {
          name: "Jack",
          username: "@jack",
          body: "I've never seen anything like this before. It's amazing. I love it.",
          img: "/mr1.mp4",
        },
        {
          name: "Jill",
          username: "@jill",
          body: "I don't know what to say. I'm speechless. This is amazing.",
          img:"/mr2.mp4",
        },
        {
          name: "John",
          username: "@john",
          body: "I'm at a loss for words. This is amazing. I love it.",
          img: "/mr3.mp4",
        },
        {
          name: "John",
          username: "@john",
          body: "I'm at a loss for words. This is amazing. I love it.",
          img: "/mr4.mp4",
        },
      ]

      const firstRow = reviews.slice(0, reviews.length / 2)
      const secondRow = reviews.slice(reviews.length / 2)
  return (
    <div className='text-black relative flex h-[700px]  flex-row items-center justify-center overflow-hidden gap-5'>      
    <Marquee pauseOnHover vertical className="[--duration:20s]">
    {firstRow.map((review,idx) => (
      <ReviewCard key={idx} {...review} />
    ))}
  </Marquee>
  <Marquee reverse pauseOnHover vertical className="[--duration:20s] mt-[9rem]">
    {secondRow.map((review,idx) => (
      <ReviewCard key={idx} {...review} />
    ))}
  </Marquee>
</div>
  )
}

export const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string
    name: string
    username: string
    body: string
  }) => {
    return (
      <figure
        className={cn(
          "relative cursor-pointer flex justify-center overflow-hidden rounded-[2rem] border h-[43vh] w-[14vw] mt-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
         
        )}
      >
        <video src={img}  className='h-full w-full object-cover'></video>

        <div className='absolute flex  items-center w-[90%] rounded-[1.9rem] bg-black bottom-[0.80rem] text-white  px-2 py-[0.7rem]  gap-5 overflow-hidden'>  <h1 className='text-[0.8rem] opacity-70 text-nowrap ml-3'>Ask Me A Question</h1>
        <div className='relative flex justify-center items-center'>
  <span className='absolute p-1 ml-12 bg-white rounded-full z-10'>
    <svg height={24} width={24} viewBox="0 0 24 24" fill="none" className='rotate-180 opacity-65' xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 18L18 6M18 6H10M18 6V14"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
  </div>
  </div>
      </figure>
    )
  }
