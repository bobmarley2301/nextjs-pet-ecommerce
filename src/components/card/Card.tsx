'use client'

import Link from 'next/link'
import React from 'react'
import { Product } from '@/types/types'

interface CardProps extends Product {
	onAddToCart: () => void
}

export default function Card({
	id,
	title,
	image,
	description,
	price,
	category,
	onAddToCart,
}: CardProps) {
	return (
		<div className='bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300'>
			<img
				src={image}
				alt={title}
				className='w-full h-40 object-cover rounded-lg mb-4'
			/>

			<h2 className='text-xl font-bold text-gray-800'>{title}</h2>

			<p className='text-sm text-gray-500 mb-2'>{description}</p>
			<p className='text-sm text-gray-500'>
				Категорія: <span className='font-semibold'>{category}</span>
			</p>
			<p className='text-sm text-gray-500'>
				Ціна: <span className='font-semibold'>{price} $</span>
			</p>

			<div className='flex justify-between mt-4'>
				<Link
					href={`/product/${id}`}
					className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'>
					Переглянути
				</Link>
				<button
					onClick={onAddToCart}
					className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300'>
					Додати в кошик
				</button>
			</div>
		</div>
	)
}
