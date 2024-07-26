import { useForm } from 'react-hook-form'
import { Product } from '../interfaces/Product'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { productSchema } from '../utils/validation'
import instance from '../apis'
import { ProductContext } from '../contexts/ProductContext'
import { zodResolver } from '@hookform/resolvers/zod'

const FormProduct = () => {
	const { onSubmitProduct } = useContext(ProductContext)
	const { id } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Product>({ resolver: zodResolver(productSchema) })

	useEffect(() => {
		if (id) {
			;(async () => {
				try {
					const { data } = await instance.get(`/products/${id}`)
					reset(data.data)
				} catch (error) {
					console.error('Error fetching product:', error)
				}
			})()
		}
	}, [id, reset])

	return (
		<>
			<div className=' mt-10 p-5'>
				<h1 className='text-[25px] mb-10'>AddProduct</h1>

				<form
					onSubmit={handleSubmit((data) => onSubmitProduct({ ...data, _id: id }))}
					className='shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-7 max-w-sm mx-auto'
				>
					<h1>{id ? 'Edit Product' : 'Add Product'}</h1>
					<div className='mb-5'>
						<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
							Name
						</label>
						<input
							type='text'
							id='name'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
							{...register('title', {
								required: true,
								minLength: 1,
								maxLength: 100
							})}
						/>
						{errors.title && <div className='text-danger'>{errors.title.message}</div>}
					</div>

					<div className='mb-5'>
						<label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
							Price
						</label>
						<input
							type='number'
							id='price'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
							{...register('price', {
								required: true,
								min: 0,
								valueAsNumber: true
							})}
						/>
						{errors.price && <div className='text-danger'>{errors.price.message}</div>}
					</div>
					<div className='mb-5'>
						<label htmlFor='image' className='block ms-2 text-sm font-medium text-gray-900 dark:dark:text-black'>
							Image
						</label>
						<input
							id='image'
							type='text'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
							{...register('thumbnail', {
								required: true,
								minLength: 0
							})}
						/>
						{errors.thumbnail && <div className='text-danger'>{errors.thumbnail.message}</div>}
					</div>
					<button
						type='submit'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Submit
					</button>
				</form>
			</div>
		</>
	)
}

export default FormProduct
