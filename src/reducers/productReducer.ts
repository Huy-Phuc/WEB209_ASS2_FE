import { Product } from '../interfaces/Product'

type State = {
	products: Product[]
}

type Action =
	| { type: 'SET_PRODUCT'; payload: Product[] }
	| { type: 'DELETE_PRODUCT'; payload: string }
	| { type: 'UPDATE_PRODUCT'; payload: Product }
	| { type: 'ADD_PRODUCT'; payload: Product }

export const ProductReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PRODUCT':
			return {
				...state,
				products: action.payload
			}
		case 'ADD_PRODUCT':
			return {
				...state,
				products: [...state.products, action.payload]
			}
		case 'DELETE_PRODUCT':
			return {
				...state,
				products: state.products.filter((item) => item._id !== action.payload)
			}
		case 'UPDATE_PRODUCT':
			return {
				...state,
				products: state.products.map((item) => (item._id === action.payload._id ? action.payload : item))
			}
		default:
			return state
	}
}
