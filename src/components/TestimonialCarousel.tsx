"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
        name: "John Smith",
        role: "Marketing Director at XYZ Corp",
    },
    {
        text: "Positivus has transformed our digital strategy. Their expertise in SEO and PPC is unmatched. We've seen a 200% ROI in just six months.",
        name: "Jane Doe",
        role: "CEO at TechStart Inc.",
    },
    {
        text: "The team at Positivus is simply amazing. They delivered a beautiful website that perfectly represents our brand. Our conversion rates have skyrocketed!",
        name: "Michael Brown",
        role: "Founder at Creative Solutions",
    },
    {
        text: "Working with Positivus was the best decision we made. Their data-driven approach ensured we targeted the right audience effectively.",
        name: "Emily Davis",
        role: "CMO at Retail Giants",
    },
    {
        text: "Exceptional service and results. Positivus helped us scale our business rapidly through targeted social media campaigns.",
        name: "David Wilson",
        role: "Director at GrowthHackers",
    },
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    // Configuration
    const gap = 40; // match gap-10
    // On mobile (md breakpoint 768), use full width minus padding, max 600px on desktop
    const isMobile = windowWidth < 768;
    const itemWidth = isMobile ? windowWidth - 48 : 600;

    // Center alignment logic:
    // We want the current item's center to be at the center of the container.
    // The container has ml-[50%], so it starts at the center of the screen.
    // The items are in a flex row.
    // To center the i-th item:
    // x = - (i * (width + gap)) - width/2
    const xOffset = -(currentIndex * (itemWidth + gap) + itemWidth / 2);

    // Initial render hydration mismatch prevention: render nothing or desktop default until mounted
    // But since we use use client, we can just wait for windowWidth to be set > 0
    if (windowWidth === 0) return null;

    return (
        <div className='bg-[#191A23] overflow-hidden py-10 rounded-[3rem] w-full'>
            <div className='relative w-full overflow-hidden mb-20'>
                <motion.div
                    className='flex gap-10 ml-[50%]'
                    animate={{ x: xOffset }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {testimonials.map((item, index) => (
                        <div key={index} className='shrink-0 flex justify-center' style={{ width: itemWidth }}>
                            <QuoteBubble text={item.text} name={item.name} role={item.role} />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className='w-full flex items-center justify-center mt-10'>
                <div className='flex items-center justify-between w-full px-5 md:w-[50vw] md:px-0 max-w-sm'>
                    <button onClick={handlePrev} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                        <Image src="/left.svg" width={23} height={23} alt="Previous" />
                    </button>
                    <div className='flex gap-2'>
                        {testimonials.map((_, index) => (
                            <button key={index} onClick={() => handleDotClick(index)} className="focus:outline-none">
                                <Image
                                    src={currentIndex === index ? "/tick.svg" : "/tick2.svg"}
                                    width={23}
                                    height={23}
                                    alt={`Go to slide ${index + 1}`}
                                    className="transition-all duration-300"
                                />
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNext} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                        <Image src="/right.svg" width={23} height={23} alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    );
};

function QuoteBubble({ text, name, role }: { text: string; name: string; role: string }) {
    return (
        <div className="flex flex-col items-center md:items-start p-6 max-w-2xl w-full">
            <div className="relative text-gray-200 text-[16px] leading-relaxed py-8 px-6 md:px-16 rounded-[3rem] border-2 border-lime-400 mb-8 w-full">
                <p>
                    “{text}”
                </p>

                {/* Bubble Tail */}
                <div className="absolute -bottom-[22px] left-10 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-lime-400"></div>
                <div className="absolute -bottom-[18px] left-[42px] w-0 h-0 border-l-[18px] border-r-[18px] border-t-[18px] border-l-transparent border-r-transparent border-t-[#1a1f2e]"></div>
            </div>
            <div className='flex flex-col ml-14'>
                <h1 className='text-[#B9FF66] font-bold text-lg'>{name}</h1>
                <p className='text-[#FFFFFF]'>{role}</p>
            </div>
        </div>
    );
}

export default TestimonialCarousel;
