'use client'
import React, { useEffect, useState,useRef } from 'react'
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from '@/components/ui/floating-navbar';
import { IconArrowLeft,IconArrowRight,IconArrowBadgeDown } from '@tabler/icons-react';
import AutoCodeEditor from '@/components/motion-components/aEditor';
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
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
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

const ReviewComponent = [
  { code: "import { useState } from 'react'",  },
  { code: "", },
  { code: "export default function Counter() {", },
  { code: "  const [count, setCount] = useState(0)",  },
  { code: "", },
  { code: "  return (", },
  { code: "    <div>",},
  { code: "      <h2>Count: {count}</h2>", },
  { code: "      <button onClick={() => setCount(count + 1)}>+</button>", },
  { code: "      <button onClick={() => setCount(count - 1)}>-</button>", },
  { code: "    </div>",},
  { code: "  )",},
  { code: "}",},
];

const AutoCompleteComponent = [
  { code: "import { useState } from 'react'", },
  { code: "", },
  { code: "export default function ThemeToggle() {", },
  { code: "  const [dark, setDark] = useState(false)", },
  { code: "  return (", },
  { code: "    <div className={dark ? 'bg-black text-white p-4' : 'bg-white text-black p-4'}>", },
  { code: "      <p>{dark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</p>", },
  { code: "      <button onClick={() => setDark(!dark)}>Toggle</button>", },
  { code: "    </div>", },
  { code: "  )", },
  { code: "}", },
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
  const router = useRouter();
  const heroRef = useRef(null);
  const [d,setD] = useState(false); 
  const [r,setR] = useState(false);
  const [a,setA] = useState(false);
  const [eyesD,setEyesD] = useState(0);
  const [IsMascot,setIsMascot] = useState(false);
  const [isNBack,setIsNBack] = useState(false);
  const [isP1,setIsP1] = useState(false);
  const [isP2,setIsP2] = useState(false);
  const [isAuto,setIsAuto] = useState(false);
  const [isShowProd,setIsShowProd] = useState(true);
  const [isProds , setIsProds] = useState(false);
  const [isFix,setIsFix] = useState(false);
  const [isRef1,setIsRef1] = useState(false);
  const [isRef2,setIsRef2] = useState(false);
  const [isRef3,setIsRef3] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
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
  const codeOverlayRef2 = useRef<HTMLDivElement>(null);
  const [isLoad,setIsLoad] = useState(false);
  const [isLoad2,setIsLoad2] = useState(false);
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
    const {scrollYProgress:MYProg} = useScroll({
      target:mainRef,
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
   //for codeEditor
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
   
   function handleOverlayR(){
    codeOverlayRef2.current?.classList.remove('hidden');
    setTimeout(()=>{
      debugBtnRef.current?.classList.add('hidden');
    },16500);
     setIsLoad2(true);
   }
 useEffect(() => {
    const handleKeyDown = (event:any) => {
    if(event.key === "Tab"){
      setIsAuto(true);
    }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);





useMotionValueEvent(p1YProg, 'change', (latest) => {
  // --- Main state handling ---
  if (latest > 0.6) {
    // Show Ref3 as flex, hide Ref1/Ref2, hide drawer2
    setIsRef3(true);
    setIsRef2(false);
    setIsRef1(false);
    drawer2Ref.current?.classList.add('hidden');
  } else if (latest > 0.3) {
    // Show Ref2, hide Ref1 & Ref3, show editor2, keep drawer2 visible
    drawer2Ref.current?.classList.remove('hidden');
    setIsRef1(false);
    setIsRef3(false);
    setIsRef2(true);
    editor2Ref.current?.classList.remove('hidden');

  } else if (latest > 0.1) {
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
 
///for mascot 
useMotionValueEvent(MYProg,'change',(latest) => {
  console.log(latest);
  if(latest >= 0.027262813522355506) setIsMascot(true);
  if(latest <= 0.027262813522355506) setIsMascot(false);
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
if(latest <= 0.15){ 
  setIsP1(false);
  setIsP2(false);
  }
if(latest >= 0.25){ 
  setIsP1(true);
  setIsP2(false);
  }
if(latest >= 0.45){
  setIsP2(true);
  setIsP1(false);
}  
})

// for main div events
useMotionValueEvent(MYProg,'change',(latest) => {
console.log(latest);
 if(latest >= 0.001203313524221142) setIsNBack(true);
 if(latest <= 0.001203313524221142) setIsNBack(false);
})

  useEffect(() => {
  const timer = setTimeout(() => {
    setIstitle(true);
  }, 2000);

  return () => clearTimeout(timer);
}, []);



  return (
    <div style={{cursor:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 433" width="26" height="26"><path d="M40.31 32.13c-1.76-8.4 7.23-14.92 14.67-10.66l296.47 169.91c7.54 4.32 6.29 15.56-2.02 18.12L205.54 253.76c-2.23.69-4.15 2.13-5.42 4.09l-72.01 110.94c-4.83 7.44-16.25 5.3-18.07-3.38L40.31 32.13z" fill="black" stroke="white" stroke-width="25"/></svg>') 16 16, auto`}} ref={mainRef} className='bg-zinc-950' >


{/* bottom blur */}
{/* <div className='fixed h-[2%] w-full bg-gradient-to-t from-white/30 to-transparent backdrop-blur-[5px] bottom-0 z-40 opacity-100'>
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
</div> */}
{/* bottom blur */}



  {/*navBar*/}
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
  style={{background:!isNBack? 'rgba(15, 12, 12, 0.2)' : 'rgba(15, 12, 12, 0.55)',   
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex:999999999999,
        }}
  className='mt-5 w-fit bg-opacity-65 z-[9999999999] rounded-md'>
    <div className='flex  h-full w-full text-white px-[1rem] py-2 '>
    <div className='flex gap-[51vw]  justify-between items-center w-full h-10'>
    <div className="h-full w-[13rem] flex justify-center overflow-hidden">
      {!IsMascot && <img src="/codemateLogo.svg" alt="" />}
     {IsMascot && <motion.div initial={{opacity:0,filter:'blur(20px)',x:50}} animate={{opacity:1,filter:'blur(0px)',x:-80}} transition={{duration:0.5}}>
<svg width="50" height="40" viewBox="0 0 153 150" fill="none" xmlns="http://www.w3.org/2000/svg">

  <path d="M131.78 150H39.4727L60.2412 110.845H152.55L131.78 150ZM39.4727 39.0674V150L0.242188 125.04V14.1074L39.4727 39.0674ZM131.78 39.1553H39.4727L60.2412 0H152.55L131.78 39.1553Z" 
    fill="url(#paint0_linear_2014_66)"/>

<motion.g
  animate={{ translateX: [0, 15,15,15,0,0, 0], translateY: [0,10,10,-10,-10,-10, 0] }}
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
</motion.g>

  <defs>
    <linearGradient id="paint0_linear_2014_66" x1="0.580642" y1="0" x2="183.357" y2="82.4837" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00BFFF"/>
      <stop offset="1" stop-color="#1E90FF"/>
    </linearGradient>
  </defs>
</svg>


      </motion.div>}
    
    </div>
    <div className={`${montserrat.className} flex gap-3 text-md  justify-center items-center cursor-pointer text-right `}>
       <motion.h1 whileHover={{opacity:1}} className='flex text-center justify-center items-center opacity-65'>Products</motion.h1>
       <motion.h1 whileHover={{opacity:1}} className='opacity-65'>Features</motion.h1>
       <motion.h1 whileHover={{opacity:1}} onClick={()=>{router.push('pricing')}} className='opacity-65'>Pricing</motion.h1>
       <button className={`${montserrat.className} px-2 py-1  bg-[#FFFFFF] text-black  rounded-sm font-semibold opacity-85`}>Get Started</button>
    </div>


    </div>
     {/* <h1 className=' p-2 bg-[#1a1a1a] border border-opacity-15 bg-opacity-25 rounded-md flex justify-center items-center'>Book a Demo</h1> */}
    </div>
    </motion.div>
</div>

{/*navBar*/}
  {/* hero section  */}
  <div className='h-screen w-full overflow-x-hidden'>
  <BackgroundGradientAnimation className='w-full overflow-hidden' interactive={true} gradientBackgroundStart='rgb(9, 9, 11)' gradientBackgroundEnd='rgb(9, 9, 11)' firstColor='0, 255, 255' secondColor='30, 144, 255' thirdColor='0, 255, 255' fourthColor='255,255,255' pointerColor='30, 144, 255' size='100%'>
   <div style={{cursor:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 433" width="26" height="26"><path d="M40.31 32.13c-1.76-8.4 7.23-14.92 14.67-10.66l296.47 169.91c7.54 4.32 6.29 15.56-2.02 18.12L205.54 253.76c-2.23.69-4.15 2.13-5.42 4.09l-72.01 110.94c-4.83 7.44-16.25 5.3-18.07-3.38L40.31 32.13z" fill="black" stroke="white" stroke-width="25"/></svg>') 16 16, auto`}} ref={heroRef} className='relative h-screen w-full z-50 overflow-hidden cursor-default'>


     
    <motion.div
    style={{cursor:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 433" width="32" height="32"><path d="M40.31 32.13c-1.76-8.4 7.23-14.92 14.67-10.66l296.47 169.91c7.54 4.32 6.29 15.56-2.02 18.12L205.54 253.76c-2.23.69-4.15 2.13-5.42 4.09l-72.01 110.94c-4.83 7.44-16.25 5.3-18.07-3.38L40.31 32.13z" fill="black" stroke="white" stroke-width="25"/></svg>') 16 16, auto`}}
    className='absolute h-full w-full opacity-5 z-0'>
      <img src="/bgNoise.png" className='object-fit w-full' alt="" />
    </motion.div>

<div className='relative z-50 h-full w-full flex justify-center items-center overflow-hidden'>

 
 

    

    <div className=' flex  flex-col  items-center z-50 text-white gap-5'>

    <motion.div 
    // animate={{y:[120,35]}}
    // transition={{duration:1,delay:6}}    
    className='absolute top-24 left-9 text-9xl font-semibold flex flex-col pb-1  pl-12 mt-5 z-50 '> 
    <div className={`${montserrat.className} `}>
     {/* {title.map((e,idx)=>(
      <motion.h1
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1,delay: idx * 0.5}}
      key={idx}>
        {e}
      </motion.h1>
     ))} */}
      <motion.div 
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1,delay:4 }}
      className="text-sm text-nowrap flex gap-2 ml-3 text-gray-400">Build 3.0 is live. Start building.  <motion.span whileHover={{scale:1.05}} className='text-cyan-500 flex cursor-pointer  justify-center items-center'>   Explore now &gt;</motion.span></motion.div>

     <div className=' z-50'><motion.span   initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.3 }} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>On</motion.span> <motion.span initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.3,delay:0.3}} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>Device</motion.span> <motion.span initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.2,delay:0.6 }} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>AI</motion.span> <motion.span initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.1,delay:0.8 }} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>First</motion.span></div>
    </div>
    <div className={`${montserrat.className} flex gap-4 bg-gradient-to-b from-white to-gray-300/10 bg-clip-text  text-transparent`}>
     {/* {title2.map((e,idx)=>(
      <motion.h1
      initial={{opacity:0}}
      animate={ isTitle? {opacity:1} : {}}
      transition={{duration:1,delay: idx * 0.5}}
      key={idx}>
        {e}
      </motion.h1>
     ))} */}

     <div className='pb-3'><motion.span initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.1,delay:0.9 }} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>Developer's</motion.span> <motion.span initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.1,delay:1 }} className='bg-gradient-to-b from-white to-gray-300/60 bg-clip-text  text-transparent'>Agent</motion.span></div>
     
    </div>
          <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4,delay:1.5 }}
          className={`flex flex-col ${montserrat.className} text-xl mt-5 opacity-60 `}>
        <p>Build and ship 20x faster with CodeMate IDE —</p>
        <p>Your all-in-one accelerator for the development lifecycle</p>
      </motion.div>
      <motion.div   
          initial={{ opacity: 0, filter: "blur(10px)",y:100 }}
          animate={{ opacity: 1, filter: "blur(0px)",y:0 }}
          transition={{ duration: 1,delay:0.5}} className={`${montserrat.className} flex gap-5 text-sm mt-10`}>
      <button className='px-4 py-3  bg-black text-white border border-white rounded-sm bg-opacity-90 text-opacity-60'>GET Extension</button>
      <button 
      className='px-4 py-3  bg-[#FFFFFF] text-black border border-black rounded-sm   opacity-80'>Book a demo</button>
      </motion.div>
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
        <motion.div style={{height:shadingHeight}} className="absolute bottom-0 left-0 right-0  bg-gradient-to-b from-zinc-950/0 to-zinc-950 z-50" />
   </div>
   </BackgroundGradientAnimation>
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




<div ref={prodRef} className='h-[350vh] w-full bg-zinc-950 text-white -z-10'>
   <h1 className=' font-mono pt-8 opacity-75  text-center  text-lg'>Introducing Codemate.AI</h1>

   
    <div className={`${montserrat.className} mt-4 text-6xl pr-[4rem] font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent  pt-2 pb-2 w-full text-center `}>Your<span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent text-7xl'> Full-Stack</span> Coding Assistant.</div>
    <div className='relative h-full w-full  flex flex-col'>
    {/* <div className='h-[30%] w-full flex gap-10 px-10'>
       <Safari className='dark h-[27vw] w-fit' />
       <div>
        <h1 className={`${montserrat.className} text-5xl font-semibold mt-2`}>Codemate Build</h1>
        <p className={`text-sm opacity-65 ${montserrat.className} w-[50vw] mt-5`}>Codemate Build is your reliable partner in turning ideas into impactful solutions. With a focus on innovation and precision, we craft scalable applications and seamless digital experiences that empower businesses to grow. Our team is dedicated to building not just products, but long-lasting value that helps you stay ahead in a competitive world.</p>
       </div>
    </div> */}

<div className='relative h-full w-full flex justify-center gap-5'>
      {/* section for products */}
        <div className='sticky top-0 h-screen   flex   items-center justify-center   '>
          
        


          <motion.div 
          animate={{x:0}}
          transition={{duration:0.8}}
          >
          
          <AnimatePresence mode='wait'>

          {!isP1 && !isP2 && 
          <div  key={3} className="flex flex-col gap-2 pt-10">
          <motion.div 
          key={1} 
          initial={{opacity:0,filter:"blur(30px)"}}
          animate={{opacity:1,filter:"blur(0px)"}}
           exit={{opacity:0,filter:"blur(30px)"}}
          transition={{duration:1}}
          className='h-[33rem] w-[57rem] bg-zinc-700 rounded-lg'>
         </motion.div>
         <span className={`${montserrat.className} text-4xl flex flex-col gap-2`}>
         <h1>Codemate Webapp</h1>
         <p className='text-sm opacity-70'>This is the browser-based version of CodeMate — accessible via app.codemate.ai.</p>
         </span>
         </div>
         }          
          
          {isP1 && 
          <div  key={2} className="flex flex-col gap-2 pt-10">
          <motion.div 
         
          initial={{opacity:0,filter:"blur(30px)"}}
          animate={{opacity:1,filter:"blur(0px)"}}
           exit={{opacity:0,filter:"blur(30px)"}}
          transition={{duration:1}}
          className='h-[33rem] w-[57rem] bg-zinc-700 rounded-lg'>
         </motion.div>
         <span className={`${montserrat.className} text-4xl flex flex-col gap-2`}>
         <h1>Codemate Webapp</h1>
         <p className='text-sm opacity-70'>This is the browser-based version of CodeMate — accessible via app.codemate.ai.</p>
         </span>
         </div>}  

         {isP2 &&           
         <div  key={3}  className="flex flex-col gap-2 pt-10">
          <motion.div 
         
          initial={{opacity:0,filter:"blur(30px)"}}
          animate={{opacity:1,filter:"blur(0px)"}}
           exit={{opacity:0,filter:"blur(30px)"}}
          transition={{duration:1}}
          className='h-[33rem] w-[57rem]  bg-zinc-700 rounded-lg'>
         </motion.div>
         <span className={`${montserrat.className} text-4xl flex flex-col gap-2`}>
         <h1>Codemate Webapp</h1>
         <p className='text-sm opacity-70'>This is the browser-based version of CodeMate — accessible via app.codemate.ai.</p>
         </span>
         </div>}        
        </AnimatePresence>
       </motion.div>
       <motion.div 
       animate={{x:isP1? -700 : isP2? 0 : 0}}
       transition={{duration:0.8}}
       className='mb-52'>
       </motion.div>
    </div>
      {/* section for products */}
     


     {/* features of product */}

  <div className={`h-full  flex flex-col pt-[4.2rem] gap-[3rem] items-center ${montserrat.className} `}>
    
    <div>
    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#243B55] to-[#141E30] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Build</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />
    </div>
    <h1 className='mt-1 text-lg font-semibold'>Introducing Build</h1>
    <p className='opacity-65 text-sm w-[30rem]'>Your AI Coding Agent that helps you convert your prompts into working deployed applications</p>
    </div>

<div>
    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#6441A5] to-[#2A0845] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Chat</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />
    </div>
    <h1 className='mt-1 text-lg font-semibold'>Introducing Chat</h1>
    <p className='opacity-65 text-sm w-[30rem]'>Your AI Coding Agent that helps you convert your prompts into working deployed applications</p>
    </div>

    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#6441A5] to-[#2A0845] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Chat</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />

    </div>
    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#6441A5] to-[#2A0845] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Chat</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />

    </div>
    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#6441A5] to-[#2A0845] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Chat</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />

    </div>
    <div className='relative h-[18.5rem] w-[30rem] bg-gradient-to-b from-[#6441A5] to-[#2A0845] rounded-lg pl-7 overflow-hidden' >
     <h1 className={`text-2xl opacity-90 mt-2`}>Codemate Chat</h1>
     <img src="build.svg" className='absolute -bottom-5 -right-14 size-[90%]' alt="" />

    </div>
  </div>
{/* features of products */} 
 </div>
    


    </div>
</div>

<div className={`${montserrat.className} h-[100vh] w-full bg-zinc-950 text-white z-50`}>
 <div className='pt-[15rem]'>
 <h1 className='text-center text-7xl font-bold text-white  opacity-45'>Trusted By</h1>
 <p className='text-center mt-2 text-xl opacity-30'>The Developers from the well known orgs around the globe</p>
     
     <div className="grid grid-cols-3 place-items-center justify-items-center px-32 mt-10  h-full opacity-30 gap-10">
      <img src="https://drive.codemate.ai/Amazon.png" alt="Amazon" className="logo" />
      <img src="https://drive.codemate.ai/atlassian.png" alt="Atlassian" className="logo" />
      <img src="https://drive.codemate.ai/innovacer.png" alt="Innovacer" className="logo" />
      <img src="https://drive.codemate.ai/FamPay.png" alt="FamPay" className="logo" />
      <img src="https://drive.codemate.ai/paypal.png" alt="Paypal" className="logo" />
      <img src="https://drive.codemate.ai/adobe.png" alt="Adobe" className="logo" />
      
</div>
 </div>
</div> 


<div ref={productsWrapper} className='-z-20'>
  {isProds &&      
  <AnimatePresence mode="wait">
  <motion.div
    key={1} 
     exit={{opacity:0,filter:'blur(20px)'}}
     initial={{opacity:0,filter:'blur(20px)'}}
     animate={{opacity:1,filter:'blur(0px)'}}
     transition={{duration:0.8}}
     className='fixed top-0 left-32 h-full w-[70%] flex items-center justify-center z-50'>

      
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

      {!isRef2 && !isRef3 &&      
    <motion.div 
     style={{x:div3X}} exit={{opacity:0,filter:'blur(20px)'}} key={4} className='absolute left-[30rem] h-[30vw] w-[58vw] rounded-xl  text-white '>
             <motion.div style={{x:xE}} className='h-full w-full overflow-y-auto'>
             <CodeOverlay ref={codeOverlayRef}/> 

        <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/> 
        </motion.div>
     </motion.div>  }
     </motion.div>
     </AnimatePresence> }


   {/* products showcase */}
   <div 
   ref={productShowRef} 
   
   className='relative h-[200vw] w-full bg-zinc-950'>
   
 <div className={`${montserrat.className}  text-5xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-14 mb-6 pt-20 pr-[62vw] 2xl:pr-[55vw] pb-1`}>We got<span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'> Everything</span> for you.</div>
    
   <div className='sticky  panelTitle z-40'> 
        <motion.div 
        initial={{opacity:0,filter:'blur(10px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{delay:0.2,duration:0.6}}
        className={`${montserrat.className}  text-2xl pr-[6rem] font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent  pt-2 pb-2 w-full text-right`}>From <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent text-4xl'>Web-Application</span></motion.div>
   </div>

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
          <h1 className='text-2xl'>Documentation</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>
         
                 <motion.div 
                 style={{opacity:op2}}
                 className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>Code Maintnance</h1>

          <p className='text-sm opacity-70'>
            We’re your AI coding partner, here to handle the messy parts — from stubborn bugs to broken features while You focus on your vision.
          </p>
        </motion.div>


                <motion.div 
                style={{opacity:op3}}
                className='text-white flex flex-col gap-2'>
          <h1 className='text-2xl'>PR Review</h1>

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


      <div className='sticky  panelTitle  z-50'> 
        <div className={`${montserrat.className}  text-2xl pl-[6rem] font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent  pt-2 pb-2 w-full `}>To your<span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent text-4xl'> IDE</span></div>
   </div>



 <div className={`${montserrat.className}  text-5xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pr-16 mb-6 pt-20 text-right pl-[50vw] pb-1 z-50`}>Everything means <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>Everything</span> right?</div>

     <motion.div 
     initial={{opacity:0,filter:'blur(50px)'}}
     whileInView={{opacity:1,filter:'blur(0px)'}}
     transition={{duration:0.8}}
     className='sticky h-screen top-0 w-full flex  items-center z-50'>
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


      <div className='relative flex justify-center items-center w-[70%] z-50'>

        
      <motion.div 
      ref={feature1Ref}
      
      className='relative h-[30vw] w-[58vw] opacity-80 rounded-xl flex justify-center items-center ml-[3.3rem] mb-4 '>

          

       {/* {isRef1 && <motion.div className='absolute h-full w-full rounded-xl '>
          <CodeOverlay ref={codeOverlayRef}/> 

        <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/>
        </motion.div>} */}

        
       {isRef2 &&  <motion.div
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1}}
        
        className=' absolute h-full w-full bg-zinc-900 rounded-xl flex  opacity-100'>

        {isLoad2 && <div data-lenis-prevent><CodeReviewOverlay/></div>}
         
        <div data-lenis-prevent className='w-full'>
        <CodeEditor  comp1={ReviewComponent} comp2={fixedComponent} isFix={isFix}/>
        </div> 
        </motion.div>}

       {isRef3 &&  <motion.div
        
        initial={{opacity:0,filter:'blur(20px)'}}
        animate={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1}}
        
        className=' absolute h-full w-full bg-zinc-900 rounded-xl flex  opacity-100'>
               <AutoCodeEditor comp1={AutoCompleteComponent}  isFix={isAuto}/>
                {/* <CodeEditor  />   */}
        </motion.div>}

        {/* <CodeOverlay ref={codeOverlayRef}/> 

        <CodeEditor comp1={brokenComponent} comp2={fixedComponent} isFix={isFix}/> */}


{/* 
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
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer -z-10'>
       

          Debug

      


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
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer -z-10'>
       

         Review


      


      </motion.div>
      


      
        <motion.div 
        exit={{x:0}} 
  
        key={3}

        style={{background: 'rgba(255, 255, 255, 0.02)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        y:drawerX3,
        backdropFilter: 'blur(4.7px)',
        WebkitBackdropFilter: 'blur(4.7px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className='absolute bottom-0 right-8 py-2 px-4 bg-white rounded-b-2xl text-2xl  flex flex-col justify-center items-center  text-white cursor-pointer -z-10'>
       
        Auto-Complete

        </motion.div>
        
</AnimatePresence> */}



      </motion.div>  
       
       {/* <motion.h1 
       style={{y:featureTitleY,opacity:featureTitleOpacity}}
       className='absolute text-7xl text-nowrap'>You can do much more with just Plugin...</motion.h1> */}
      </div>

        <div 
        className='relative w-[34%] h-full flex justify-end pr-[3.5rem] py-10 gap-10 z-50'> 

       {isRef1 && !isRef2 && !isRef3 &&   
      <div className={`${montserrat.className}relative w-full z-[99999999]`}>
         <div className='z-[99999998]'>
          <h1 className={`${montserrat.className} text-white text-6xl mb-5 mt-24 z-[99999996] font-semibold`}>Debug</h1>
       <motion.span

       className='z-[99999997]'
       >

        <p className={`${montserrat.className} text-xl  z-[99999996]`}><span className='opacity-60'>An</span> <span className='text-[#00BFFF] font-semibold'>AI-Powered Debugger</span> <span className='opacity-60'>that quickly identifies errors, explains their causes, and suggests precise fixes—making it easier to resolve issues and keep development moving smoothly.</span></p> 
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 z-[99999996]'>
        <div className='mt-10'>
        <LoaderOne/>
        </div>
        </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlay} className={`${montserrat.className} bg-gradient-to-br border-y-[0.1px]  border-[#F0EAD6]/80 from-[#F0EAD6]/90  to-[#FAF9F6]/5  text-lg rounded-[25px] px-6 text-black py-2 mt-10 hover:opacity-70 z-[99999996]`}>
          <span className='font-semibold  text-zinc-950'>Debug</span> this code
        </button>} 
        </div>

      </div>
      }


      {isRef2 && !isRef1 && !isRef3 &&       
      <div className='relative w-full z-[99999999]'>
         <div className='z-[99999998]'>
          <h1 className={`${montserrat.className} text-white text-6xl mb-5 mt-24 z-[99999996] font-semibold`}>Review</h1>
       <motion.span

       className='z-[99999997]'
       >

        <p className={`${montserrat.className} text-xl  z-[99999996]`}><span className='opacity-60'>An</span> <span className='text-[#00BFFF] font-semibold'>AI-Powered Code Reviewer</span> <span className='opacity-60'>that scans your code in real time, detects bugs and vulnerabilities, and suggests improvements for readability, performance, and best practices—helping you write cleaner, more reliable code faster.</span></p> 
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 z-[99999996]'>
        <LoaderOne/>
        </motion.span>  :         <button ref={debugBtnRef} onClick={handleOverlayR} className={`${montserrat.className} bg-gradient-to-br border-y-[0.1px] border-[#F0EAD6]/80 from-[#F0EAD6]/80 to-[#FAF9F6]/10 text-lg rounded-[25px] px-6 text-black py-2 mt-10 hover:opacity-70 z-[99999996]`}>
            <span className='font-semibold  text-zinc-950'>Review</span> this code
        </button>} 
        </div>

      </div>}

      {isRef3 && !isRef1 && !isRef2 &&       
      <div className='relative w-full z-[99999999]'>
         <div className='z-[99999998]'>
          <h1 className={`${montserrat.className} text-white text-5xl mb-5 mt-24 z-[99999996] font-semibold`}>Auto-Complete</h1>
       <motion.span

       className='z-[99999997]'
       >

        <p className={`${montserrat.className} text-xl  z-[99999996]`}><span className='opacity-60'>An</span> <span className='text-[#00BFFF] font-semibold'>Intelligent Auto-Completer</span> <span className='opacity-60'>tool that predicts your next lines of code, reduces repetitive typing, and speeds up development by suggesting accurate, context-aware completions in real time.</span></p> 
       </motion.span>

       {isLoad?    
        <motion.span 
        initial={{opacity:0,filter:'blur(20px)'}}
        whileInView={{opacity:1,filter:'blur(0px)'}}
        transition={{duration:1,delay:1}}
        className='mb-10 z-[99999996]'>
        <LoaderOne/>
        </motion.span>  :         <div className={`${montserrat.className} text-2xl  mt-10 cursor-not-allowed font-extralight z-[99999996] opacity-30`}>
        <span>Press</span> <span className='font-mono text-3xl '>"TAB"</span> <span>to auto-complete</span>

        
        </div>} 
        </div>

      </div>}

        <div className=''>
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
     {/* <div className=' relative h-[170vh] w-full bg-zinc-950 text-white overflow-hidden'>
   <div className={`${montserrat.className}  text-8xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 text-center pb-1`}>What<span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'> else</span> we got?</div>
   
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

  </div>  */}
{/* bento   */}



  <div ref={testiRef} className='relative h-[600vh] w-full bg-zinc-950 '>
         <div className={`${montserrat.className}  text-6xl font-semibold bg-gradient-to-b from-white to-gray-300/80 bg-clip-text  text-transparent pl-10 mb-6 pt-20 text-center`}>Do not listen to us but from <span className='bg-gradient-to-b from-[#00BFFF] to-[#1E90FF] bg-clip-text text-transparent'>People</span></div>

   <div className=' sticky top-0   h-screen w-full overflow-x-hidden '>
       
<div
className='relative h-full w-full flex  items-center justify-center   pl-10 py-3 overflow-hidden'>


     {/* <motion.div 
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
     </motion.div> */}

      
        <img src="/codemateLogoB.svg" className='absolute object-fit w-[95vw] ' alt="" />
    


     <div className={`${montserrat.className} text-white h-full w-full flex items-center justify-center flex-col`}>
     <motion.div className='absolute  h-[30rem] w-[40rem]  rounded-3xl'></motion.div>
     

     <motion.div 
     style={{y:tdiv1X}}
     className='absolute  h-[30rem] w-[40rem]  rounded-3xl flex justify-center items-center'>
      <motion.div 
      animate={{rotate:10}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'><img src="https://drive.codemate.ai/ayushbansal.jpeg" alt="" className='size-20 rounded-full' /></div>
      <div className='flex flex-col'>
       <h1 className='font-semibold text-2xl'>Ayush Bansal</h1>
        <p className='opacity-60'>Software Engineer-II, Amazon</p> 
      </div>
       </div>

       <div className='text-2xl'><span className='text-[#00BFFF]'>CodeMate.ai</span> has revolutionized my coding workflow with accurate AI suggestions and a user-friendly interface. Highly recommended!</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
     </motion.div>
     <motion.div
     style={{y:tdiv2X}} 
     className='absolute  h-[30rem] w-[40rem]  rounded-3xl flex justify-center items-center'>
            <motion.div 
      animate={{rotate:5}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'><img src="https://drive.codemate.ai/hani.webp" alt="" className='size-20 rounded-full' /></div>
      <div className='flex flex-col'>
        <h1 className='font-semibold text-2xl'>Hani H.</h1>
        <p className='opacity-60'>Founder</p> 
      </div>
       </div>

       <div className='text-2xl'><span className='text-[#00BFFF]'>CodeMate</span> has lots of great features. You can request code samples when stuck, or get a code review to spot issues you might miss. The Debugger is a life saver—it quickly found a bug in my code that was filling the error logs!</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
     </motion.div>
     <motion.div style={{y:tdiv3X}} className='absolute  h-[30rem] w-[40rem]  rounded-3xl flex justify-center items-center'>
      <motion.div 
      animate={{rotate:0}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'><img src="https://drive.codemate.ai/vilkho_appsumo.webp" alt="" className='size-20 rounded-full' /></div>
      <div className='flex flex-col'>
       <h1 className='font-semibold text-2xl'>Vilkhovskiy</h1>
        <p className='opacity-60'>Chief Executive Officer, Softenq</p> 
      </div>
       </div>

       <div className='text-2xl'>An excellent solution for project analysis and efficient development! I love how <span className='text-[#00BFFF]'>CodeMate</span> can analyze an entire project, assign tasks for refactoring or code generation, and even ensure the project is covered with tests.</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
      </motion.div>  
     <motion.div style={{y:tdiv4X}} className='absolute  h-[30rem] w-[40rem]  rounded-3xl flex justify-center items-center'>
            <motion.div 
      animate={{rotate:-5}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'><img src="https://i.pravatar.cc/150?u=kitty.liu" alt="" className='size-20 rounded-full' /></div>
      <div className='flex flex-col'>
       <h1 className='font-semibold text-2xl'>Kitty Liu</h1>
        <p className='opacity-60'>Engineering</p> 
      </div>
       </div>

       <div className='text-2xl'><span className='text-[#00BFFF]'>Codemate</span> is doing a great job with its simplicity. I can't wait to see more features they are going to release soon.</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
     </motion.div>
     <motion.div style={{y:tdiv5X}} className='absolute  h-[30rem] w-[40rem] rounded-3xl flex justify-center items-center'>
                  <motion.div 
      animate={{rotate:-10}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'><img src="https://i.pravatar.cc/150?u=david.kim" alt="" className='size-20 rounded-full' /></div>
      <div className='flex flex-col'>
       <h1 className='font-semibold text-2xl'>Keith Price</h1>
        <p className='opacity-60'>Backend Engineer</p> 
      </div>
       </div>

       <div className='text-2xl'>Love this tool! It can train on the entire solution (and others), saving so much time and frustration. <span className='text-[#00BFFF]'>Unlike ChatGPT</span>, it finds the right methods and code blocks with ease, and the ability to retain training on past solutions is phenomenal.</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
     </motion.div>
     {/* <motion.div style={{y:tdiv6X}} className='absolute  h-[30rem] w-[40rem]  rounded-3xl flex justify-center items-center'>
                        <motion.div 
      animate={{rotate:-15}}
      className='h-[70%] w-[90%] bg-[#131316] border border-[#434344] rounded-[2rem] flex flex-col items-cente px-8 py-5 gap-5'>
       <div className='flex w-full gap-4 items-center'>
       <div className='rounded-full bg-white size-20'></div>
      <div className='flex flex-col'>
       <h1>Ayush Bansal</h1>
        <p>Software Engineer-II, Amazon</p> 
      </div>
       </div>

       <div className='text-2xl'>CodeMate.ai has revolutionized my coding workflow with accurate AI suggestions and a user-friendly interface. Highly recommended!</div>

       <div className='w-full flex justify-between'>
       </div>
      </motion.div>
     </motion.div> */}
     </div> 
</div>

   </div>
     </div>


    <Footer/>
    </div>


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
       className='hidden absolute h-full w-full bg-zinc-900 z-50 rounded-xl text-white flex flex-col gap-5 p-10'>
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

function CodeReviewOverlay(){
  const code1 = `<button onClick={() => setCount(count + 1)}>+</button>
<button onClick={() => setCount((prev) => Math.max(prev - 1, 0))}>-</button>`

  const code2 = `<button onClick={() => setCount((prev) => prev + 1)}>+</button>
<button onClick={() => setCount((prev) => prev - 1)}>-</button>`

  const code3 = `<button aria-label="Increase count" onClick={() => setCount((prev) => prev + 1)}>+</button>
<button aria-label="Decrease count" onClick={() => setCount((prev) => prev - 1)}>-</button>`

  const code4 = `<div className="flex items-center gap-4">
  <h2 className="text-xl font-bold">Count: {count}</h2>
  <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => setCount((prev) => prev + 1)}>+</button>
  <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => setCount((prev) => prev - 1)}>-</button>
</div>`
  return(
      <motion.div 
       
       initial={{opacity:0,filter:'blur(20px)'}}
       animate={{opacity:1,filter:'blur(0px)'}}
       transition={{duration:1.5}}
       className='absolute h-full w-full bg-zinc-900 z-50 rounded-xl text-white flex flex-col  p-10 overflow-y-auto'>
       {/* <LoaderFive text="Reviewing Inprogress..."/> */}


      {/* <TypingAnimation className='text-2xl font-mono opacity-90'> </TypingAnimation> */}
      
<TextAnimate
  animation="blurInUp"
  once={true}
  by="character"
  duration={2}
  className={`${montserrat.className} font-semibold text-md opacity-80 mt-3 mb-3`}
>
  {`Your code is perfectly valid and works as expected. — it’s a simple counter component. \n here’s some suggestions for improvements:-`}
</TextAnimate>
      
      <motion.h1 
      initial={{opacity:0,filter:'blur(20px)'}}
      animate={{opacity:1,filter:'blur(0px)'}}
      transition={{duration:1,delay:2}}
      className='mt-4 mb-4'>🔧 Possible Improvements</motion.h1>

      <motion.div  
      initial={{opacity:0,filter:'blur(20px)'}}
      animate={{opacity:1,filter:'blur(0px)'}}
      transition={{duration:1,delay:4}}
      className="font-mono  text-md flex flex-col">
        <h1 className='opacity-75'>1. Prevent negative values (if that’s not desired):</h1>
        <div className='h-20 w-full bg-zinc-950 rounded-xl mt-2 mb-4'>
          <div className='ml-3 text-xs mt-1'>tsx</div>
          <SyntaxHighlighter  language='jsx' style={vscDarkPlus}>
            {code1}
            </SyntaxHighlighter>
          
        </div>
      </motion.div>
       

      <motion.div 
      initial={{opacity:0,filter:'blur(20px)'}}
      animate={{opacity:1,filter:'blur(0px)'}}
      transition={{duration:1,delay:5}}
      className="font-mono  text-md flex flex-col mt-3">
        <h1 className='opacity-75'>2. Use functional updates (best practice when updating based on the previous state):</h1>
        <div className='h-20 w-full bg-zinc-950 rounded-xl mt-2 mb-4'>
          <div className='ml-3 text-xs mt-1'>tsx</div>
          <SyntaxHighlighter  language='jsx' style={vscDarkPlus}>
            {code2}
            </SyntaxHighlighter>
          
        </div>
      </motion.div>

      <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
      animate={{opacity:1,filter:'blur(0px)'}}
      transition={{duration:1,delay:6}}
      className="font-mono  text-md flex flex-col mt-3">
        <h1 className='opacity-75'>3. Accessibility – Add aria-label or descriptive text for screen readers:</h1>
        <div className='h-20 w-full bg-zinc-950 rounded-xl mt-2 mb-4'>
          <div className='ml-3 text-xs mt-1'>tsx</div>
          <SyntaxHighlighter  language='jsx' style={vscDarkPlus}>
            {code3}
            </SyntaxHighlighter>
          
        </div>
      </motion.div>

      <motion.div 
            initial={{opacity:0,filter:'blur(20px)'}}
      animate={{opacity:1,filter:'blur(0px)'}}
      transition={{duration:1,delay:7}}
      className="font-mono  text-md flex flex-col mt-3 mb-56">
        <h1 className='opacity-75'>4. Styling – Add some minimal Tailwind or CSS for better UI (optional):</h1>
        <div className='h-20 w-full bg-zinc-950 rounded-xl mt-2 mb-4'>
          <div className='ml-3 text-xs mt-1'>tsx</div>
          <SyntaxHighlighter  language='jsx' style={vscDarkPlus}>
            {code4}
            </SyntaxHighlighter>
          
        </div>
      </motion.div>


       </motion.div>

       
  )
}