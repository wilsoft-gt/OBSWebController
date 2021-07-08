/* Imports */
/* Action Types */
export const ERROR_OPEN = 'ERROR_OPEN'
export const ERROR_CLOSE = 'ERROR_CLOSE'

export default function alertReducer(state={
	isOpen: false,
	data: {
		title: '',
		description: '',
		icon: ''
	}
}, action) {
	switch(action.type) {
		case ERROR_OPEN:
			return {...state, isOpen: true, data: action.payload}
		case ERROR_CLOSE:
			return {...state, isOpen: false, data: {title: '', description:'', icon:''} }
		default:
			return state
	}
	
}

/* Actions */
export const displayAlert = (data) => async(dispatch) => {
	dispatch({
		type: ERROR_OPEN,
		payload: data
	})
}

export const hideAlert = () => async(dispatch) => {
	dispatch({
		type: ERROR_CLOSE
	})
}
