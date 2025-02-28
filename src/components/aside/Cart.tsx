'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'

interface CartProps {
	isOpen: boolean
	onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
	const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

	// Підрахунок загальної вартості товарів у кошику
	const totalPrice = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	return (
		<>
			{/* Розмиття фону */}
			{isOpen && (
				<div
					className='fixed inset-0 backdrop-blur-sm bg-black/30 z-40'
					onClick={onClose}
				/>
			)}

			<aside
				className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-300 z-50 flex flex-col`}>
				<div className='p-4 sm:p-6 border-b flex justify-between items-center bg-gray-100'>
					<h2 className='text-xl font-bold text-gray-800 flex items-center'>
						<ShoppingBag className='w-6 h-6 mr-2' />
						🛒 Ваш кошик
					</h2>
					<button
						onClick={onClose}
						className='p-2 text-gray-600 hover:text-gray-900 transition rounded-full hover:bg-gray-200'>
						<X className='w-6 h-6' />
					</button>
				</div>

				{/* Товари в кошику */}
				<div className='p-4 sm:p-6 flex-grow overflow-y-auto space-y-4'>
					{cart.length === 0 ? (
						<div className='text-center text-gray-500 py-8'>
							<ShoppingBag className='w-16 h-16 mx-auto mb-4 text-gray-400' />
							<p className='text-lg'>Ваш кошик порожній</p>
							<p className='text-sm text-gray-400 mt-2'>
								Додайте товари для замовлення
							</p>
						</div>
					) : (
						cart.map((item) => (
							<div
								key={item.id}
								className='flex items-center justify-between border-b pb-4'>
								<div className='flex items-start flex-1'>
									<img
										src={item.image}
										alt={item.title}
										className='w-16 h-16 object-contain rounded-lg shadow-sm bg-white p-2'
									/>
									<div className='ml-3 flex-1'>
										<p className='text-sm font-semibold text-gray-800 line-clamp-2'>
											{item.title}
										</p>
										<p className='text-sm text-gray-500 mt-1'>
											{item.price} $ / шт
										</p>
										{/* Контрол зміни кількості */}
										<div className='flex items-center space-x-2 mt-2'>
											<button
												onClick={() =>
													updateQuantity(
														item.id,
														Math.max(
															item.quantity - 1,
															1
														)
													)
												}
												className='w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition'>
												<Minus className='w-4 h-4' />
											</button>
											<span className='text-md font-semibold text-gray-900 w-8 text-center'>
												{item.quantity}
											</span>
											<button
												onClick={() =>
													updateQuantity(
														item.id,
														item.quantity + 1
													)
												}
												className='w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition'>
												<Plus className='w-4 h-4' />
											</button>
										</div>
									</div>
									{/* Видалення товару */}
									<button
										onClick={() => removeFromCart(item.id)}
										className='ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition'>
										<X className='w-5 h-5' />
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Нижня панель */}
				{cart.length > 0 && (
					<div className='p-4 sm:p-6 border-t bg-gray-100'>
						<div className='flex justify-between items-center text-lg font-semibold mb-4'>
							<span className='text-black'>Загальна сума:</span>
							<span className='text-blue-600'>
								{totalPrice.toFixed(2)} $
							</span>
						</div>
						<div className='space-y-2'>
							<Link
								href='/cart/checkout'
								onClick={onClose}
								className='block w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-center'>
								Оформити замовлення 🛍️
							</Link>
							<button
								onClick={clearCart}
								className='w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition'>
								Очистити кошик 🗑️
							</button>
						</div>
					</div>
				)}
			</aside>
		</>
	)
}
