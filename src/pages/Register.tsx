import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { User } from '../interfaces/User'
import instance from '../apis'
import { useNavigate } from 'react-router-dom'

// type Props = {
// 	onSubmit: (user: User) => void
// }

const userSchema = Joi.object({
	email: Joi.string().required().email({ tlds: false }),
	password: Joi.string().required().min(6)
})

const Register = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<User>({ resolver: joiResolver(userSchema) })

	const onSubmit = (user: User) => {
		;(async () => {
			const { data } = await instance.post(`/register`, user)
			// console.log(data)
			if (data.user) {
				const isConfirm = confirm('Register successfully , switch login page')
				if (isConfirm) {
					navigate('/login')
				}
			}
		})()
	}

	return (
		<div className=' mt-10 p-5'>
			<h1 className='text-[25px] mb-10'>Register</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-7 max-w-sm mx-auto'
			>
				<div className='mb-5'>
					<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
						Email
					</label>
					<input
						type='email'
						id='name'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
						{...register('email', {
							required: true
						})}
					/>
					{errors.email && <div className='text-danger'>{errors.email.message}</div>}
				</div>

				<div className='mb-5'>
					<label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
						Password
					</label>
					<input
						type='password'
						id='price'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
						{...register('password', {
							required: true,
							min: 6
						})}
					/>
					{errors.password && <div className='text-danger'>{errors.password.message}</div>}
				</div>

				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Register
