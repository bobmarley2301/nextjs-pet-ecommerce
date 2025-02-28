export default function Footer() {
	return (
		<footer className='bg-gray-900 text-gray-300 py-6 mt-10'>
			<div className='container mx-auto text-center px-6'>
				<p className='text-lg font-semibold'>
					My Store © {new Date().getFullYear()}
				</p>
				<p className='text-sm mt-2'>Усі права захищені</p>
				<div className='flex justify-center space-x-4 mt-4'>
					<a href='#' className='hover:text-white'>
						Facebook
					</a>
					<a href='#' className='hover:text-white'>
						Instagram
					</a>
					<a href='#' className='hover:text-white'>
						Twitter
					</a>
				</div>
			</div>
		</footer>
	)
}
