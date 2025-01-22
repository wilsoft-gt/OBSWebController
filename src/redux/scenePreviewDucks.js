/* imports */

import {Disconnect} from "./connectDucks"
let fetchInterval

/*Action types*/
export const PREVIEW_IMAGE_FETCH = 'PREVIEW_IMAGE_FETCH'
export const PREVIEW_IMAGE_ERROR = 'PREVIEW_IMAGE_ERROR'

/*Reducer*/
export default function previewReducer(state={
	isLoading: true,
	image: null,
	error: null
}, action) {
	switch(action.type) {
		case PREVIEW_IMAGE_FETCH:
			return {...state, isLoading: false, image: action.payload, error: null}
		case PREVIEW_IMAGE_ERROR:
			return {...state, isLoading: false, image: null, error: action.payload}
		default:
			return state 
	}
}


/*Actions*/

export const FetchScenePreview = (obs) =>  async(dispatch) => {	
	try {
		if (!fetchInterval) {
			fetchInterval = setInterval(async () => {
				let activeScene = await obs.call("GetCurrentProgramScene")
				obs.call('GetSourceScreenshot', {imageFormat: 'jpeg', width: 800, sourceName: activeScene.currentProgramSceneName}).then(data => {	
					dispatch({
						type: PREVIEW_IMAGE_FETCH,
						payload: data
					})	
				}).catch(e => {
					console.error(e)
					clearInterval(fetchInterval)
					fetchInterval = undefined
					dispatch(Disconnect())
				})
			}, 1000)
		}
	}
	catch(e){
		console.log('catched on FetchScenePreview function'+e)	
		dispatch({
			type: PREVIEW_IMAGE_ERROR,
			payload: e
		})
	}
}
