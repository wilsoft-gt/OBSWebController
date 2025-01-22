/* imports */

/* variables */
export const RECORDING_STATS_FETCH = 'RECORDING_STATS_FETCH'
export const RECORDING_LOADING = 'STATS_LOADING'
export const RECORDING_ERROR = 'RECORDING_ERROR'
export const RECORDING_STATS_STOP = 'RECORDING_STATS_STOP'

/* Reducer */
export default function recordingReducer(state={
	isLoading: false,
	data: {},
	error: null
}, action) {
	switch(action.type) {
		case RECORDING_LOADING:
			return {...state, isLoading: true, data: {}, error: null}
		case RECORDING_STATS_FETCH:
			return {...state, isLoading: false, data: action.payload, error:null }
		case RECORDING_STATS_STOP:
			return {...state, isLoading: false, data: {}, error: null}
		case RECORDING_ERROR:
			return {...state, isLoading: false, data: {}, error: action.payload }
		default:
			return state
	}
}


/* Actions */


export const getRecordingStats = (obs) => async(dispatch) => {
	try{
		let recordingStatus = await obs.call('GetRecordStatus')
		let outputs = await obs.call("GetOutputList")
		let recordingOutput = outputs.outputs.find(output => output.outputActive)
		delete recordingOutput.outputFlags
		console.info(`#######Outputs: ${JSON.stringify(recordingOutput)}`)
		let outputSettings = await obs.call("GetOutputSettings", { outputName: recordingOutput.outputName})
		console.info(`#######Output settings: ${JSON.stringify(outputSettings)}`)
		dispatch({
			type: RECORDING_STATS_FETCH,
			payload: {...recordingStatus, ...recordingOutput, ...outputSettings.outputSettings}
		})			
		

	} catch(e){	
		dispatch({
			type: RECORDING_ERROR,
			payload: e
		})
	}
}
