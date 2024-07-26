import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { CategoryReducer } from '../reducers/categoryReducer'
import { Category } from '../interfaces/Category'
import instance from '../apis'
import { useNavigate } from 'react-router-dom'

type Prop = {
	children: ReactNode
}

type ContextType = {
	state: State
	dispatch: React.Dispatch<any>
	onSubmitCategory: (data: Category) => void
	handleDeleteCategory: (id: string | undefined) => void
}

export type State = {
	categories: Category[]
}

export const CategoryContext = createContext<ContextType>({} as ContextType)

export const CategoryProvider = ({ children }: Prop) => {
	const [state, dispatch] = useReducer(CategoryReducer, { categories: [] as Category[] })
	const navigate = useNavigate()
	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await instance.get('/category')
			console.log(data)
			dispatch({ type: 'SET_CATEGORY', payload: data.data })
		}
		fetchAPI()
	}, [])

	const handleDeleteCategory = async (_id: any) => {
		;(async () => {
			const isConfirm = confirm('Are you sure you want to delete this category')
			if (isConfirm) {
				await instance.delete(`/category/${_id}`)
				// console.log(_id)
				dispatch({ type: 'DELETE_CATEGORY', payload: _id })
			}
		})()
	}

	const onSubmitCategory = async (data: Category) => {
		try {
			if (data._id) {
				await instance.patch(`/category/${data._id}`, data)
				dispatch({ type: 'UPDATE_CATEGORY', payload: data })
			} else {
				const res = await instance.post('/category', data)
				console.log(res)
				dispatch({ type: 'ADD_CATEGORY', payload: res.data.data })
			}
			navigate('/category')
		} catch (error) {
			console.error('Error category:', error)
		}
	}

	return (
		<CategoryContext.Provider value={{ state, dispatch, handleDeleteCategory, onSubmitCategory }}>
			{children}
		</CategoryContext.Provider>
	)
}
