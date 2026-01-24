'use client'
import React, { useRef, useState } from 'react'
import { IconZoom } from '@tabler/icons-react';
import {motion, useScroll, useTransform} from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { TerminalDemo } from '@/components/terminal';
import Footer from '@/components/footer';
function Page() {

  const [firstAni,setFirstAni] = useState(false);
  const [secondAni,setSecondAni] = useState(false);
  const bentoRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target:bentoRef,
    offset:['start end','end start']
  });
  const rotateCircle = useTransform(scrollYProgress,[0,1],[0,180]);
  const scaleCircle = useTransform(scrollYProgress,[0,1],[0.5,1.3]);
  const cards = Array(4).fill(null);
  useEffect(()=>{
    const lenis = new Lenis({
      duration:2
    });
    function raf(time: any){
     lenis.raf(time) 
     requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);

    setTimeout(()=>{
      setFirstAni(true)
    },2000);

    setTimeout(()=>{
      setSecondAni(true)
    },7000);


   },[]); 

  return (
    <div>
      {/* hero section */}
      <div className='h-screen w-full px-24 py-5 flex flex-col gap-28'>
      {/* navbar */}
      <motion.div 
      initial={{y:-50}}
      animate={{y:0}}
      transition={{duration:1,delay:3}}
      className='flex justify-between items-center'>
       <img src="logo.svg" alt="" />
       <div className='flex gap-5 justify-center items-center'>
        <h1>Downloads</h1>
        <h1>Releases</h1>
        <div className='relative flex justify-center items-center'>
        <input type="text" name="" id="" placeholder='Search...' className='bg-[#0B0B0A] py-2 px-1 border border-gray-700 rounded-sm pl-4 text-xs'/>
        <IconZoom stroke={2} className='absolute right-3 opacity-60'size={15}/>
        </div>
        <h1>Docs</h1>
        <h1>Snippet Manager</h1>
       </div>
      </motion.div>
      {/* navbar */}

      <div className='relative flex flex-col justify-center items-center gap-10'>
        <motion.img 
        initial={{y:150,opacity:0}}
        animate={firstAni? {y:0,opacity:1} : {opacity:1}}
        transition={{duration:2}}
        src="heroLogo.svg" alt="" /> 
        <motion.p 
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:4}}
        className='text-center text-xl w-[60vw]'>A powerful command-line interface tool for developers, designed to streamline your workflow and boost your productivity</motion.p> 
        
        <div className='flex gap-5 z-10'>
          <motion.button 
          initial={{opacity:0,filter:'blur(20px)'}}
          animate={{opacity:1,filter:'blur(0px)'}}
          transition={{duration:1,delay:4.5}}
          className='bg-[#FA6C25] text-gray-100 py-3 px-5 rounded-lg font-semibold'>Download for Linux</motion.button>
          <motion.button 
          initial={{opacity:0,filter:'blur(20px)'}}
          animate={{opacity:1,filter:'blur(0px)'}}
          transition={{duration:1,delay:5}}
          className='bg-[#4E230D] border-2 border-[#FA6C25] text-gray-200 py-3 px-5 rounded-lg font-semibold'>Download for Windows</motion.button>
        </div>
      </div>



       <motion.img 
       initial={{opacity:0,y:50,filter: "brightness()"}} 
       animate={{opacity:1,y:-10,filter: "brightness(1.3)"}}
       transition={{duration:2,delay:4,}}
       src="glow.svg" alt="" className='absolute object-cover top-[7rem] right-0 size-[130%]' />
        
       <div className='absolute h-full w-full flex justify-center items-center left-0'>
       <motion.div initial={{opacity:0}} whileInView={secondAni? {opacity:[0,0.2]} : {}} transition={{duration:2,repeat:Infinity,repeatType:'mirror'}}  className='h-[60vh] w-full blur-3xl   bg-[#FA6C25]  left-0 opacity-20 rounded-full'/>
       </div>

      </div>

       {/* section 2 */}
      <div className='relative  z-10 flex flex-col items-center px-52 gap-3'>
      <div className='flex bg-[#000000]  gap-14 pt justify-center  py-10 px-20 w-fit z-10 rounded-xl'>
         <div className='flex flex-col gap-6'>
          <h1 className='font-bold text-3xl'>About ScaffoldGen CLI</h1>
          <p className='w-[30vw] text-[#969696]'>Our CLI tool is a powerful and versatile command-line interface that helps developers streamline their workflow and boost their productivity. With a wide range of features and customization options, it’s the perfect tool for any developer looking to optimize their development process.</p>
          <button className='bg-[#FA6C25] text-gray-100 py-3 px-5 rounded-lg font-semibold w-fit'>Learn More</button>
         </div>
         
           <div className='relative w-[35vw] h-[50vh] bg-gradient-to-br from-[#1F1F1F] to-[#000000] rounded-lg flex justify-end items-end overflow-hidden'>
            {/* <div className='w-[90%] h-[80%] bg-[#000000] rounded-tl-xl overflow-hidden'>
              <div className='h-[10%] w-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center pl-5 justify-between pr-8'>
                <div className='flex gap-2'>
                  <div className='size-[1.1vw] bg-[#ED6A5E] rounded-full'/>
                  <div className='size-[1.1vw] bg-[#F4BF4F] rounded-full'/>
                  <div className='size-[1.1vw] bg-[#61C554] rounded-full'/>
                </div>
                <motion.h1 
                
                className='font-bold text-[#A3A5A8]'>scaffoldgen</motion.h1>
              </div>

              <div className='flex flex-col text-mono text-[#D1CD74] font-semibold pl-5 pt-4 gap-2'>
              <div className='flex gap-1'><span className='text-[#4EACF9]'><TypingAnimation>~</TypingAnimation></span> <span className='text-[#80D440]'>&gt;</span> <span className=''>cd</span> <span className='text-gray-100 pl-2'>web_development</span></div>
              <div className='flex gap-1'><span className='text-[#4EACF9]'>~</span> <span className='text-[#80D440]'>&gt;</span> <span className=''>cd</span> <span className='text-nowrap'>scaffoldgen new **my-awesome-app** --template next-ts --style tailwind</span></div>
              <div className='flex gap-1'><span className='text-[#4EACF9]'>~</span> <span className='text-[#80D440]'>&gt;</span> <span className=''>cd</span> <span className='text-nowrap'>scaffoldgen generate **component** UserProfile --type rfc --path src/components</span></div>
              <div className='flex gap-1'><span className='text-[#4EACF9]'>~</span> <span className='text-[#80D440]'>&gt;</span> <span className=''>cd</span> <span className='text-nowrap'>scaffoldgen create **route** auth --handler **login,register** --method post</span></div>
              <div className='flex gap-1'><span className='text-[#4EACF9]'>~</span> <span className='text-[#80D440]'>&gt;</span> <span className=''>cd</span> <span className='text-nowrap '>scaffoldgen config set **default-lang** python</span></div>
              </div>
            </div>  */}
            <TerminalDemo/>
           </div>

        </div>

        <div className='flex gap-2'>
         <div className='flex flex-col gap-3'>
          <h1 className='text-2xl font-bold'>Latest Download</h1>
          <p className='text-[#969696]'>The latest version of our CLI tool is now available for download on Linux. Get the latest features and improvements by downloading the latest release.</p>
          <motion.button 
          className='bg-[#FA6C25] text-gray-100 py-3 px-5 rounded-lg font-semibold w-fit'>Download for Linux</motion.button>
         </div>

         <div className='flex flex-col gap-3'>
          <h1 className='text-2xl font-bold'>Latest Release</h1>
          <p className='text-[#969696]'>Check out the latest release of our CLI tool, packed with new features and improvements. See what s new and get the latest version.</p>
          <motion.button 
          className='bg-[#FA6C25] text-gray-100 py-3 px-5 rounded-lg w-fit font-semibold'>View Latest Release</motion.button>
         </div>
        </div>

        {/* bento */}
        <div 
        ref={bentoRef}
        className='flex flex-col justify-center items-center mt-28'>
<div className=''>
  <div className='grid grid-cols-1 md:grid-cols-2 '>
    {/* Card 1 */}
    <div className='relative flex flex-col justify-center items-center bg-gradient-to-tl from-[#FA6C25]/10 to-[#141110]/10 px-20 py-12 rounded-lg min-h-[400px]'>
      <img src="bitcoin.svg" alt="" className='h-16 w-16 object-cover mb-6' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>multi-Template & Multi-Language Support</h1>
        <p className='text-sm text-center text-gray-400'>Enables developers to work across different technology stacks with a unified command interface.</p>
      </div>
      <motion.div 
        initial={{opacity:0.5}}
        whileInView={{opacity:[1,0]}}
        transition={{duration:2,repeat:Infinity,repeatType:'mirror'}}
        className='absolute right-0 top-0 bottom-0'
      > 
        <div className="relative h-full w-[2px]">
          <div className="absolute inset-0 bg-orange-500/70 blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        </div>
      </motion.div>
    </div>

    {/* Card 2 */}
    <div className='flex flex-col justify-center items-center bg-gradient-to-br from-[#0B0B0A]/50 to-[#141110]/10 px-20 py-12 rounded-lg min-h-[400px]'>
      <img src="bento2.svg" alt="" className='h-16 w-16 object-cover mb-6' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>Interactive Configuration & Prompting</h1>
        <p className='text-sm text-center text-gray-400'>Provides a user-friendly experience and minimizes errors from manual configuration.</p>
      </div>
    </div>
  </div>

  <div className='grid grid-cols-1 md:grid-cols-2 '>
    {/* Card 3 */}
    <div className='flex flex-col justify-center items-center bg-gradient-to-br from-[#0B0B0A]/50 to-[#141110]/10 px-20 py-12 rounded-lg min-h-[400px]'>
      <img src="bento3.svg" alt="" className='h-16 w-16 object-cover mb-6' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>Component & Module Generation</h1>
        <p className='text-sm text-center text-gray-400'>Significantly speeds up repetitive coding tasks and enforces best practices.</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className='relative flex flex-col justify-center items-center bg-gradient-to-tr from-[#FA6C25]/10 to-[#141110]/10 px-20 py-12 rounded-lg min-h-[400px]'>
      <img src="bento4.svg" alt="" className='h-16 w-16 object-cover mb-6' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>Extensible Post-Processing Pipeline</h1>
        <p className='text-sm text-center text-gray-400'>Delivers a fully functional, ready-to-code project immediately after generation.</p>
      </div>
      <motion.div 
        initial={{opacity:0.5}}
        whileInView={{opacity:[1,0]}}
        transition={{duration:2,repeat:Infinity,repeatType:'mirror'}}
        className='absolute left-0 top-0 bottom-0'
      > 
        <div className="relative h-full w-[2px]">
          <div className="absolute inset-0 bg-orange-500/70 blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        </div>
      </motion.div>
    </div>
  </div>
</div>
          <motion.img style={{rotate:rotateCircle,scale:scaleCircle}} src="s.svg" alt="" className='absolute' />
        </div>
        {/* bento */}


        {/* contributors */}
        <div className='mt-28'>
  <h1 className='text-2xl text-center font-bold mb-5'>Major Contributors</h1>
  <div className='flex gap-6'>
    {cards.map((_, index) => (
      <div
        key={index}
        className="size-[17vw] bg-gradient-to-l from-[#FA6C25]/10 to-[#141110]/40 px-5 py-5 flex flex-col justify-end cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(250,108,37,0.3)] hover:from-[#FA6C25]/20 hover:to-[#141110]/50 rounded-xl"
      >
        <h1 className="font-bold text-center">Name</h1>
        <h1 className="text-[#969696] text-center text-nowrap">Core Contributor</h1>
      </div>
    ))} 
  </div>
        </div>
        {/* contributors */}


        {/* solutions */}
        <div className='w-full mt-28'>
          <h1 className='text-sm'>Our Solution</h1>
          <h1 className='text-3xl font-bold'>Global Users</h1>
          <div className='relative h-[60vh] w-full bg-[#2B2623] mt-5 rounded-xl flex gap-2 justify-center items-end overflow-hidden'>
          <motion.img
          initial={{opacity:0,filter:'blur(20px)'}}
          whileInView={{opacity:1,filter:'blur(0px)'}}
          viewport={{once:true}} 
          transition={{delay:1.5,duration:1}}
          src="4.svg" alt=""  className='size-[60%] absolute -left-[17.5rem] -bottom-10'/>
          <motion.img 
          initial={{opacity:0,filter:'blur(20px)'}}
          whileInView={{opacity:1,filter:'blur(0px)'}}
          viewport={{once:true,amount:0.1}}
          transition={{delay:2,duration:1}}
          src="4.svg" alt=""  className='size-[60%] absolute -left-10 z-10'/>
           

           
           <motion.img 
           initial={{y:300}}
           whileInView={{y:0,}}
           viewport={{once:true}}
           transition={{duration:1}}

           src="1.svg" alt=""  className='size-[90%] z-10'/>
           
          
           <motion.img 
          initial={{opacity:0,filter:'blur(20px)'}}
          whileInView={{opacity:1,filter:'blur(0px)'}}
          viewport={{once:true,amount:0.1}}
          transition={{delay:3,duration:1}}
           src="4.svg" alt=""  className='size-[60%] absolute -right-[17.5rem] -bottom-10'/>
           <motion.img 
          initial={{opacity:0,filter:'blur(20px)'}}
          whileInView={{opacity:1,filter:'blur(0px)'}}
          viewport={{once:true,amount:0.1}}
          transition={{delay:2.5,duration:1}}
           src="4.svg" alt=""  className='size-[60%] absolute -right-10 '/>


          {/* matrics */}
          <motion.img 
          initial={{scale:0.8,y:-100 ,opacity:0}}
          whileInView={{y:0,opacity:1}}
          viewport={{once:true,amount:0.1}}
          transition={{duration:1,delay:3.5}}
          src="10k.svg" alt=""  className='absolute top-2 left-52 z-20'/>

          <motion.img 
          initial={{scale:0.8,y:100,opacity:0}}
          whileInView={{y:0,opacity:1}}
          viewport={{once:true,amount:0.1}}
          transition={{duration:1,delay:3.5}}
          src="25k.svg" alt=""  className='absolute -bottom-10 right-52 z-20'/>

          </div>
        </div>

        <div className='mt-28 flex flex-col justify-center items-center gap-5'>
        <h1 className='text-xl font-bold text-center'>Organizations</h1>
        <div className='relative flex flex-col justify-end items-center py-2 bg-gradient-to-r from-[#0B0B0A]  rounded-xl  to-[#371D0F] h-48 w-[23rem]'>

                <h1 className='font-bold text-center'>Resourcio Community</h1>

             </div>
        </div>
        <div className=''>
        <FAQ/>
        </div>
        {/* <motion.img 
      //  initial={{opacity:0,y:50}} 
      //  animate={{opacity:1,y:-10}}
      //  transition={{duration:2,delay:4}}
       src="glow.svg" alt="" className='absolute object-cover top-[6rem] right-0 size-[130%] rotate-180' /> */}
      </div>
       {/* section 2  */}

       {/* footer */}
       <Footer2/>
    </div>
  )
}

export default Page

function FAQ() {
  const faqs = [
    "What is the ScaffoldGen CLI Tool?",
    "How do I install the ScaffoldGen CLI Tool?",
    "What features does the ScaffoldGen CLI Tool have?",
    "How do I contribute to the ScaffoldGen CLI tool?",
    "Is the ScaffoldGen CLI tool free to use?",
    "Where can I get support?",
  ];
  return (
    <section className="w-full  py-5 pb-16">
      <h1 className="text-center text-3xl font-bold mb-10">FAQ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {faqs.map((question, index) => (
    <div
      key={index}
      className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#0B0B0A] to-[#371D0F] px-5 py-4 cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(250,108,37,0.25)] hover:from-[#1A1210] hover:to-[#4A2D1F] shadow-lg shadow-zinc-900"
    >
      <h2 className="text-lg font-bold text-white">
        {question}
      </h2>

      <span className="text-white text-lg"><IconChevronDown stroke={2} /></span>
    </div>
  ))}
</div>
    </section>
  );
}

function Footer2() {
  return (
    <footer className="w-full bg-[#0B0B0A] px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <img src="fulllogo.svg" alt="" />
        {/* Logo Section */}
        <div>
          {/* PLACE YOUR LOGO HERE */}
          <div className="h-8 w-40 bg-transparent" />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Downloads</li>
            <li className="hover:text-white cursor-pointer">Releases</li>
            <li className="hover:text-white cursor-pointer">Documentation</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              LinkedIn
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              GitHub
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              Discord
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="max-w-7xl mx-auto mt-12 text-lg text-gray-500">
        © 2024 ScaffoldGen CLI. All rights reserved.
      </div>
    </footer>
  );
}
