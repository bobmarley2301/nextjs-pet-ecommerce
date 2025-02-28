'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Product {
	image: string
	title: string
}

export default function PayPage() {
	const { id } = useParams()
	const router = useRouter()
	const [cardNumber, setCardNumber] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [cvv, setCvv] = useState('')
	const [product, setProduct] = useState<Product | null>(null)

	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((data) => setProduct(data))
	}, [id])

	const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		alert(`Оплата успішна для товару з ID: ${id}`)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
			<motion.button
				onClick={() => router.back()}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='mb-6 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-300'>
				← Повернутись
			</motion.button>

			<h1 className='text-4xl font-bold italic text-blue-800 mb-6'>
				Оплата товару
			</h1>

			{product && (
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className='text-center mb-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
					<img
						src={product.image}
						alt={product.title}
						className='w-40 h-40 object-contain mx-auto mb-2'
					/>
					<p className='text-lg font-semibold'>{product.title}</p>
				</motion.div>
			)}

			<p className='text-lg text-gray-700 mb-4'>
				Ви оплачуєте товар з ID:{' '}
				<span className='font-semibold'>{id}</span>
			</p>

			<motion.form
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				onSubmit={handlePayment}
				className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
				<div className='mb-4'>
					<label className='block text-gray-700 font-semibold mb-2'>
						Номер картки
					</label>
					<input
						type='text'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
						placeholder='1234 5678 9012 3456'
						required
					/>
				</div>

				<div className='mb-4 flex gap-4'>
					<div className='w-1/2'>
						<label className='block text-gray-700 font-semibold mb-2'>
							Дата закінчення
						</label>
						<input
							type='text'
							value={expiryDate}
							onChange={(e) => setExpiryDate(e.target.value)}
							className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
							placeholder='MM/YY'
							required
						/>
					</div>

					<div className='w-1/2'>
						<label className='block text-gray-700 font-semibold mb-2'>
							CVV
						</label>
						<input
							type='text'
							value={cvv}
							onChange={(e) => setCvv(e.target.value)}
							className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
							placeholder='123'
							required
						/>
					</div>
				</div>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					type='submit'
					className='w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300'>
					Оплатити
				</motion.button>
			</motion.form>
		</motion.div>
	)
}
