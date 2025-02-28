'use client'

import Accordion from '@/components/accordion/Accordion'

interface CategoryFilterProps {
	categories: string[]
	selectedCategory: string | null
	onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({
	categories,
	selectedCategory,
	onSelectCategory,
}: CategoryFilterProps) {
	return (
		<Accordion title='Категорії товарів 📑'>
			<div className='space-y-2'>
				<button
					onClick={() => onSelectCategory(null)}
					className={`w-full text-left px-3 py-2 rounded-lg transition ${
						selectedCategory === null
							? 'bg-blue-100 text-blue-700'
							: 'hover:bg-gray-100'
					}`}>
					Всі товари
				</button>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => onSelectCategory(category)}
						className={`w-full text-left px-3 py-2 rounded-lg transition ${
							selectedCategory === category
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'
						}`}>
						{category}
					</button>
				))}
			</div>
		</Accordion>
	)
}
