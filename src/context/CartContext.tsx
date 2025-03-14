'use client'

import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from 'react'
import { Product } from '@/types/types'

interface CartItem extends Product {
	quantity: number
}

interface CartContextType {
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (id: number) => void
	updateQuantity: (id: number, quantity: number) => void
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([])

	// Завантаження корзини з localStorage при першому рендері
	useEffect(() => {
		const storedCart = localStorage.getItem('cart')
		if (storedCart) {
			setCart(JSON.parse(storedCart))
		}
	}, [])

	// Збереження корзини в localStorage при зміні
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id)
			if (existingItem) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			return [...prevCart, { ...product, quantity: 1 }]
		})
	}

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id))
	}

	const updateQuantity = (id: number, quantity: number) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, quantity) }
					: item
			)
		)
	}

	const clearCart = () => {
		setCart([])
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (!context) throw new Error('useCart must be used within a CartProvider')
	return context
}
