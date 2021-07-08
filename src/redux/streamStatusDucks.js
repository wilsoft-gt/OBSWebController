/* Imports */

/* Action types */
export const STREAMING_STATS = 'STREAMING_STATS'
export const STREAMING_LOADING = 'STREAMING_LOADING'
export const STREAMING_ERROR = 'STREAMING_ERROR'
export const STREAMING_STOP = 'STREAMING_STOP'

/*Reducer */
export default function streamingReducer(state={
	isLoading: false,
	data: {},
	error: null
}, action){
	switch(action.type) {
		case STREAMING_LOADING:
			return {...state, isLoading: true, data: {}, error: null}
		case STREAMING_STATS:
			return {...state, isLoading: false, data: action.payload, error: null}
		case STREAMING_ERROR:
			return {...state, isLoading: false, data: {}, error: action.payload}
		case STREAMING_STOP:
			return {...state, isLoading: false, data: {}, error: null}
		default:
			return state

	}
}

/* Actions */
export const getStreamingStatus = (obs) => async (dispatch) => {
	try {
		setInterval(() => {
			obs.send('GetStreamingStatus').then( res => {
				dispatch({
					type: STREAMING_STATS,
					payload: res
				})
			})
		} ,1000)
	} catch (e) {
		dispatch({
			type: STREAMING_ERROR,
			payload: e
		})
	}
}
