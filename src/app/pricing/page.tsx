'use client'
import React, { useRef, useState } from 'react'
import {motion, useMotionValueEvent, useScroll} from 'framer-motion'
import { useRouter } from 'next/navigation'
import Footer from '@/components/footer';
function Page() {
  const router = useRouter();
  const ref = useRef(null);
  const [isPlan1,setIsPlan1] = useState(true);
   const [isPlan2,setIsPlan2] = useState(false);
    const [isPlan3,setIsPlan3] = useState(false);
    const [IsMascot,setIsMascot] = useState(false);
  function handleCurrPlan(e:number){
    if(e === 1){
     setIsPlan1(true);
     setIsPlan2(false);
     setIsPlan3(false);
    }
    if(e === 2){
      setIsPlan2(true);
      setIsPlan1(false);
      setIsPlan3(false);
    }
    if(e === 3){
      setIsPlan3(true);
      setIsPlan2(false);
      setIsPlan1(false);
    }
  }

   const {scrollYProgress} = useScroll({
    target:ref,
    offset:['start start','end start']
   })

  useMotionValueEvent(scrollYProgress,'change',e => {
    if(e >= 0.3) setIsMascot(true);
    if(e <= 0.3) setIsMascot(false);
  });

  return (
    <div ref={ref} className={` h-screen w-full bg-zinc-950`}>
     {/* navbar */}
<div 
style={{zIndex:999999999999,}}
className='fixed flex top-0 justify-center items-center w-full'>
    <motion.div
   initial={{y:-100}}
   animate={{y:0}}
   transition={{duration:1,delay:0.5}}
  // initial={{opacity:0,filter:'blur(10px)'}}
  // animate={{opacity:1,filter:'blur(0px)'}}
  // transition={{duration:1,delay:7}}
  style={{background: 'rgba(15, 20, 20, 0.45)',   
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex:999999999999,
        }}
  className={`mt-5 w-fit bg-opacity-65 z-[9999999999] rounded-lg border-y-[1px]   border-gray-400 border-opacity-10`}>
    <div className='flex  h-full w-full text-white px-[1rem] py-2 '>
    <div className='flex gap-[51vw]  justify-between items-center w-full h-10'>
    <div className="h-full w-[13rem] flex justify-center overflow-hidden">
      {!IsMascot && <img src="/codemateLogo.svg" alt="" />}
     {IsMascot && <motion.div initial={{opacity:0,filter:'blur(20px)',x:50}} animate={{opacity:1,filter:'blur(0px)',x:-80}} transition={{duration:0.5}}>
<svg width="50" height="40" viewBox="0 0 153 150" fill="none" xmlns="http://www.w3.org/2000/svg">

  <path d="M131.78 150H39.4727L60.2412 110.845H152.55L131.78 150ZM39.4727 39.0674V150L0.242188 125.04V14.1074L39.4727 39.0674ZM131.78 39.1553H39.4727L60.2412 0H152.55L131.78 39.1553Z" 
    fill="url(#paint0_linear_2014_66)"/>

<motion.svg
  animate={{ translateX: [0, 0,15,15,15,15, 0], translateY: [0,12,12,-10,-10,0, 0] }}
  transition={{ duration: 7, repeat: Infinity }}
>
  <motion.circle cx="71.7422" cy="75" r="11" fill="white"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity,repeatDelay:2 }}
  />
  <motion.circle cx="111.742" cy="75" r="11" fill="white"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity,repeatDelay:2 }}
  />
</motion.svg>

  <defs>
    <linearGradient id="paint0_linear_2014_66" x1="0.580642" y1="0" x2="183.357" y2="82.4837" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00BFFF"/>
      <stop offset="1" stop-color="#1E90FF"/>
    </linearGradient>
  </defs>
</svg>


      </motion.div>}
    
    </div>
    <div className={`flex gap-3 text-md  justify-center items-center cursor-pointer text-right `}>
       <motion.h1 whileHover={{opacity:1}} className='flex text-center justify-center items-center opacity-65'>Products</motion.h1>
       <motion.h1 whileHover={{opacity:1}} className='opacity-65'>Features</motion.h1>
       <motion.h1 whileHover={{opacity:1}} onClick={()=>{router.push('pricing')}} className='opacity-65'>Pricing</motion.h1>
       <button className={` px-2 py-1  bg-[#FFFFFF] text-black  rounded-sm font-semibold opacity-85`}>Get Started</button>
    </div>


    </div>
     {/* <h1 className=' p-2 bg-[#1a1a1a] border border-opacity-15 bg-opacity-25 rounded-md flex justify-center items-center'>Book a Demo</h1> */}
    </div>
    </motion.div>
</div>
     {/* navbar */}
      <div className='flex flex-col'>
        <h1 className='text-5xl text-center pt-24 pb-1 font-bold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent '>Let's <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent text-6xl'>Upgrade</span> your vision</h1>
        <p className='text-center text-xl mt-1 opacity-60'>Choose a plan which feels right for you.</p>
      </div>
        
       <div className='flex justify-center  mt-10 mb-10'>
        <div className='relative border-[3px] border-zinc-500 text-xl px-5 py-2 rounded-full flex gap-5  items-center'>
        <motion.div initial={{x:-5.5,width:'6rem',color:'black'}} animate={ isPlan1? {x:-5.5,width:'6rem'} : isPlan2? {x:92,width:'5rem'} : {x:176,width:'7rem'} } transition={{duration:0.5}} className='absolute h-9  rounded-full bg-gradient-to-b from-[#00BFFF] to-[#1E90FF]'/>  
        <h1 onClick={()=> handleCurrPlan(1)} className={`${isPlan1? 'text-black font-semibold' : 'text-white'} z-20 text-black cursor-pointer`}>Monthly</h1>
        <h1 onClick={()=> handleCurrPlan(2)} className={`${isPlan2? 'text-black font-semibold' : 'text-white'} z-20 text-black cursor-pointer`}>Yearly</h1>
        <h1 onClick={()=> handleCurrPlan(3)} className={`${isPlan3? 'text-black font-semibold' : 'text-white'} z-20 text-black cursor-pointer`}>One-time</h1>
        </div>
       </div>

       <div className='flex justify-center gap-10 mt-4 mb-20'>
        <div className='h-[30rem] w-[20rem] bg-white'></div>
        <div className='h-[30rem] w-[20rem] bg-white'></div>
        <div className='h-[30rem] w-[20rem] bg-white'></div>  
      </div>  

        <Footer/>

    </div>
  )
}

export default Page