'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Cart from '@/components/aside/Cart'


export default function Header() {
	const { cart } = useCart()
	const [isCartOpen, setIsCartOpen] = useState(false)

	return (
		<header className='bg-blue-600 text-white py-4 shadow-md '>
			<div className='container mx-auto flex justify-between items-center px-6'>
				<Link href='/'>
					<h1 className='text-2xl font-bold cursor-pointer'>
						My Store
					</h1>
				</Link>
				<nav className='space-x-6'>
					<Link href='/' className='hover:underline'>
						Головна
					</Link>
					<Link href='/product' className='hover:underline'>
						Товари
					</Link>
					<Link href='/about' className='hover:underline'>
						Про нас
					</Link>
				</nav>
				<button
					onClick={() => setIsCartOpen(true)}
					className='relative flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition'>
					<ShoppingCart className='mr-2' size={20} />
					Кошик
					{cart.length > 0 && (
						<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
							{cart.reduce((acc, item) => acc + item.quantity, 0)}
						</span>
					)}
				</button>
			</div>
			<Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
