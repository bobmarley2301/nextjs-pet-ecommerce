'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-hot-toast'
import {
	ArrowLeft,
	CreditCard,
	User,
	Mail,
	MapPin,
	Calendar,
	Lock,
} from 'lucide-react'

export default function CheckoutPage() {
	const router = useRouter()
	const { cart, clearCart } = useCart()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		name: '',
		email: '',
		address: '',
	})

	const totalPrice = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		// Імітація обробки платежу
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000))
			toast.success('Оплата пройшла успішно!')
			clearCart()
			router.push('/product')
		} catch (error) {
			toast.error('Помилка при оплаті')
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	if (cart.length === 0) {
		return (
			<div className='min-h-screen flex items-center justify-center p-4'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>
						Ваш кошик порожній
					</h2>
					<button
						onClick={() => router.push('/product')}
						className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
						Перейти до покупок
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
			<div className='max-w-7xl mx-auto'>
				<button
					onClick={() => router.back()}
					className='flex items-center text-gray-600 hover:text-gray-800 mb-8 p-2 hover:bg-gray-100 rounded-lg transition'>
					<ArrowLeft className='w-5 h-5 mr-2' />
					Повернутися назад
				</button>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
					{/* Форма оплати */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-white p-4 sm:p-6 rounded-xl shadow-lg order-2 lg:order-1'>
						<h2 className='text-2xl font-bold text-gray-800 mb-6'>
							Оплата замовлення
						</h2>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label className='block text-gray-700 mb-2 flex items-center'>
									<User className='w-5 h-5 mr-2 text-gray-400' />
									Ім'я та прізвище
								</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Іван Петренко'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-2 flex items-center'>
									<Mail className='w-5 h-5 mr-2 text-gray-400' />
									Email
								</label>
								<input
									type='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='your@email.com'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-2 flex items-center'>
									<MapPin className='w-5 h-5 mr-2 text-gray-400' />
									Адреса доставки
								</label>
								<textarea
									name='address'
									value={formData.address}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									rows={3}
									placeholder='Вулиця, будинок, квартира, місто, індекс'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-2 flex items-center'>
									<CreditCard className='w-5 h-5 mr-2 text-gray-400' />
									Номер картки
								</label>
								<input
									type='text'
									name='cardNumber'
									value={formData.cardNumber}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='1234 5678 9012 3456'
									maxLength={19}
								/>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-gray-700 mb-2 flex items-center'>
										<Calendar className='w-5 h-5 mr-2 text-gray-400' />
										Термін дії
									</label>
									<input
										type='text'
										name='expiryDate'
										value={formData.expiryDate}
										onChange={handleInputChange}
										required
										className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='MM/YY'
										maxLength={5}
									/>
								</div>
								<div>
									<label className='block text-gray-700 mb-2 flex items-center'>
										<Lock className='w-5 h-5 mr-2 text-gray-400' />
										CVV
									</label>
									<input
										type='text'
										name='cvv'
										value={formData.cvv}
										onChange={handleInputChange}
										required
										className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='123'
										maxLength={3}
									/>
								</div>
							</div>
							<button
								type='submit'
								disabled={loading}
								className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 ${
									loading
										? 'opacity-70 cursor-not-allowed'
										: 'hover:bg-blue-700'
								} transition`}>
								<CreditCard className='w-5 h-5' />
								<span>
									{loading
										? 'Обробка...'
										: `Оплатити ${totalPrice.toFixed(2)} $`}
								</span>
							</button>
						</form>
					</motion.div>

					{/* Список товарів */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-white p-4 sm:p-6 rounded-xl shadow-lg order-1 lg:order-2'>
						<h2 className='text-2xl font-bold text-gray-800 mb-6'>
							Ваше замовлення
						</h2>
						<div className='space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto'>
							{cart.map((item) => (
								<div
									key={item.id}
									className='flex items-start space-x-4 border-b pb-4'>
									<div className='w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg p-2'>
										<img
											src={item.image}
											alt={item.title}
											className='w-full h-full object-contain'
										/>
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='text-lg font-semibold text-gray-800 line-clamp-2'>
											{item.title}
										</h3>
										<p className='text-gray-600 mt-1'>
											Кількість: {item.quantity}
										</p>
										<p className='text-blue-600 font-semibold mt-1'>
											$
											{(
												item.price * item.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className='mt-6 pt-6 border-t'>
							<div className='flex justify-between items-center text-xl font-bold'>
								<span>Загальна сума:</span>
								<span className='text-blue-600'>
									${totalPrice.toFixed(2)}
								</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
