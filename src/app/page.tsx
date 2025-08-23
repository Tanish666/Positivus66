'use client'
import React, { useEffect, useState,useRef } from 'react'
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from '@/components/ui/floating-navbar';
import { IconArrowLeft,IconArrowRight,IconArrowBadgeDown } from '@tabler/icons-react';
import {AnimatePresence, motion,useMotionValueEvent,useScroll,useTransform} from 'framer-motion'
import { TextAnimate } from '@/components/ui/textAnimate'
import MagicBento from '@/components/ui/magicBento';
import Lenis from 'lenis'
import { Montserrat } from 'next/font/google';
import CodeEditor from '@/components/motion-components/editor'
import { LoaderFive, LoaderOne } from '@/components/ui/loader';
import { TypingAnimation,AnimatedSpan } from '@/components/ui/terminal';
import { ProgressiveBlur } from '@/components/ui/blurBT';
import { X } from 'lucide-react';
import { Safari } from '@/components/mockups/safari';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add what you need
  variable: '--font-montserrat', // Optional, for CSS variable usage
});

const montserrat2 = Montserrat({
  subsets: ['latin'],
  weight: ['200'], // Add what you need
  variable: '--font-montserrat', // Optional, for CSS variable usage
});


function Page() {
  const brokenComponent = [
  { code: "import React from 'react'", isError: false },
  { code: "", isError: false },
  { code: "type Props = {", isError: false },
  { code: "  name: string", isError: false },
  { code: "}", isError: false },
  { code: "", isError: false },
  { code: "export const ErrorComp: React.FC<Props> = ({ name }) => {", isError: false },
  { code: "  const [count, setCount]: number = useState(0)", isError: true }, // ❌ incorrect type annotation + useState not imported
  { code: "", isError: false },
  { code: "  useEffect(() => {", isError: true }, // ❌ useEffect not imported
  { code: "    console.logg('Name is:', name)", isError: true }, // ❌ typo `logg`
  { code: "  }, [nam])", isError: true }, // ❌ `nam` is not defined
  { code: "", isError: false },
  { code: "  return (", isError: false },
  { code: "    <div>", isError: false },
  { code: "      <h1>Hello, {namee}</h1>", isError: true }, // ❌ `namee` is a typo
  { code: "      <button onClick={() => setCount(cn => cn + 1)}>Click</buttn>", isError: true }, // ❌ `buttn` typo
  { code: "      <p>Count: {countt}</p>", isError: true }, // ❌ `countt` is a typo
  { code: "    </div>", isError: false },
  { code: "  )", isError: true }, // ❌ return not wrapped in fragment or single parent (could error in strict JSX)
  { code: "}", isError: false },
]

const fixedComponent = [
  { code: "import React, { useState, useEffect } from 'react'", isError: false },
  { code: "", isError: false },
  { code: "type Props = {", isError: false },
  { code: "  name: string", isError: false },
  { code: "}", isError: false },
  { code: "", isError: false },
  { code: "export const ErrorComp: React.FC<Props> = ({ name }) => {", isError: false },
  { code: "  const [count, setCount] = useState(0)", isError: true },
  { code: "", isError: false },
  { code: "  useEffect(() => {", isError: true },
  { code: "    console.log('Name is:', name)", isError: true },
  { code: "  }, [name])", isError: true },
  { code: "", isError: false },
  { code: "  return (", isError: false },
  { code: "    <div>", isError: false },
  { code: "      <h1>Hello, {name}</h1>", isError: true },
  { code: "      <button onClick={() => setCount(cn => cn + 1)}>Click</button>", isError: true },
  { code: "      <p>Count: {count}</p>", isError: true },
  { code: "    </div>", isError: false },
  { code: "  )", isError: true },
  { code: "}", isError: false },
];

 const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  const heroRef = useRef(null);
  const [d,setD] = useState(false); 
  const [r,setR] = useState(false);
  const [a,setA] = useState(false);
  const [isP1,setIsP1] = useState(false);
  const [isP2,setIsP2] = useState(false);
  const [isShowProd,setIsShowProd] = useState(true);
  const [isProds , setIsProds] = useState(false);
  const [isFix,setIsFix] = useState(false);
  const [isRef1,setIsRef1] = useState(false);
  const [isRef2,setIsRef2] = useState(false);
  const [isRef3,setIsRef3] = useState(false);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const drawer1Ref = useRef<HTMLDivElement>(null);
  const drawer2Ref = useRef<HTMLDivElement>(null);
  const editor2Ref = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLDivElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);
  const Ref1 = useRef<HTMLDivElement>(null);
  const Ref2 = useRef<HTMLDivElement>(null);
  const Ref3 = useRef<HTMLDivElement>(null);
  const productShowRef = useRef<HTMLDivElement>(null);
  const codeOverlayRef = useRef<HTMLDivElement>(null);
  const [isLoad,setIsLoad] = useState(false);
  const debugBtnRef = useRef<HTMLButtonElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const productRef2 = useRef<HTMLDivElement>(null);
  const productsWrapper = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const title = ["Don't","be","techy","to"];
  const title2 = ["Develop","Softwares"];
  const [isTitle,setIstitle] = useState(false);
    const {scrollYProgress:shadingProgress} = useScroll({
   target:heroRef,
   offset:['end end','end start']
  })
   const shadingHeight = useTransform(shadingProgress,[0,1],[0,1000]);
  
    const {scrollYProgress:p1YProg} = useScroll({
      target:productRef,
      offset:['start start','end start']
    });

    const {scrollYProgress:PShowYProg} = useScroll({
      target:productShowRef,
      offset:['start start','end start']
    });
        const {scrollYProgress:PShowYProg2} = useScroll({
      target:productShowRef,
      offset:['start end','end start']
    });
    const {scrollYProgress:testiYProg} = useScroll({
      target:testiRef,
      offset:['start start','end start']
    });
    const {scrollYProgress:WYProg} = useScroll({
      target:productsWrapper,
      offset:['start start','end start']
    });
    const {scrollYProgress:PYProg} = useScroll({
      target:prodRef,
      offset:['start start','end start']
    });
    const feature1Scale = useTransform(p1YProg,[0,0.7],[1.2,1.1]);
    const featureTitleY = useTransform(p1YProg,[0,0.9],[0,-500]);
    const featureTitleOpacity = useTransform(p1YProg,[0,0.4],[1,0]);
    const codeBlur = useTransform(p1YProg,[0,0.4 ],['blur(15px)','blur(0px)']);
    const drawerX = useTransform(p1YProg,[0,0.1,0.3],[0,45,0]);
    const drawerX2 = useTransform(p1YProg,[0.3,0.4,0.6],[0,45,0]);
    const drawerX3 = useTransform(p1YProg,[0.7,0.8],[0,45]);
    

    ///for productShowcase 
    const div1X = useTransform(PShowYProg,[0,0.3],[1200,0]);
    const div2X = useTransform(PShowYProg,[0.3,0.6],[1800,0]);
    const div3X = useTransform(PShowYProg,[0.5,0.7],[2400,0]);

    const height = useTransform(PShowYProg,[0,1],[0,600]);

    const titlesX = useTransform(PShowYProg,[0,1],[0,-550]);

    const op1 = useTransform(PShowYProg,[0,0.2,0.4],[1,1,0]);
    const op2 = useTransform(PShowYProg,[0.2,0.3,0.6],[0.2,1,0]);
    const op3 = useTransform(PShowYProg,[0.4,0.5,0.8],[0.2,1,0]);
    const op4 = useTransform(PShowYProg,[0.6,0.8],[0.2,1]);

    ///for code editor
    const barY = useTransform(p1YProg,[0,1],["0%","100%"]);

   useEffect(()=>{
     const lenis = new Lenis({
       duration:2
     });
     function raf(time: any){
      lenis.raf(time) 
      requestAnimationFrame(raf)
     }
     requestAnimationFrame(raf);
    },[]);

  ///codeEditor part

    const scaleE = useTransform(WYProg,[0.3164624761083433,0.34929470555864864,0.42436403710166223],[1,1.5,1]);
    const xE = useTransform(WYProg,[0.3164624761083433,0.42436403710166223],[0,-516]);

   ///for testi
    const tdiv1X = useTransform(testiYProg,[0,0.1],[900,0]);
    const tdiv2X = useTransform(testiYProg,[0.1,0.3],[1500,0]);
    const tdiv3X = useTransform(testiYProg,[0.3,0.5],[2100,0]);
    const tdiv4X = useTransform(testiYProg,[0.5,0.7],[2700,0]);
    const tdiv5X = useTransform(testiYProg,[0.7,0.8],[3300,0]);
    const tdiv6X = useTransform(testiYProg,[0.8,1],[3900,0]);
    const commentsX = useTransform(testiYProg,[0,1],[0,1500]);
    
   //for bento
   const scaleB = useTransform(WYProg,[0.8103453100614014,0.81325938924655],[1,1.5]);
   const xB = useTransform(WYProg,[0.8103453100614014,0.81325938924655],[0,550]);
   function handleOverlay(){
    codeOverlayRef.current?.classList.remove('hidden');
    setIsLoad(true);
    setTimeout(()=>{
      
      setIsFix(true);
    },5000)

    setTimeout(()=>{
    codeOverlayRef.current?.classList.add('hidden');
    setIsLoad(false);
    },16000)
     
    setTimeout(()=>{
      debugBtnRef.current?.classList.add('hidden');
    },16500);

   }

 useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === 'Enter') {
        productRef.current?.classList.remove('hidden');

        setTimeout(()=>{
                  feature1Ref.current?.scrollIntoView({ behavior: 'smooth' });
        },700)
        setTimeout(()=>{
         exploreRef.current?.classList.add('hidden');
         productRef2.current?.classList.remove('hidden');
        },2000);

      }

      if(event.key.toLowerCase() === 'd'){
        setD(state => !state);
        setR(false);
        setA(false);
      }
      
      if(event.key.toLowerCase() === 'r'){
        setD(false);
        setR(state => !state);
        setA(false);
      }
      if(event.key.toLowerCase() === 'a'){
        setA(state => !state);
        setD(false);
        setR(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

useMotionValueEvent(p1YProg, 'change', (latest) => {
  // --- Main state handling ---
  if (latest > 0.78) {
    // Show Ref3 as flex, hide Ref1/Ref2, hide drawer2
    setIsRef3(true);
    setIsRef2(false);
    setIsRef1(false);
    drawer2Ref.current?.classList.add('hidden');
  } else if (latest > 0.6) {
    // Show Ref2, hide Ref1 & Ref3, show editor2, keep drawer2 visible
    drawer2Ref.current?.classList.remove('hidden');
    setIsRef1(false);
    setIsRef3(false);
    setIsRef2(true);
    editor2Ref.current?.classList.remove('hidden');

  } else if (latest > 0.2) {
    // Show Ref1 as flex, hide Ref2, hide editor2, keep drawer2 visible
    drawer2Ref.current?.classList.remove('hidden');
    setIsRef1(true);
    setIsRef2(false);
    setIsRef3(false);
    editor2Ref.current?.classList.add('hidden');

  } else {
    // Hide everything in the lowest range
    drawer2Ref.current?.classList.remove('hidden');
    setIsRef1(false);
    
    setIsRef2(false);
    setIsRef3(false);
    editor2Ref.current?.classList.add('hidden');
  }

  // --- Drawer1 logic (separate condition) ---
  if (latest > 0.5051476587223102) {
    drawer1Ref.current?.classList.add('hidden');
  } else {
    drawer1Ref.current?.classList.remove('hidden');
  }
});
 
  ///for new products section


useMotionValueEvent(PShowYProg2,'change',(lastest) => {
  // console.log(lastest);
  if(lastest >= 0.12578616352201258){
    setIsProds(true);
  }
  if(lastest <= 0.12578616352201258) {
    setIsProds(false);
  }
})



useMotionValueEvent(WYProg,'change',(lastest) => {
  // console.log(lastest);
  if(lastest >= 0.3004624761083433) setIsShowProd(false);
  if(lastest <= 0.3004624761083433) setIsShowProd(true);
  // if(lastest === 1) setIsProds(false);
  // if(lastest < 1 )  setIsProds(true);
  if(lastest  >= 0.9191078444275464) {
    setIsProds(false);
    console.log('working')
  } 
  if(lastest <= 0.9191078444275464){
    setIsProds(true);
  }
})

////for new prods
useMotionValueEvent(PYProg,'change',(latest) => {
console.log(latest);
if(latest <= 0.2){ 
  setIsP1(false);
  setIsP2(false);
  }
if(latest >= 0.3){ 
  setIsP1(true);
  setIsP2(false);
  }
if(latest >= 0.6){
  setIsP2(true);
  setIsP1(false);
}  
})

  useEffect(() => {
  const timer = setTimeout(() => {
    setIstitle(true);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  return (
    <>


{/* bottom blur */}
<div className='fixed h-[2%] w-full bg-gradient-to-t from-white/30 to-transparent backdrop-blur-[5px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[4%] w-full bg-gradient-to-t from-white/30 to-transparent backdrop-blur-[10px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[6%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[9px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[8%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[6px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[10%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[5px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[12%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[4px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[14%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[3px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[16%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[2px] bottom-0 z-40 opacity-100'>
</div>
<div className='fixed h-[18%] w-full bg-gradient-to-t from-zinc-950/30 to-transparent backdrop-blur-[1px] bottom-0 z-40 opacity-100'>
</div>
{/* bottom blur */}

  <div className='fixed h-full w-5 right-0 flex justify-center items-center z-40'>
   <ul className='flex flex-col justify-center items-center gap-5 opacity-65'>
   {/* {Array(10).fill(null).map((_, idx) => (
     idx === 1? <li key={idx} className="size-2 bg-white rounded-full ">j</li> :    <li key={idx} className="size-1 bg-white rounded-full "></li>
    ))} */}
    </ul>  
  </div> 

  {/* <FloatingNav navItems={navItems} /> */}

  {/* hero section  */}
   <div ref={heroRef} className='relative h-screen w-full bg-[rgb(1,1,1)] overflow-hidden z-50'>

    <motion.div 

    className='absolute h-full w-full z-0'>
      <img src="/bg2.svg" className='object-fit w-full opacity-55' alt="" />
    </motion.div>
     
    <motion.div

    className='absolute h-full w-full opacity-25 z-0'>
      <img src="/bgNoise.png" className='object-fit w-full' alt="" />
    </motion.div>

<div className='relative z-50 h-full w-full flex justify-center items-center'>

 
 {/* navbar */}
  <motion.div 
  // initial={{opacity:0,filter:'blur(10px)'}}
  // animate={{opacity:1,filter:'blur(0px)'}}
  // transition={{duration:1,delay:7}}
  style={{background:'rgba(0, 0, 0, 0.35)',   
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        zIndex:'9999px'
        }}
  className='fixed flex top-0 w-full '>
    <div className='flex justify-between items-center h-full w-full text-white px-10 py-2  gap-4 '>
    <span className='flex gap-5 justify-center items-center'>
    <img src="/codemateLogo.png" alt="" />
    <div className='flex gap-3 text-lg opacity-65 justify-center items-center cursor-pointer'>
      <h1>Feature</h1>
      <h1>Pricing</h1>
      <h1 className='flex text-center justify-center items-center'>Products <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" /></svg></h1>
    </div>
    </span>
     {/* <h1 className=' p-2 bg-[#1a1a1a] border border-opacity-15 bg-opacity-25 rounded-md flex justify-center items-center'>Book a Demo</h1> */}
    </div>
    </motion.div>
    

    <div className=' flex  flex-col  items-center z-50 text-white gap-5'>

    <motion.div 
    // animate={{y:[120,35]}}
    // transition={{duration:1,delay:6}}    
    className='absolute top-24 left-9 text-9xl font-semibold flex flex-col  bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-12'> 
    <div className={`${montserrat.className} flex `}>
     {/* {title.map((e,idx)=>(
      <motion.h1
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1,delay: idx * 0.5}}
      key={idx}>
        {e}
      </motion.h1>
     ))} */}
     <h1>On Device AI First</h1>
    </div>
    <div className={`${montserrat.className} flex gap-4`}>
     {/* {title2.map((e,idx)=>(
      <motion.h1
      initial={{opacity:0}}
      animate={ isTitle? {opacity:1} : {}}
      transition={{duration:1,delay: idx * 0.5}}
      key={idx}>
        {e}
      </motion.h1>
     ))} */}

     <h1>Developer's Agent</h1>
     
    </div>
          <div className={`flex flex-col ${montserrat.className} text-xl mt-5`}>
        <p>Build and ship 20x faster with CodeMate IDE —</p>
        <p>Your all-in-one accelerator for the development lifecycle</p>
      </div>
      <div className={`${montserrat.className} flex gap-5 text-sm mt-10`}>
      <button className='px-4 py-3  bg-black text-white border border-white rounded-sm bg-opacity-90 text-opacity-60'>GET Extension</button>
      <button className='px-4 py-3  bg-[#FFFFFF] text-black border border-black rounded-sm   opacity-80'>Book a demo</button>
      </div>
     </motion.div>
   
       {/* <motion.span className='mt-32' initial={{display:'none',y:50,filter:'blur(10px)'}}
       animate={{display:'block',y:0,filter:'blur(0px)'}}
       transition={{delay:7,duration:1}}
       >
       <img src="/chat.png" className='object-cover w-[45rem]' alt="" />
       </motion.span> */}

      {/* <motion.p
      initial={{opacity:0,display:'hidden',filter:'blur(10px)'}}
      animate={{opacity:1,filter:'blur(0px)',display:'block'}}
      transition={{duration:1,delay:8}}
      className={`${montserrat.className} opacity-60 text-xl`}>You Think ! We Develop</motion.p> */}

   {/* <motion.div 
   initial={{opacity:0}}
   animate={{opacity:0.6,y:[10,0,10]}}
   transition={{duration:4,delay:10,repeat:Infinity,repeatType:'reverse'}}
   className='absolute bottom-10 text-3xl opacity-50'>
     <span className='flex justify-center items-center'>Scroll Up <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg></span>
   </motion.div> */}
    </div>

  

    </div>
        <motion.div style={{height:shadingHeight}} className="absolute bottom-0 left-0 right-0  bg-gradient-to-b from-zinc-950/0 to-zinc-950 z-20" />
   </div>
   {/* hero section */}

   {/* enter section */}
   {/* <div
   ref={exploreRef} 
   className={`${montserrat2.className} flex justify-center items-center h-[100vh] w-full bg-zinc-950`}>
    <motion.span 
    initial={{opacity:0,filter:'blur(20px)'}}
    whileInView={{opacity:1,filter:'blur(0px)'}}
    viewport={{amount:1}}
    transition={{duration:1.3}}
    className='flex gap-5 text-6xl'>
      <h1 className='font-semibold text-white'>Press</h1>
      <motion.h1 animate={{scale:[1,1.1]}} 
      transition={{duration:2,repeat:Infinity,repeatType:'mirror',}}
      className='p-2 bg-opacity-80 bg-[#1B2021] text-[#00FFFF]'>Enter</motion.h1>
      <h1 className='font-semibold text-white'>to</h1>
      <h1 className='italic text-white'>Explore</h1>
    </motion.span>
   </div> */}
   {/* enter section */}

<div ref={prodRef} className='h-[300vh] w-full bg-zinc-950 text-white'>
   <h1 className='text-center font-mono pt-8 opacity-75'>Introducing Codemate.AI</h1>

   
    <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10  pt-2 pb-2 text-center`}>Your<span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'> New</span> coding assistant.</div>
    <div className='relative h-full w-full  flex flex-col'>
    {/* <div className='h-[30%] w-full flex gap-10 px-10'>
       <Safari className='dark h-[27vw] w-fit' />
       <div>
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2`}>Codemate Build</h1>
        <p className={`text-sm opacity-65 ${montserrat.className} w-[50vw] mt-5`}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
       </div>
    </div> */}



        <div 
        className='sticky top-0 h-screen w-full flex gap-10 px-10 justify-center items-center'>
          
        <div 
        style={{background:'rgba(0, 0, 0, 0.35)',   
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        }}
        className='absolute h-[30vw] w-[98vw] rounded-3xl  -z-10 border-y-[0.1px]  border-white border-opacity-25'/>

        <div className="absolute flex gap-3 right-10 top-[5vw] z-50">
          <button className='rounded-full p-1 bg-white text-black '><IconArrowLeft stroke={2} /></button>
          <button className='rounded-full p-1 bg-white text-black'><IconArrowRight stroke={2} /></button>
        </div>

          <motion.div 
          animate={{x:isP1? 800 : isP2? 0 : 0}}
          transition={{duration:0.8}}
          >
       <Safari className='dark h-[27vw] w-fit rounded-3xl' />
       </motion.div>
       <motion.div 
       animate={{x:isP1? -700 : isP2? 0 : 0}}
       transition={{duration:0.8}}
       className='mb-52'>

        {!isP1 && !isP2 && <motion.span
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1}}
        >
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2 bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent`}>Codemate Build</h1>
        <p className={`text-lg text-zinc-500 ${montserrat.className} w-[50vw] mt-5 `}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
        </motion.span>}

        {isP1 && <motion.span
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1}}
        >
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2 bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent`}>Codemate chat</h1>
        <p className={`text-lg text-zinc-500 ${montserrat.className} w-[50vw] mt-5 `}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
        </motion.span>}
      
        {isP2 && <motion.span
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1}}
        >
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2 bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent`}>Codemate terminal</h1>
        <p className={`text-lg text-zinc-500 ${montserrat.className} w-[50vw] mt-5 `}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
        </motion.span>}

       </motion.div>
    </div>

        {/* <div className='h-[30%] w-full flex gap-10 px-10'>
       
       <div>
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2`}>Codemate chat</h1>
        <p className={`text-sm opacity-65 ${montserrat.className} w-[50vw] mt-5`}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
       </div>
       <Safari className='dark h-[27vw] w-fit' />
    </div> */}

        {/* <div className='h-[30%] w-full flex gap-10 px-10'>
       <Safari className='dark h-[27vw] w-fit' />
       <div>
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2`}>Codemate terminal</h1>
        <p className={`text-sm opacity-65 ${montserrat.className} w-[50vw] mt-5`}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
       </div>
    </div> */}
    </div>
</div>

<div ref={productsWrapper}>
  {isProds &&      
  <AnimatePresence mode="wait">
  <motion.div
    key={1} 
     exit={{opacity:0,filter:'blur(20px)'}}
     initial={{opacity:0,filter:'blur(20px)'}}
     animate={{opacity:1,filter:'blur(0px)'}}
     transition={{duration:0.8}}
     className='fixed top-0 left-32 h-full w-[70%] flex items-center justify-center z-50'>

      <AnimatePresence>
      {isShowProd && <motion.div 
    key={1}
     exit={{opacity:0,filter:'blur(20px)'}}
     initial={{opacity:0,filter:'blur(20px)'}}
     animate={{opacity:1,filter:'blur(0px)'}}
      className='absolute left-[30rem] h-[30vw] w-[58vw] rounded-xl bg-zinc-900'>
        {/* <Safari url='codemate.ai' imageSrc='chatss.png' className='dark'/> */}
        </motion.div>}
     
       {isShowProd &&      <motion.div 
     key={2}
     style={{x:div1X}}
     exit={{opacity:0,filter:'blur(20px)'}}
     initial={{opacity:0,filter:'blur(20px)'}}
     animate={{opacity:1,filter:'blur(0px)'}}
     className='absolute left-[30rem] h-[30vw] w-[58vw] rounded-xl '>
      {/* <Safari url='codemate.ai' imageSrc='buildss.png' className='dark'/> */}
      
      </motion.div>}

     {isShowProd && <motion.div
     key={3}
     style={{x:div2X}} 
     exit={{opacity:0,filter:'blur(20px)'}}
     initial={{opacity:0,filter:'blur(20px)'}}
     animate={{opacity:1,filter:'blur(0px)'}}
     className='absolute left-[30rem] h-[30vw] w-[58vw] rounded-xl'>
      {/* <Safari url='codemate.ai' className='dark object-cover object-left-top' imageSrc='eduation.png'/> */}
     </motion.div>}
    </AnimatePresence>
     <motion.div 
     style={{x:div3X}} className='absolute left-[30rem] h-[30vw] w-[58vw] rounded-xl text-white'>
             <motion.div style={{x:xE}} className='h-full w-full'>
             <CodeOverlay ref={codeOverlayRef}/> 

        <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/> 
        </motion.div>
     </motion.div>  
     </motion.div>
     </AnimatePresence> }


   {/* products showcase */}
   <div 
   ref={productShowRef} 
   
   className='relative h-[200vw] w-full bg-zinc-950'>
   
 <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 pb-2 text-center`}>With our <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>Products</span> take yourself to perfection.</div>

   <div className='sticky top-0   h-screen w-full overflow-x-hidden'>
       
<div
className='relative h-full w-[40%] flex  items-center justify-center  pl-10 py-3'>

    <div className={`relative ${montserrat.className}  text-7xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent flex flex-col   h-full w-full `}>
     
       <div className='relative h-full py-6 pl-5 flex justify-center overflow-hidden gap-5 '>
        
        <div>
        <motion.div 
        style={{y:height}}
        className='absolute rounded-md w-[0.25rem] h-[15%]  bg-gradient-to-b from-[#00BFFF] to-[#1E90FF]  opacity-80 z-50'/>

       <div className='w-[0.20rem] rounded-md  h-full bg-[#1c1c1c] '/> 
       </div>

       <motion.div 
       style={{y:titlesX}}
       className='h-full w-full flex flex-col gap-[17rem]'>
          
        <motion.div 
        style={{opacity:op1}}
        className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>Codemate Chat</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>
         
                 <motion.div 
                 style={{opacity:op2}}
                 className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>Codemate Build</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>


                <motion.div 
                style={{opacity:op3}}
                className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>Codemate Education</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>


                <motion.div 
                style={{opacity:op4}}
                className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>Gonna help you in your shit..</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>
        
       </motion.div>

       </div>

    </div>


</div>

   </div>

   </div>
    {/* products showcase */}

   <div ref={productRef} className='relative h-[550vh] w-full bg-zinc-950 text-white flex  flex-col'>

  {/* <div className={`absolute text-white w-full flex justify-center items-center text-7xl font-light pt-14 opacity-45 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent ${montserrat.className}`}>
    <TextAnimate delay={1} duration={2} animation="blurIn" as="h1" className=' '>A New Way To Build Apps With AI</TextAnimate>
  </div> */}
    
    {/* <div 
    className="absolute top-0 text-[13rem]  pl-5 font-mono flex">
      
<AnimatePresence mode="wait">
  {isRef1 && (
    <motion.div
      key="ref1"
      ref={Ref1}
      className="flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
    >
      <p>Press "R" for Review mode.</p>
    </motion.div>
  )}

  {isRef2 && (
    <motion.div
      key="ref2"
      ref={Ref2}
      className="flex pl-[82.5vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        0
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        2
      </motion.h1>
    </motion.div>
  )}

  {isRef3 && (
    <motion.div
      key="ref3"
      ref={Ref3}
      className="flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        0
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        3
      </motion.h1>
    </motion.div>
  )}
</AnimatePresence>


    </div> */}


 <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 text-center`}>Let's see what our <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>Extension</span> alone can do.</div>

     <motion.div 
     initial={{opacity:0,filter:'blur(50px)'}}
     whileInView={{opacity:1,filter:'blur(0px)'}}
     transition={{duration:0.8}}
     className='sticky h-screen top-0 w-full flex  items-center'>
     {/* <AnimatePresence mode='wait'>
      {!d && !r && !a && <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
            animate={{opacity:1,filter:'blur(0px)'}}
            transition={{duration:1}}
            exit={{opacity:0,filter:'blur(20px)'}}
            key={1}
            className='absolute top-0 z-30 left-0 h-screen flex  justify-center gap-3 items-center ml-9 text-2xl font-mono w-[15%] flex-col z-0'> <h1 className='opacity-45'>Press</h1> <h1 className='text-5xl text-[#00FFFF] opacity-70'>"D"</h1>  <h1 className='opacity-45'>for Debug mode</h1></motion.div>
            }

              {d && <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
            animate={{opacity:1,filter:'blur(0px)'}}
            transition={{duration:1}}
            exit={{opacity:0,filter:'blur(20px)'}}
            key={2}
            className='absolute top-0 z-30 left-0 h-screen flex  justify-center gap-3 items-center ml-9 text-2xl font-mono w-[15%] flex-col '> <h1 className='opacity-45'>Press</h1> <h1 className='text-5xl text-[#00FFFF] opacity-70'>"R"</h1>  <h1 className='opacity-45'>for Review mode</h1></motion.div>
            }    

            {r && 
            <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
            animate={{opacity:1,filter:'blur(0px)'}}
            transition={{duration:1}}
            exit={{opacity:0,filter:'blur(20px)'}}
            key={3}
            className='absolute top-0 z-30 right-0 h-screen flex  justify-center gap-3 items-center mr-9 text-2xl font-mono w-[15%] flex-col'> <h1 className='opacity-45'>Press</h1> <h1 className='text-5xl text-[#00FFFF] opacity-70'>"A"</h1>  <h1 className='opacity-45'>for Auto-complete mode</h1></motion.div>
            }

            {a && 
            <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
            animate={{opacity:1,filter:'blur(0px)'}}
            transition={{duration:1}}
            exit={{opacity:0,filter:'blur(20px)'}}
            key={4}
            className='absolute top-0 z-30 left-0 h-screen flex  justify-center gap-3 items-center ml-9 text-2xl font-mono w-[15%] flex-col'> <h1 className='opacity-45'>Press</h1> <h1 className='text-5xl text-[#00FFFF] opacity-70'>"D"</h1>  <h1 className='opacity-45'>for Debug mode</h1></motion.div>
            }
      </AnimatePresence> */}


      <div className='relative flex justify-center items-center w-[70%]'>

        
      <motion.div 
      ref={feature1Ref}
      className='relative h-[30vw] w-[58vw] opacity-80 rounded-xl flex justify-center items-center overflow-y-scroll z-50'>

        

        <motion.div
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1.5}}
        ref={editor2Ref}
        className='hidden absolute h-full w-full bg-zinc-900 rounded-xl flex z-40 '></motion.div>


        {/* <CodeOverlay ref={codeOverlayRef}/> 

        <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/> */}



<AnimatePresence mode="wait">
     
      
        <motion.div  
        key={1}
        
        
        transition={{duration:0.7}} 
        exit={{x:0}} 
        ref={drawer1Ref}
        whileHover={{background:'#ffffff',
           color:'black',
           opacity:0.4
        }}
        style={{background: 'rgba(255, 255, 255, 0.02)',
        y:drawerX,  
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer'>
       

          Debug
               {/* <h1 className='text-white text-5xl mb-5 mt-3 '>Debug</h1> */}
       {/* <motion.span
       initial={{opacity:0,filter:'blur(20px)'}}
       whileInView={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:0.7}}
       viewport={{amount:0.8}}
       >

        {/* <p className='text-sm opacity-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facilis fugiat tenetur in autem commodi dolor quae magni </p> 
       </motion.span> */}

       {/* {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 ml-14'>
        <LoaderOne/>
        </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlay} className='bg-[#343434] rounded-[54px] px-2 py-2 m-4 hover:opacity-70'>
          Debug this code
        </button>} */}
      


        </motion.div>
        

         
        <motion.div 
        key={2}
        transition={{duration:0.7}} 
        exit={{x:0}} 
        ref={drawer2Ref}
        style={{background: 'rgba(255, 255, 255, 0.02)',
        y:
        
        drawerX2,  
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer'>
       

         Review

       {/* <motion.span
       initial={{opacity:0,filter:'blur(20px)'}}
       whileInView={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:0.7}}
       viewport={{amount:0.8}}
       >
        <h1 className='text-white text-5xl ml-8 mb-5 mt-3 '>Review</h1>
        <p className='text-sm opacity-60 ml-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facilis fugiat tenetur in autem commodi dolor quae magni </p>
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 ml-20'>
        <LoaderOne/>
        </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlay} className='bg-[#343434] rounded-[54px] px-2 py-2 m-4 hover:opacity-70'>
          Review this code
        </button>} */}
      


      </motion.div>
      


      
        <motion.div 
        exit={{x:0}} 
        // ref={drawer1Ref}
        key={3}

        style={{background: 'rgba(255, 255, 255, 0.02)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        y:drawerX3,
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer'>
       
        Auto-Complete

       {/* <motion.span
       initial={{opacity:0,filter:'blur(20px)'}}
       whileInView={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:0.7}}
       viewport={{amount:0.8}}
       >
        <h1 className='text-white text-3xl mb-5 mt-3 '>/h1>
        <p className='text-sm opacity-60'>PRESS!</p>
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:0.7}}
        className='mb-10 ml-14'>
        <LoaderOne/>
        </motion.span>  :         <button ref={debugBtnRef} className='bg-[#343434] font-mono py-2 mr-4 mb-4  text-opacity-35 text-3xl cursor-not-allowed rounded-sm'>
        TAB
        </button>} */}
        </motion.div>
        
</AnimatePresence>



      </motion.div>  
       
       {/* <motion.h1 
       style={{y:featureTitleY,opacity:featureTitleOpacity}}
       className='absolute text-7xl text-nowrap'>You can do much more with just Plugin...</motion.h1> */}
      </div>

        <div className='w-[30%] h-full flex justify-end pr-20 py-10 gap-10'> 

      <div className='w-full'>
         <div>
          <h1 className='text-white text-6xl mb-5 mt-24 '>Debug</h1>
       <motion.span
       initial={{opacity:0,filter:'blur(20px)'}}
       whileInView={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:0.7}}
       viewport={{amount:0.8}}
       >

        <p className='text-xl opacity-60'>You can do debug with our extension seamlessly, allowing you to identify and resolve issues without leaving your development environment. It provides real-time logs and clear insights, making the debugging process faster and more efficient.</p> 
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 '>
        <LoaderOne/>
        </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlay} className='bg-[#343434] rounded-[50px] px-2 py-2 mt-10 hover:opacity-70'>
          Debug this code
        </button>} 
        </div>

      </div>

        <div className='z-50'>
        <motion.div 
        style={{height:barY}}
        className='absolute rounded-md w-[0.25rem] h-[15%]  bg-gradient-to-b from-[#00BFFF] to-[#1E90FF]  opacity-80 z-50'/>

       <div className='w-[0.20rem] rounded-md  h-full bg-[#1c1c1c] '/> 
      </div>
        

      </div>
     </motion.div>
      


   </div>

</div>

{/* bento */}
     <div className=' relative h-[170vh] w-full bg-zinc-950 text-white overflow-hidden'>
   <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 text-center`}>More than <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>100k</span> users</div>
   
  <MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={false}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={400}
  particleCount={12}
  glowColor="0, 191, 255"
/>

  </div> 
{/* bento   */}



  <div ref={testiRef} className='relative h-[950vh] w-full bg-zinc-950'>
         <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 text-center`}>Do not listen to us but from <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>People</span></div>

   <div className=' sticky top-0   h-screen w-full overflow-x-hidden '>
       
<div
className='relative h-full w-full flex  items-center justify-center   pl-10 py-3'>


     <motion.div 
     style={{x:commentsX}}
     className={`${montserrat.className} absolute flex gap-10 text-7xl text-white font-semibold`}>
<h1 className="whitespace-nowrap text-opacity-80">thrilled 🤩</h1>
<h1 className="whitespace-nowrap text-opacity-80">grateful 🙏</h1>
<h1 className="whitespace-nowrap text-opacity-80">inspired ✨</h1>
<h1 className="whitespace-nowrap text-opacity-80">amazed 🤯</h1>
<h1 className="whitespace-nowrap text-opacity-80">relieved 😌</h1>
<h1 className="whitespace-nowrap text-opacity-80">blessed 🥰</h1>
<h1 className="whitespace-nowrap text-opacity-80">accomplished 🏆</h1>
<h1 className="whitespace-nowrap text-opacity-80">delighted 😊</h1>
<h1 className="whitespace-nowrap text-opacity-80">empowered 💪</h1>
<h1 className="whitespace-nowrap text-opacity-80">fulfilled ❤️</h1>
     </motion.div>


     <div className='h-full w-full flex items-center justify-center flex-col'>
     <motion.div className='absolute  h-[30rem] w-[40rem] bg-pink-700 rounded-3xl'></motion.div>
     <motion.div 
     style={{y:tdiv1X}}
     className='absolute  h-[30rem] w-[40rem] bg-white rounded-3xl'></motion.div>
     <motion.div
     style={{y:tdiv2X}} 
     className='absolute  h-[30rem] w-[40rem] bg-blue-500 rounded-3xl'></motion.div>
     <motion.div style={{y:tdiv3X}} className='absolute  h-[30rem] w-[40rem] bg-red-700 rounded-3xl'></motion.div>  
     <motion.div style={{y:tdiv4X}} className='absolute  h-[30rem] w-[40rem] bg-purple-600 rounded-3xl'></motion.div>
     <motion.div style={{y:tdiv5X}} className='absolute  h-[30rem] w-[40rem] bg-yellow-500 rounded-3xl'></motion.div>
     <motion.div style={{y:tdiv6X}} className='absolute  h-[30rem] w-[40rem] bg-green-600 rounded-3xl'></motion.div>
     </div> 
</div>

   </div>
     </div>



<div className='h-screen w-full bg-zinc-950'></div>

    </>
  )
}

export default Page



// function Product2({productRef2}:{productRef2:React.RefObject<HTMLDivElement>}){
  
//   const feature2Ref = useRef<HTMLDivElement>(null);
//   const {scrollYProgress:p2YProg} = useScroll({
//       target:productRef2,
//       offset:['start end','end start']
//     });
//   const drawerX = useTransform(p2YProg,[0.4,1],[0,-1500]);  
//   return(
//     <>
//     <motion.div 
//      initial={{opacity:0,filter:'blur(50px)'}}
//      whileInView={{opacity:1,filter:'blur(0px)'}}
//      transition={{duration:0.8}}
//      className='sticky h-screen top-0 w-full flex justify-center items-center'>
//       <div className='relative flex justify-center items-center'>
//       <motion.div 
//       ref={feature2Ref}
//       style={{scale:1,}}
//       className='relative h-[35vw] w-[55vw] opacity-80 rounded-xl flex justify-center items-center bg-white'>


//         {/* <CodeOverlay ref={codeOverlayRef}/> 

//         // <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/> */}

//         <motion.div 
//         style={{x:drawerX,background:'rgba(255, 255, 255, 0.02)',
//         boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//         backdropFilter: 'blur(4.7px)',
//         WebkitBackdropFilter: 'blur(4.7px)',
//         border: '1px solid rgba(255, 255, 255, 0.3)',
//         }}
//         className='absolute right-0 h-[99%] w-[60%] bg-white rounded-3xl pl-[20rem] flex flex-col justify-between  text-white'>
       
//        <motion.span
//        initial={{opacity:0,filter:'blur(20px)'}}
//        whileInView={{opacity:1,filter:'blur(0px)'}}
//        transition={{duration:0.7,delay:1}}
//        viewport={{amount:0.5}}
//        >
//         <h1 className='text-white text-5xl mb-5 mt-3 '>Debug</h1>
//         <p className='text-sm opacity-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facilis fugiat tenetur in autem commodi dolor quae magni </p>
//        </motion.span>

//        {/* {isLoad?    
//         <motion.span 
//         initial={{opacity:0,filter:'blur(20px)'}}
//         whileInView={{opacity:1,filter:'blur(0px)'}}
//         transition={{duration:1,delay:1}}
//         className='mb-10 ml-14'>
//         <LoaderOne/>
//         </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlay} className='bg-[#343434] rounded-[54px] px-2 py-2 m-4 hover:opacity-70'>
//           Debug this code
//         </button>} */}
      


//       </motion.div>



//       </motion.div>  
       
//        {/* <motion.h1 
//        style={{y:featureTitleY,opacity:featureTitleOpacity}}
//        className='absolute text-7xl text-nowrap'>You can do much more with just Plugin...</motion.h1> */}
//       </div>
//      </motion.div>

//     </>
//   )
// }

function CodeOverlay({ref}:{ref:React.RefObject<HTMLDivElement>}){
  return(
      <motion.div 
       ref={ref}
       initial={{opacity:0,filter:'blur(20px)'}}
       whileInView={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:1.5}}
       className='hidden absolute h-full w-full bg-zinc-900 z-50 rounded-3xl text-white flex flex-col gap-5 p-10'>
       <LoaderFive text="Debugging Inprogress..."/>


      {/* <TypingAnimation className='text-2xl font-mono opacity-90'> </TypingAnimation> */}
      
       <TextAnimate animation="blurInUp" by="character" duration={2}>
      &gt; Analyzing your code...
    </TextAnimate>
      
      <AnimatedSpan delay={4000} className="text-[#00FFFF] font-mono opacity-75 text-md">
        <span>✔ Parsing the code line by line.</span>
      </AnimatedSpan>
       

      <AnimatedSpan delay={6000} className="text-[#00FFFF] font-mono opacity-75 text-md">
        <span>✔ Identified 8 errors.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={8000} className="text-[#00FFFF] font-mono opacity-75 text-md">
        <span>✔ Applying changes.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={10000} className="text-[#00FFFF] font-mono opacity-75 text-md">
        <span>✔ Success!</span>
      </AnimatedSpan>


      <AnimatedSpan delay={12000} className="text-white  font-mono opacity-55 text-sm">
        <span>All 8 errors are fixed!</span>
      </AnimatedSpan>
       </motion.div>

       
  )
}