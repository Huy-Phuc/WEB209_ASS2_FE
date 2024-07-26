import { useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { categorySchema } from '../utils/validation'
import instance from '../apis'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryContext } from '../contexts/CategoryContext'
import { Category } from '../interfaces/Category'

const CategoryForm = () => {
	const { onSubmitCategory } = useContext(CategoryContext)
	const { id } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Category>({ resolver: zodResolver(categorySchema) })

	useEffect(() => {
		if (id) {
			;(async () => {
				try {
					const { data } = await instance.get(`/category/${id}`)
					reset(data.data)
				} catch (error) {
					console.error('Error fetching category:', error)
				}
			})()
		}
	}, [id, reset])

	return (
		<>
			<div className=' mt-10 p-5'>
				<form
					onSubmit={handleSubmit((data) => onSubmitCategory({ ...data, _id: id }))}
					className='shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-7 max-w-sm mx-auto'
				>
					<h1>{id ? 'Edit Category' : 'Add Category'}</h1>
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
						<label htmlFor='slug' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
							Slug
						</label>
						<input
							type='text'
							id='slug'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
							{...register('slug', {
								required: true,
								min: 0
							})}
						/>
						{errors.slug && <div className='text-danger'>{errors.slug.message}</div>}
					</div>
					<div className='mb-5'>
						<label htmlFor='description' className='block ms-2 text-sm font-medium text-gray-900 dark:dark:text-black'>
							Description
						</label>
						<input
							id='description'
							type='text'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
							{...register('description', {
								required: true,
								minLength: 0
							})}
						/>
						{errors.description && <div className='text-danger'>{errors.description.message}</div>}
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

export default CategoryForm
