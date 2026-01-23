'use client'
import React from 'react'
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {delay, motion} from 'framer-motion'
import { Inter } from "next/font/google";
import { Poppins } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { ReviewCard } from './heroMarquee';
import { Scale } from 'lucide-react';
const inter = Inter({
    weight: "300",
    subsets: ["latin"],
  });

  const inter2 = Inter({
    weight: "400",
    subsets: ["latin"],
  });

  const poppins = Poppins({
    subsets: ["latin"],
    weight:"300",
  }); 

  const poppins2 = Poppins({
    subsets: ["latin"],
    weight:"500",
  });

  const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose what you need
  });
  

function Section2() {

  const [setAnimation,animation] = useState<boolean>(false);
  const reviewCard = {          
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "/mr1.mp4",
}


  return (
    <motion.div className='relative  h-screen w-full bg-[#EFEFEF] flex flex-col justify-center items-center p-10 overflow-hidden z-50'>

<motion.div className='flex flex-col justify-center items-center ' whileInView={{opacity:0,y:100,filter:'blur(20px)'}} transition={{delay:5,duration:0.5}}>
    <div className='flex gap-3 mb-7'>
      <div className='p-1 rounded-full bg-[#FAF9F6]'>
      <svg width={23} height={23} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12H22M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </div>
      <div className='p-1 rounded-full bg-[#FAF9F6]'>
      <svg width={23} height={23} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </div>
    </div>
    <motion.p 
    initial={{opacity:0,y:100,filter:'blur(20px)'}}
    whileInView={{opacity:1,y:0,filter:'blur(0px)'}}
    transition={{delay:0.5,duration:0.5}}
    viewport={{ once: true }}
    className={`${inter.className} text-5xl text-black mx-[12vw] text-center font-extralight leading-tight`}>Even if your operator is relucatant to appear on camera, <span className='px-2 py-1 rounded-3xl bg-[#B7DE8F] text-center'>our AI expresses engagement through</span> text or facial expressions</motion.p>
    </motion.div>
 
     <motion.div 
     whileInView={{y:100,filter:'blur(10px)',opacity:0}}
     transition={{delay:7}}
     className='absolute h-full w-full flex justify-center items-center'>
        <motion.p 
        initial={{y:100,filter:'blur(10px)',opacity:0}}
        whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
        transition={{delay:5,duration:0.5}}
        className={`${poppins2.className} text-black text-6xl`}>Introducing  <span className='px-4 py-0 rounded-3xl bg-[#B7DE8F] text-center'>Live Chat</span> Of The Future</motion.p>
     </motion.div>



    {/* real animation starts from here */}
     <motion.div 
     initial={{y:100,filter:'blur(10px)',opacity:0}}
     whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
     transition={{delay:7,duration:0.5}}

     className='absolute h-full w-full flex justify-center items-center'>
        <motion.div 

        className={`${poppins2.className} text-black text-6xl flex justify-center items-center gap-10 w-fit`}>Smart AI <motion.div  initial={{scale:0,height:"0%",width:"0%"}} whileInView={{scale:1,height:"35%",width:"33%"}} transition={{duration:1,delay:7.5}}>
            <PreviewCard img={reviewCard.img} body={reviewCard.body} username={reviewCard.username} name={reviewCard.name}/></motion.div> Video</motion.div>
     </motion.div>
     
     <motion.p 
     initial={{y:100,filter:'blur(10px)',opacity:0}}
     whileInView={{y:0,filter:'blur(0px)',opacity:1}}
     transition={{duration:0.5,delay:8}}
     className={`${inter2.className} absolute text-black w-[15vw]  mt-[15rem] mr-[40rem] `}>
     Seamless integration ensure that visitors perceive it as a live video chat experience
     </motion.p>

     {/* headphones */}
     <motion.div 
     initial={{y:100,filter:'blur(10px)',opacity:0}}
     whileInView={{y:0,filter:'blur(0px)',opacity:1}}
     transition={{duration:0.5,delay:8}}
     className={`${inter2.className} absolute text-black flex flex-col justify-center items-center px-10 py-7 bg-white  rounded-xl mt-[23rem] ml-[42rem]`}>
      <div className='relative flex flex-col justify-center items-center'>
      <motion.div 
      initial={{scale:1.1,rotate:180}}
      whileInView={{scale:1,rotate:0}}
      transition={{duration:1,delay:8}}
      className='absolute bg-black p-2 rounded-full -top-12'>
        <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 17V13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13V17M7.5 21C6.11929 21 5 19.8807 5 18.5V15.5C5 14.1193 6.11929 13 7.5 13C8.88071 13 10 14.1193 10 15.5V18.5C10 19.8807 8.88071 21 7.5 21ZM16.5 21C15.1193 21 14 19.8807 14 18.5V15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V18.5C19 19.8807 17.8807 21 16.5 21Z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg></motion.div>  
      <p>Chatbot and Virtual</p>
      <p>Assitants</p>
      </div>
     </motion.div>
     {/* headphones */}


      {/* 40% */}
      <motion.div 
      initial={{scale:0.8,y:50,filter:'blur(10px)',opacity:0}}
      whileInView={{y:0,filter:'blur(0px)',opacity:1}}
     transition={{duration:1,delay:8.2}}
      className='absolute flex text-black py-2 px-4  gap-3 bg-white justify-center items-center top-0 mt-[10rem] mr-[30rem] rounded-xl shadow-xl'>
        <div className='bg-black rounded-lg p-3 flex justify-center items-center h-fit'>
        <svg width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 </svg></div>
     <div className={`${inter2.className} w-[10rem]`}>
        <p className={`font-mono text-2xl`}>40%</p>
        <p className='text-sm '>increase in customer satisfaction</p>
     </div>
      </motion.div>
    {/* 40% */}


    {/* facechat */}
    <motion.div 
      initial={{scale:0.8,y:50,filter:'blur(10px)',opacity:0}}
      whileInView={{y:0,filter:'blur(0px)',opacity:1}}
      transition={{duration:1,delay:8.2}}
      className='absolute flex text-black py-3 px-4  gap-3 bg-white justify-center items-center top-0 mt-[5rem] ml-[30rem] rounded-xl shadow-xl'>
        <div className='bg-black rounded-lg p-3 flex justify-center items-center h-fit'>
        <svg width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16M7.5 8V9.5M16.5 8V9.5M11 12.6001C11.8 12.6001 12.5 11.9001 12.5 11.1001V8M15.2002 15.2C13.4002 17 10.5002 17 8.7002 15.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </div>
     <div className={`${inter2.className}`}>
        <p className={`text-lg`}>Face-to-Face</p>
        <p className='text-lg '>Expreince</p>
     </div>
      </motion.div>
    {/* facechat */}

    {/* ai feature */}
    <motion.div 
    initial={{scale:0.8,filter:'blur(10px)',opacity:0}}
    whileInView={{filter:'blur(0px)',opacity:1}}
    transition={{duration:1,delay:8.2}}
    className='absolute top-9 ml-24 bg-white py-1 px-12 rounded-2xl flex justify-center items-center'>
      
      <div className={`${inter2.className} relative text-black w-full flex justify-center items-center`}>
        <div className='absolute p-2 rounded-full bg-[#E2DFD2] -left-[2.8rem]'>
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.49954 9H21.4995M9.99954 3L7.99954 9L11.9995 20.5L15.9995 9L13.9995 3M12.6141 20.2625L21.5727 9.51215C21.7246 9.32995 21.8005 9.23885 21.8295 9.13717C21.8551 9.04751 21.8551 8.95249 21.8295 8.86283C21.8005 8.76114 21.7246 8.67005 21.5727 8.48785L17.2394 3.28785C17.1512 3.18204 17.1072 3.12914 17.0531 3.09111C17.0052 3.05741 16.9518 3.03238 16.8953 3.01717C16.8314 3 16.7626 3 16.6248 3H7.37424C7.2365 3 7.16764 3 7.10382 3.01717C7.04728 3.03238 6.99385 3.05741 6.94596 3.09111C6.89192 3.12914 6.84783 3.18204 6.75966 3.28785L2.42633 8.48785C2.2745 8.67004 2.19858 8.76114 2.16957 8.86283C2.144 8.95249 2.144 9.04751 2.16957 9.13716C2.19858 9.23885 2.2745 9.32995 2.42633 9.51215L11.385 20.2625C11.596 20.5158 11.7015 20.6424 11.8279 20.6886C11.9387 20.7291 12.0603 20.7291 12.1712 20.6886C12.2975 20.6424 12.4031 20.5158 12.6141 20.2625Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
        <p className='opacity-80 text-lg'>smart ai features</p>
      </div>

    </motion.div>
     {/* ai feature */} 
     
     {/* bluetooth */}
     <motion.div 
       initial={{scale:0.8,y:100,filter:'blur(10px)',opacity:0,rotate:180}}
       whileInView={{filter:'blur(0px)',opacity:1,y:0,rotate:0}}
       transition={{duration:1,delay:8.2}}
       className='absolute bg-white py-2 px-3 flex justify-center items-center gap-1 rounded-xl ml-[33rem] mb-[10rem]'>
        <div className='p-1 border border-gray-300 rounded-full'>
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>

        <div className='p-1 border border-gray-300 rounded-full'>
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7L18 17L12 22V2L18 7L6 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
        </div>
       </motion.div>
       {/* bluetooth */}


       {/* testimonials */}
        <motion.div 
        initial={{scale:0.8,y:-50,filter:'blur(10px)',opacity:0,rotate:180}}
        whileInView={{filter:'blur(0px)',opacity:1,y:0,rotate:0}}
        transition={{duration:1,delay:8.5}}
        className='absolute flex top-24 mr-[35rem]'>
         <motion.div 
         initial={{x:47.8}} 
         whileInView={{x:10}}
         transition={{duration:0.5,delay:9.3}}
         className='size-12 rounded-full bg-white p-1 overflow-hidden flex justify-center items-center'><img src="https://photoheads.co.uk/wp-content/uploads/2020/05/headshot-with-client-testimonial.jpg" alt=""  className='object-cover h-full w-full rounded-full'/></motion.div>
         <div className='relative size-12 rounded-full bg-white z-20  p-1 overflow-hidden flex justify-center items-center'>
         <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  className='object-cover h-full w-full rounded-full'/>
         </div>
         <motion.div 
         initial={{x:-47.8}} 
         whileInView={{x:-10}}
         transition={{duration:0.5,delay:9.3}}
         className='size-12 rounded-full bg-white p-1 overflow-hidden flex justify-center items-center'>
          <img src="https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  className='object-cover h-full w-full rounded-full'/>
         </motion.div>
        </motion.div>
       {/* testimonials */}
  </motion.div>
  )
}

export default Section2


export const PreviewCard = ({
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
          "relative cursor-pointer flex justify-center overflow-hidden rounded-[2rem] border h-[72vh] w-[18vw] mt-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
         
        )}
      >
        <video src={img}  className='h-full w-full object-cover'></video>

        <div className='absolute flex justify-center items-center w-full bottom-[0.80rem] gap-3'>

        <div className='items-center w-[70%] rounded-[1.9rem] bg-black  text-white  px-2 py-[0.7rem]  gap-5 overflow-hidden'><h1 className='text-[1rem] opacity-70 text-nowrap  w-full text-center'>Say Hello</h1>
  </div>
  <div className='relative flex justify-center items-center'>
  <span className='p-2 bg-white rounded-full z-10'>
  <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='opacity-70'/>
 </svg>
  </span>
  </div>
  </div>

    <div className='absolute top-5 right-5 flex gap-2'>
      <div className='flex justify-center items-center p-3 border border-white rounded-full bg-white bg-opacity-30'>
      <svg width={23} height={23} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4 7C4 6.06812 4 5.60218 4.15224 5.23463C4.35523 4.74458 4.74458 4.35523 5.23463 4.15224C5.60218 4 6.06812 4 7 4H17C17.9319 4 18.3978 4 18.7654 4.15224C19.2554 4.35523 19.6448 4.74458 19.8478 5.23463C20 5.60218 20 6.06812 20 7M9 20H15M12 4V20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
      </div>

      <div className='flex justify-center items-center p-3 bg-white rounded-full'>
      <svg width={23} height={23} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M22 17V13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13V17M7.5 21C6.11929 21 5 19.8807 5 18.5V15.5C5 14.1193 6.11929 13 7.5 13C8.88071 13 10 14.1193 10 15.5V18.5C10 19.8807 8.88071 21 7.5 21ZM16.5 21C15.1193 21 14 19.8807 14 18.5V15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V18.5C19 19.8807 17.8807 21 16.5 21Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
      </div>
    </div>
      </figure>
    )
  }