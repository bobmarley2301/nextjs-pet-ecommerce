"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Cart from "@/components/aside/Cart";

export default function Header() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">My Store</h1>
        </Link>

        {/* Десктопне меню */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">
            Головна
          </Link>
          <Link href="/product" className="hover:underline">
            Товари
          </Link>
          <Link href="/about" className="hover:underline">
            Про нас
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <ShoppingCart className="mr-2" size={20} />
            <span className="hidden md:inline">Кошик</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Кнопка мобільного меню */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg z-50">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <Link
              href="/"
              className="hover:bg-blue-700 py-2 px-4 rounded transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Головна
            </Link>
            <Link
              href="/product"
              className="hover:bg-blue-700 py-2 px-4 rounded transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Товари
            </Link>
            <Link
              href="/about"
              className="hover:bg-blue-700 py-2 px-4 rounded transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Про нас
            </Link>
          </nav>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
