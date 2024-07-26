import { Category } from '../interfaces/Category'

type State = {
	categories: Category[]
}

type Action =
	| { type: 'SET_CATEGORY'; payload: Category[] }
	| { type: 'ADD_CATEGORY'; payload: Category }
	| { type: 'UPDATE_CATEGORY'; payload: Category }
	| { type: 'DELETE_CATEGORY'; payload: string }

export const CategoryReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CATEGORY':
			return {
				...state,
				categories: action.payload
			}
		case 'ADD_CATEGORY':
			return {
				...state,
				categories: [...state.categories, action.payload]
			}
		case 'DELETE_CATEGORY':
			return {
				...state,
				categories: state.categories.filter((item) => item._id !== action.payload)
			}
		case 'UPDATE_CATEGORY':
			return {
				...state,
				categories: state.categories.map((item) => (item._id === action.payload._id ? action.payload : item))
			}
		default:
			return state
	}
}
