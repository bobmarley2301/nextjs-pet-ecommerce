'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Truck, Headphones, Shield } from 'lucide-react'

const features = [
	{
		icon: <ShoppingBag className='w-8 h-8 text-blue-600' />,
		title: 'Широкий асортимент',
		description: 'Більше 1000 товарів від провідних світових брендів',
	},
	{
		icon: <Truck className='w-8 h-8 text-blue-600' />,
		title: 'Швидка доставка',
		description: 'Доставляємо замовлення по всій Україні протягом 1-3 днів',
	},
	{
		icon: <Headphones className='w-8 h-8 text-blue-600' />,
		title: '24/7 Підтримка',
		description: 'Наша служба підтримки завжди готова допомогти вам',
	},
	{
		icon: <Shield className='w-8 h-8 text-blue-600' />,
		title: 'Гарантія якості',
		description: 'Ми гарантуємо якість та оригінальність усіх товарів',
	},
]

export default function AboutPage() {
	return (
		<div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Головний заголовок */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-16'>
					<h1 className='text-4xl font-bold text-blue-800 mb-4'>
						Про наш магазин
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						Ми прагнемо зробити ваші покупки максимально зручними та
						приємними, пропонуючи найкращі товари за найкращими
						цінами
					</p>
				</motion.div>

				{/* Наші переваги */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 * index }}
							className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
							<div className='mb-4'>{feature.icon}</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								{feature.title}
							</h3>
							<p className='text-gray-600'>
								{feature.description}
							</p>
						</motion.div>
					))}
				</motion.div>

				{/* Про компанію */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className='bg-white rounded-xl shadow-lg p-8 mb-16'>
					<h2 className='text-3xl font-bold text-gray-800 mb-6'>
						Наша історія
					</h2>
					<div className='prose max-w-none text-gray-600'>
						<p className='mb-4'>
							Наш магазин розпочав свою діяльність у 2020 році з
							метою зробити онлайн-шопінг доступним та зручним для
							кожного українця. За цей час ми здобули довіру тисяч
							клієнтів та продовжуємо вдосконалювати наш сервіс
							кожного дня.
						</p>
						<p className='mb-4'>
							Ми співпрацюємо лише з перевіреними постачальниками
							та брендами, щоб гарантувати найвищу якість товарів
							для наших клієнтів. Наша команда постійно працює над
							розширенням асортименту та покращенням
							обслуговування.
						</p>
					</div>
				</motion.div>

				{/* Контакти */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className='bg-blue-50 rounded-xl p-8'>
					<h2 className='text-3xl font-bold text-gray-800 mb-6'>
						Зв'яжіться з нами
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						<div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								Адреса
							</h3>
							<p className='text-gray-600'>
								вул. Хрещатик, 1<br />
								Київ, 01001
								<br />
								Україна
							</p>
						</div>
						<div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								Контакти
							</h3>
							<p className='text-gray-600'>
								Телефон: +380 44 123 45 67
								<br />
								Email: info@mystore.ua
							</p>
						</div>
						<div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								Графік роботи
							</h3>
							<p className='text-gray-600'>
								Пн-Пт: 9:00 - 20:00
								<br />
								Сб-Нд: 10:00 - 18:00
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
