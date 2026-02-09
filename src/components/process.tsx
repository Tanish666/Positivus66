'use client'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const processSteps = [
    {
        index: 1,
        title: "Consultation",
        content: "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements."
    },
    {
        index: 2,
        title: "Research and Strategy Development",
        content: "We conduct detailed research to understand your specific market position, competitors, and opportunities. This helps us create a strategic roadmap effective for your business growth."
    },
]

function Process() {
    const [openIndex, setOpenIndex] = useState<number | null>(1)

    return (
        <div className='space-y-5'>
            {processSteps.map((step) => (
                <div
                    key={step.index}
                    onClick={() => setOpenIndex(prev => prev === step.index ? null : step.index)}
                    className={`
            p-8 rounded-[2rem] border border-black border-b-[5px] transition-all duration-300 cursor-pointer
            ${openIndex === step.index ? 'bg-[#B9FF66]' : 'bg-[#F3F3F3]'}
          `}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-5 items-center'>
                            <h1 className='text-3xl sm:text-6xl font-medium'>{'0' + step.index}</h1>
                            <h1 className='text-lg sm:text-2xl font-semibold w-[50vw] sm:w-auto'>{step.title}</h1>
                        </div>

                        <div className='flex p-2 items-center justify-center rounded-full border border-black bg-[#F3F3F3]'>
                            {openIndex === step.index ? <Minus size={20} /> : <Plus size={20} />}
                        </div>
                    </div>

                    {openIndex === step.index && (
                        <div className='space-y-5 mt-8'>
                            <div className='w-full h-[1px] bg-black' />
                            <p className='text-lg'>{step.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Process
