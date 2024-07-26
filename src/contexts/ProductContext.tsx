import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { Product } from '../interfaces/Product'
import { useNavigate } from 'react-router-dom'
import instance from '../apis'
import { ProductReducer } from '../reducers/productReducer'

type Props = {
	children: ReactNode
}

export type State = {
	products: Product[]
}

type ContextType = {
	state: State
	handleDeleteProduct: (_id: string | undefined) => void
	onSubmitProduct: (data: Product) => void
	dispatch: React.Dispatch<any>
}

export const ProductContext = createContext<ContextType>({} as ContextType)

export const ProductProvider = ({ children }: Props) => {
	// const [products, setProducts] = useState<Product[]>([])
	const [state, dispatch] = useReducer(ProductReducer, { products: [] as Product[] })
	const navigate = useNavigate()
	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await instance.get('/products')
			// console.log(data)
			dispatch({ type: 'SET_PRODUCT', payload: data.data })
		}

		fetchAPI()
	}, [])

	const handleDeleteProduct = async (_id: any) => {
		;(async () => {
			// console.log(data)
			const isConfirm = confirm('Are you sure you want to delete')
			if (isConfirm) {
				await instance.delete(`/products/${_id}`)
				dispatch({ type: 'DELETE_PRODUCT', payload: _id })
			}
		})()
	}

	const onSubmitProduct = async (data: Product) => {
		try {
			// const { data } = await instance.post(`/products`, product)
			// dispatch({ type: 'ADD_PRODUCT', payload: data.data })
			// navigate('/')
			if (data._id) {
				await instance.patch(`/products/${data._id}`, data)
				dispatch({ type: 'UPDATE_PRODUCT', payload: data })
			} else {
				const res = await instance.post('/products', data)
				console.log(res)
				dispatch({ type: 'ADD_PRODUCT', payload: res.data.data })
			}
			navigate('/')
		} catch (error) {
			console.error('Error product:', error)
		}
	}

	return (
		<ProductContext.Provider value={{ state, dispatch, handleDeleteProduct, onSubmitProduct }}>
			{children}
		</ProductContext.Provider>
	)
}
