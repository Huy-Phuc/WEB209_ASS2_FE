import { useForm } from 'react-hook-form'
import { User } from '../interfaces/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, registerSchema } from '../utils/validation'
import { useNavigate } from 'react-router-dom'
import instance from '../apis'
type Props = {
	isLogin?: boolean
}

const AuthForm = ({ isLogin }: Props) => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<User>({ resolver: zodResolver(isLogin ? loginSchema : registerSchema) })

	const onSubmitAuth = async (data: User) => {
		try {
			if (isLogin) {
				const res = await instance.post(`/login`, data)
				localStorage.setItem('user', JSON.stringify(res.data.user))
				localStorage.setItem('accessToken', res.data.accessToken)
				navigate('/')
			} else {
				await instance.post(`/register`, data)
				navigate('login')
			}
		} catch (error: any) {
			console.log(error)
			alert(error?.response?.data || 'Error!')
		}
	}

	return (
		<div className=' mt-10 p-5'>
			<form
				onSubmit={handleSubmit(onSubmitAuth)}
				className='shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-7 max-w-sm mx-auto'
			>
				<h1 className='text-[25px] mb-10'>{isLogin ? 'Login' : 'Register'}</h1>
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
						id='password'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
						{...register('password', {
							required: true,
							minLength: 6
						})}
					/>
					{errors.password && <div className='text-danger'>{errors.password.message}</div>}
				</div>

				{!isLogin && (
					<div className='mb-3'>
						<label htmlFor='confirmPass' className='form-label'>
							Confirm Password
						</label>
						<input
							type='password'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							{...register('confirmPass', { required: true, minLength: 6 })}
						/>
						{errors.confirmPass && <span className='text-danger'>{errors.confirmPass.message}</span>}
					</div>
				)}

				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					{isLogin ? 'Login' : 'Register'}
				</button>
			</form>
		</div>
	)
}

export default AuthForm
