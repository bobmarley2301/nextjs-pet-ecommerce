'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
	id: number
	title: string
	description: string
	image: string
	price: number
	category: string
}

interface Params {
	id: string
}

export default function ProductPage() {
	const params = useParams() as unknown as Params
	const router = useRouter()
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProduct = async () => {
			if (!params.id) return
			try {
				const response = await fetch(
					`https://fakestoreapi.com/products/${params.id}`
				)
				if (!response.ok) throw new Error('Товар не знайдено')
				const data = await response.json()
				setProduct(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchProduct()
	}, [params.id])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<h1 className='text-2xl font-semibold text-blue-600'>
					Завантаження...
				</h1>
			</div>
		)
	}

	if (!product) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<h1 className='text-2xl font-semibold text-red-600'>
					Помилка: товар не знайдено
				</h1>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 py-10 px-4 md:px-10'>
			<div className='max-w-7xl mx-auto'>
				<button
					onClick={() => router.back()}
					className='mb-6 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-300'>
					← Назад
				</button>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-6'>
					<div className='flex justify-center'>
						<img
							src={product.image}
							alt={product.title}
							className='w-[450px] h-[450px] object-contain rounded-lg shadow-md border p-4'
						/>
					</div>

					<div className='flex flex-col justify-center'>
						<h1 className='text-3xl font-bold text-gray-800 mb-4'>
							{product.title}
						</h1>
						<p className='text-gray-600 text-lg mb-4'>
							{product.description}
						</p>
						<p className='text-sm text-gray-500 mb-4'>
							Категорія:{' '}
							<span className='font-semibold text-gray-700'>
								{product.category}
							</span>
						</p>

						<div className='bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center'>
							<h2 className='text-2xl font-semibold text-gray-900'>
								{product.price}$
							</h2>
							<p className='text-gray-600 text-sm'>
								🚚 Безкоштовна доставка
							</p>
						</div>

						<Link
							href={`/product/${product.id}/pay`}
							className='mt-6 block text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition duration-300'>
							Купити зараз
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
