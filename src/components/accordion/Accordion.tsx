import React, { useState } from 'react'
import { ArrowDown } from 'lucide-react'

interface AccordionProps {
	title: string
	children: React.ReactNode
}

export default function Accordion({ title, children }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='border border-gray-200 rounded-lg mb-4'>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 transition'>
				{title}
				<ArrowDown
					size={20}
					className={`transform transition-transform duration-200 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<div
				className={`overflow-hidden transition-all duration-200 ${
					isOpen ? 'max-h-96' : 'max-h-0'
				}`}>
				<div className='p-4'>{children}</div>
			</div>
		</div>
	)
}
