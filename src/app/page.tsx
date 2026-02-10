import React from 'react'
import Image from 'next/image'
import HeroImg from '@/components/heroImg'
import HeroMarquee from '@/components/heroMarquee'
import { Marquee } from '@/components/ui/marquee'
import Process from '@/components/process'
import TestimonialCarousel from '@/components/TestimonialCarousel'

function page() {
  const marqueeContent = [
    { src: 'cp1.svg' },
    { src: 'cp2.svg' },
    { src: 'cp3.svg' },
    { src: 'cp4.svg' },
    { src: 'cp5.svg' },
    { src: 'cp6.svg' },
  ]
  return (
    <>
      <div className=' w-full px-20 space-y-10'>
        {/* navbar */}
        <nav className='h-20 w-full bg-white flex items-center justify-between mt-7'>
          <div className='flex items-center gap-2'>
            <Image src="/logo.svg" width={200} height={200} alt="" />
          </div>
          <div className='flex items-center gap-10 font-semibold'>
            <a href='#' className='text-lg'>About us</a>
            <a href='#' className='text-lg'>Services</a>
            <a href='#' className='text-lg'>Use Cases</a>
            <a href='#' className='text-lg'>Pricing</a>
            <a href='#' className='text-lg'>Blog</a>
            <button className='border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300'>Request a quote</button>
          </div>
        </nav>

        <div className='w-full flex items-center justify-between'>
          <div className='w-[50%] space-y-5'>
            <h1 className='text-6xl font-bold w-[35vw]'>Navigating the digital landscape for success</h1>
            <p className='text-lg w-[30vw]'>Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p>
            <button className='border border-black  px-6 py-3 rounded-lg bg-[#191A23] text-[#FFFFFF] hover:bg-white hover:text-black transition-all duration-300'>Book a consultation</button>
          </div>
          <div className=''>
            <HeroImg />
          </div>
        </div>

        <Marquee className='flex gap-10'>
          {marqueeContent.map((item, index) => (
            <div key={index} className='flex'>
              <Image src={item.src} width={150} height={150} alt="" className='mx-5 brightness-0' />
            </div>
          ))}
        </Marquee>


        <div className='flex items-center gap-5 mt-10'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Services</h1>
          <p className='text-lg w-[45vw] leading-[20px]'>At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:</p>
        </div>

        <div className='flex items-center justify-between gap-10 mt-10'>
          <div className='flex items-center justify-between  gap-5 h-[50vh] w-full py-10 px-10 bg-[#F3F3F3] w-fit rounded-[3rem] border border-black border-b-[5px]'>
            <div className='flex flex-col justify-between h-full '>
              <div>
                <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-t-lg font-bold rounded-r-lg w-fit'>Search engine</h1>
                <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-b-lg font-bold w-fit'>optimization</h1>
              </div>
              <div className='flex gap-2 items-center text-lg'>
                <Image src="/icon.svg" width={40} height={40} alt="" />
                <h1>Learn more</h1>
              </div>
            </div>

            <Image src="/illu.svg" width={250} height={250} alt="" />
          </div>

          <div className='flex items-center justify-between  gap-5 h-[50vh] w-full py-10 px-10  w-fit rounded-[3rem] border border-black border-b-[5px] bg-[#B9FF66]'>
            <div className='flex flex-col justify-between h-full'>
              <div>
                <h1 className='text-3xl text-black px-2 py-1 rounded-t-lg font-bold rounded-r-lg w-fit bg-[#FFFFFF]'>Pay-per-click</h1>
                <h1 className='text-3xl text-black px-2 py-1 rounded-b-lg font-bold w-fit bg-[#FFFFFF]'>advertising</h1>
              </div>
              <div className='flex gap-2 items-center text-lg'>
                <Image src="/icon.svg" width={40} height={40} alt="" />
                <h1>Learn more</h1>
              </div>
            </div>

            <Image src="/illu2.svg" width={250} height={250} alt="" />
          </div>
        </div>

        <div className='flex items-center gap-5 mt-10'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Our Working Process</h1>
          <p className='text-lg w-[20vw] leading-[20px]'>Step-by-Step Guide to Achieving Your Business Goals</p>
        </div>


        <Process />

        <div className='flex items-center gap-5 mt-10'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Testimonials</h1>
          <p className='text-lg w-[35vw] leading-[20px]'>Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services</p>
        </div>

        <TestimonialCarousel />
      </div>
    </>
  )
}

export default page

