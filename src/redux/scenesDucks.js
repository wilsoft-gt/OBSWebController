/* Imports */


/* Action Types */
export const SCENES_FETCH = 'SCENES_FETCH'
export const SCENES_ERROR = 'SCENES_ERROR'


/*Reducer*/

export default function (store={
	isLoading: true,
	data: [],
	error: null
}, action) {
	switch(action.type){
		case SCENES_FETCH:
			return {...store, isLoading: false, data: action.payload, error: null}
		case SCENES_ERROR:
			return {...store, isLoading: false, data: [], error: action.payload}
		default:
			return store
	}
}

/* Actions */
export const FetchScenes = (obs) => async (dispatch) => {
	try {
		await obs.send('GetSceneList').then(data => {
			dispatch({
				type: SCENES_FETCH,
				payload: data
			})
			return true 
		})
	} catch (e) {
		console.log(e)
		dispatch({
			type: SCENES_ERROR,
			payload: e
		})
	}
}


