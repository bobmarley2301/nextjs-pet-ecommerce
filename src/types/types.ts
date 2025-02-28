export interface Product {
	id: number
	title: string
	image: string
	description: string
	price: number
	category: string
}

export interface CartItem extends Product {
	quantity: number 
}

export interface CartContextType {
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (id: number) => void
	clearCart: () => void
}

interface CartProps {
	isOpen: boolean
	onClose: () => void
	cartItems: CartItem[]
	removeFromCart: (id: number) => void
}