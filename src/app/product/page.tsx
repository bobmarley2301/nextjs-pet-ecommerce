'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/card/Card'
import Cart from '@/components/aside/Cart'
import { useCart } from '@/context/CartContext'
import CategoryFilter from '@/components/page/CategoryFilter'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

interface Product {
	id: number
	title: string
	description: string
	image: string
	price: number
	category: string
}

export default function ProductPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	)
	const [limit, setLimit] = useState(9)
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { cart, addToCart, removeFromCart } = useCart()

	// Завантаження категорій
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					'https://fakestoreapi.com/products/categories'
				)
				if (!response.ok)
					throw new Error('Помилка завантаження категорій')
				const data: string[] = await response.json()
				setCategories(data)
			} catch (error) {
				setError('Не вдалося завантажити категорії')
				toast.error('Помилка завантаження категорій')
			}
		}
		fetchCategories()
	}, [])

	// Завантаження товарів
	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const url = selectedCategory
					? `https://fakestoreapi.com/products/category/${selectedCategory}`
					: `https://fakestoreapi.com/products?limit=${limit}`

				const response = await fetch(url)
				if (!response.ok)
					throw new Error('Помилка завантаження товарів')
				const data: Product[] = await response.json()
				setProducts(data)
			} catch (error) {
				setError('Не вдалося завантажити товари')
				toast.error('Помилка завантаження товарів')
			} finally {
				setIsLoading(false)
			}
		}
		if (!searchQuery) fetchProducts()
	}, [limit, searchQuery, selectedCategory])

	// Оптимізований пошук товарів
	useEffect(() => {
		const delaySearch = setTimeout(async () => {
			if (searchQuery) {
				setIsLoading(true)
				setError(null)
				try {
					const response = await fetch(
						'https://fakestoreapi.com/products'
					)
					if (!response.ok)
						throw new Error('Помилка завантаження товарів')

					const data: Product[] = await response.json()
					const filteredData = data
						.filter(
							(product) =>
								product.title
									.toLowerCase()
									.includes(searchQuery.toLowerCase()) ||
								product.description
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
						)
						.slice(0, limit)

					setProducts(filteredData)
				} catch (error) {
					setError('Помилка пошуку товарів')
					toast.error('Помилка пошуку товарів')
				} finally {
					setIsLoading(false)
				}
			}
		}, 500)

		return () => clearTimeout(delaySearch)
	}, [searchQuery, limit])

	return (
		<div className='min-h-screen container mx-auto'>
			<Toaster position='top-right' />
			<div className='py-10'>
				<h1 className='text-center text-4xl font-bold italic text-blue-800 mb-10 mt-10'>
					Каталог товарів
				</h1>

				{error && (
					<div className='text-red-500 text-center mb-4'>{error}</div>
				)}

				<div className='flex flex-col lg:flex-row gap-6 px-4'>
					{/* Сайдбар з фільтрами */}
					<aside className='lg:w-1/4'>
						<div className='sticky top-4'>
							<input
								type='text'
								placeholder='Пошук товарів...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full mb-4 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<CategoryFilter
								categories={categories}
								selectedCategory={selectedCategory}
								onSelectCategory={setSelectedCategory}
							/>
						</div>
					</aside>

					{/* Основний контент */}
					<main className='lg:w-3/4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{isLoading ? (
								<div className='col-span-full flex justify-center items-center min-h-[200px]'>
									<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
								</div>
							) : products.length > 0 ? (
								products.map((product) => (
									<Card
										key={product.id}
										{...product}
										onAddToCart={() => {
											addToCart(product)
											toast.success(
												'Товар додано до кошика'
											)
										}}
									/>
								))
							) : (
								<p className='text-center text-gray-600 col-span-full'>
									Нічого не знайдено 😕
								</p>
							)}
						</div>

						{!searchQuery &&
							!isLoading &&
							products.length >= limit && (
								<div className='flex justify-center mt-10'>
									<button
										onClick={() =>
											setLimit((prev) => prev + 9)
										}
										className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300'>
										Завантажити ще
									</button>
								</div>
							)}
					</main>
				</div>

				<Cart
					isOpen={isCartOpen}
					onClose={() => setIsCartOpen(false)}
				/>
			</div>
		</div>
	)
}
