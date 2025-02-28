'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, TrendingUp, Percent, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-hot-toast'

interface Product {
	id: number
	title: string
	description: string
	price: number
	image: string
	category: string
}

export default function Home() {
	const [categories, setCategories] = useState<string[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const { addToCart } = useCart()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesRes, productsRes] = await Promise.all([
					fetch('https://fakestoreapi.com/products/categories'),
					fetch('https://fakestoreapi.com/products?limit=8'),
				])

				const categoriesData = await categoriesRes.json()
				const productsData = await productsRes.json()

				setCategories(categoriesData)
				setProducts(productsData)
			} catch (error) {
				console.error('Помилка завантаження даних:', error)
				toast.error('Помилка завантаження даних')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	}

	return (
		<div className='min-h-screen'>
			{/* Головний банер */}
			<motion.div
				className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-20 px-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}>
				<div className='max-w-7xl mx-auto text-center'>
					<h1 className='text-3xl sm:text-5xl font-bold mb-4 sm:mb-6'>
						Ласкаво просимо до MyStore
					</h1>
					<p className='text-lg sm:text-xl mb-6 sm:mb-8'>
						Знайдіть найкращі товари за найкращими цінами
					</p>
					<Link
						href='/product'
						className='inline-flex items-center bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300'>
						<ShoppingBag className='w-5 h-5 mr-2' />
						Перейти до каталогу
					</Link>
				</div>
			</motion.div>

			{/* Категорії */}
			<section className='py-12 sm:py-16 px-4 bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<motion.h2
						className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800'
						{...fadeInUp}>
						Популярні категорії
					</motion.h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
						{categories.map((category, index) => (
							<motion.div
								key={category}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}>
								<Link href={`/product?category=${category}`}>
									<div className='bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer'>
										<ShoppingBag className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4' />
										<h3 className='text-lg sm:text-xl font-semibold text-gray-800 capitalize'>
											{category}
										</h3>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Спеціальні пропозиції */}
			<section className='py-12 sm:py-16 px-4'>
				<div className='max-w-7xl mx-auto'>
					<motion.h2
						className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800'
						{...fadeInUp}>
						Спеціальні пропозиції
					</motion.h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
						{products.slice(0, 4).map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className='bg-white rounded-xl shadow-lg overflow-hidden'>
								<div className='relative'>
									<div className='pt-[100%] relative'>
										<img
											src={product.image}
											alt={product.title}
											className='absolute inset-0 w-full h-full object-contain p-4'
										/>
									</div>
									<div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm'>
										-20%
									</div>
								</div>
								<div className='p-4'>
									<h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]'>
										{product.title}
									</h3>
									<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
										<div className='flex items-center'>
											<span className='text-gray-400 line-through text-sm'>
												$
												{(product.price * 1.2).toFixed(
													2
												)}
											</span>
											<span className='text-lg sm:text-xl font-bold text-blue-600 ml-2'>
												${product.price}
											</span>
										</div>
										<button
											onClick={() => {
												addToCart(product)
												toast.success(
													'Товар додано до кошика'
												)
											}}
											className='w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center'>
											<ShoppingBag className='w-4 h-4 mr-2' />
											Купити
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Переваги */}
			<section className='py-12 sm:py-16 px-4 bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
						<motion.div className='text-center' {...fadeInUp}>
							<TrendingUp className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4' />
							<h3 className='text-lg sm:text-xl font-semibold mb-2'>
								Найкращі ціни
							</h3>
							<p className='text-gray-600'>
								Гарантуємо найнижчі ціни на ринку
							</p>
						</motion.div>
						<motion.div
							className='text-center'
							{...fadeInUp}
							transition={{ delay: 0.2 }}>
							<Percent className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4' />
							<h3 className='text-lg sm:text-xl font-semibold mb-2'>
								Регулярні знижки
							</h3>
							<p className='text-gray-600'>
								Щотижневі акції та спеціальні пропозиції
							</p>
						</motion.div>
						<motion.div
							className='text-center'
							{...fadeInUp}
							transition={{ delay: 0.4 }}>
							<Star className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4' />
							<h3 className='text-lg sm:text-xl font-semibold mb-2'>
								Програма лояльності
							</h3>
							<p className='text-gray-600'>
								Отримуйте бонуси за кожну покупку
							</p>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}
