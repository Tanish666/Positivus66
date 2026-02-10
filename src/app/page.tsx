'use client'
import Lenis from 'lenis'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import HeroImg from '@/components/heroImg'
import HeroMarquee from '@/components/heroMarquee'
import PositivusFooter from '@/components/ui/footer2'
import { Marquee } from '@/components/ui/marquee'
import Process from '@/components/process'
import TestimonialCarousel from '@/components/TestimonialCarousel'

function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const marqueeContent = [
    { src: 'cp1.svg' },
    { src: 'cp2.svg' },
    { src: 'cp3.svg' },
    { src: 'cp4.svg' },
    { src: 'cp5.svg' },
    { src: 'cp6.svg' },
  ]

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2
    });
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);
  }, [])
  return (
    <>
      <div className='w-full px-6 md:px-20 space-y-10 overflow-x-hidden'>
        {/* navbar */}
        {/* navbar */}
        <nav className='h-20 w-full bg-white flex items-center justify-between md:mt-7 mt-2 relative z-50'>
          <div className='flex items-center gap-2'>
            <Image src="/logo.svg" width={150} height={150} alt="Positivus" className="md:w-[200px]" />
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-10 font-semibold'>
            <a href='#' className='text-lg hover:text-lime-500 transition-colors'>About us</a>
            <a href='#' className='text-lg hover:text-lime-500 transition-colors'>Services</a>
            <a href='#' className='text-lg hover:text-lime-500 transition-colors'>Use Cases</a>
            <a href='#' className='text-lg hover:text-lime-500 transition-colors'>Pricing</a>
            <a href='#' className='text-lg hover:text-lime-500 transition-colors'>Blog</a>
            <button className='border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300'>Request a quote</button>
          </div>

          {/* Mobile Menu Button */}
          <button className='md:hidden p-2 text-black' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='md:hidden absolute top-20 left-0 w-full bg-white shadow-xl rounded-b-2xl border-t border-gray-100 overflow-hidden'
              >
                <div className='flex flex-col p-6 space-y-4 font-semibold text-center'>
                  <a href='#' className='text-lg py-2 hover:bg-gray-50 rounded-lg'>About us</a>
                  <a href='#' className='text-lg py-2 hover:bg-gray-50 rounded-lg'>Services</a>
                  <a href='#' className='text-lg py-2 hover:bg-gray-50 rounded-lg'>Use Cases</a>
                  <a href='#' className='text-lg py-2 hover:bg-gray-50 rounded-lg'>Pricing</a>
                  <a href='#' className='text-lg py-2 hover:bg-gray-50 rounded-lg'>Blog</a>
                  <button className='border border-black text-black px-4 py-3 rounded-lg w-full mt-2 hover:bg-black hover:text-white transition-colors'>Request a quote</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0'>
          <div className='w-full md:w-[50%] space-y-6 text-center md:text-left'>
            <h1 className='text-4xl md:text-6xl font-bold w-full md:w-[35vw] leading-tight'>Navigating the digital landscape for success</h1>
            <div className='w-full flex justify-center md:hidden'>
              <HeroImg />
            </div>
            <p className='text-lg w-full md:w-[30vw] mx-auto md:mx-0'>Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p>
            <button className='border border-black px-6 py-3 rounded-lg bg-[#191A23] text-[#FFFFFF] hover:bg-white hover:text-black transition-all duration-300 w-full md:w-fit'>Book a consultation</button>
          </div>
          <div className='hidden md:flex w-full  justify-end'>
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


        <div className='flex flex-col md:flex-row items-center gap-5 mt-10 text-center md:text-left'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Services</h1>
          <p className='text-lg w-full md:w-[45vw] leading-[20px]'>At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:</p>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-10 mt-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-5 h-fit md:h-[50vh] w-full md:flex-1 py-10 px-10 bg-[#F3F3F3] rounded-[3rem] border border-black border-b-[5px]'>
            <div className='flex flex-col justify-between h-full w-full'>
              <div className='mb-10 md:mb-0'>
                <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-t-lg font-bold rounded-r-lg w-fit'>Search engine</h1>
                <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-b-lg font-bold w-fit'>optimization</h1>
              </div>
              <div className='flex items-end justify-between w-full'>
                <div className='flex gap-2 items-center text-lg'>
                  <Image src="/link.svg" width={40} height={40} alt="" />
                  <h1 className='hidden md:block'>Learn more</h1>
                </div>
                <div className='md:hidden'>
                  <Image src="/illu.svg" width={160} height={160} alt="" />
                </div>
              </div>
            </div>

            <div className='hidden md:flex justify-end'>
              <Image src="/illu.svg" width={400} height={400} alt="" />
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between gap-5 h-fit md:h-[50vh] w-full md:flex-1 py-10 px-10 rounded-[3rem] border border-black border-b-[5px] bg-[#B9FF66]'>
            <div className='flex flex-col justify-between h-full w-full'>
              <div className='mb-10 md:mb-0'>
                <h1 className='text-3xl text-black px-2 py-1 rounded-t-lg font-bold rounded-r-lg w-fit bg-[#FFFFFF]'>Pay-per-click</h1>
                <h1 className='text-3xl text-black px-2 py-1 rounded-b-lg font-bold w-fit bg-[#FFFFFF]'>advertising</h1>
              </div>
              <div className='flex items-end justify-between w-full'>
                <div className='flex gap-2 items-center text-lg'>
                  <Image src="/link.svg" width={40} height={40} alt="" />
                  <h1 className='hidden md:block'>Learn more</h1>
                </div>
                <div className='md:hidden'>
                  <Image src="/illu2.svg" width={160} height={160} alt="" />
                </div>
              </div>
            </div>

            <div className='hidden md:flex justify-end'>
              <Image src="/illu2.svg" width={400} height={400} alt="" />
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-5 mt-10 text-center md:text-left'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Our Working Process</h1>
          <p className='text-lg w-full md:w-[20vw] leading-[20px]'>Step-by-Step Guide to Achieving Your Business Goals</p>
        </div>


        <Process />

        <div className='flex flex-col md:flex-row items-center gap-5 mt-10 text-center md:text-left'>
          <h1 className='text-3xl text-black bg-[#B9FF66] px-2 py-1 rounded-lg font-bold'>Testimonials</h1>
          <p className='text-lg w-full md:w-[35vw] leading-[20px]'>Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services</p>
        </div>

        <TestimonialCarousel />
        <PositivusFooter />
      </div>
    </>
  )
}

export default page

