/* Imports */
import OBSWebSocket from "obs-websocket-js";
const obs = new OBSWebSocket();

import { FetchScenes } from './scenesDucks'
import { FetchScenePreview } from './scenePreviewDucks'
import { getRecordingStats, RECORDING_STATS_STOP } from './RecordingDucks'
import { STREAMING_STATS, STREAMING_STOP } from './streamStatusDucks'
import { displayAlert } from './alertDucks'
/* Action types */
export const OBS_CONNECT = "OBS_CONNECT";
export const OBS_DISCONNECT = "OBS_DISCONNECT";
export const OBS_ERROR = "OBS_ERROR";

let isRecording

/* Reducers */
export default function ObsReducer(
	state = {
		isLoading: false,
		isConnected: false,
		error: null
	},
	action
) {
	switch (action.type) {
		case OBS_CONNECT:
			return { ...state, isLoading: false, isConnected: true, error: null };

		case OBS_DISCONNECT:
			return { ...state, isLoading: false, isConnected: false, error: null };

		case OBS_ERROR:
			return {
				...state,
				isLoading: false,
				isConnected: false,
				error: action.payload.message
			};
		default:
			return state;
	}
}

/* Action Creators */
export const Connect = (address) => async (dispatch) => {
	try {
		obs.connect(address=`ws://${address}:4444`).then(() => {
			dispatch({
				type: OBS_CONNECT
			})		

			dispatch(FetchScenes(obs))
			dispatch(FetchScenePreview(obs))
			obs.call('GetRecordStatus').then( res => {
				if(res.outputActive) {
					isRecording = setInterval(() => dispatch(getRecordingStats(obs)), 1000)
				}
			})
			obs.on('RecordStateChanged', () => {
				console.info(`$$$$$$$$$$$$La grabacion inicio}`)
				if (!isRecording) {
					isRecording = setInterval(() => dispatch(getRecordingStats(obs)), 1000)
				} else {
					console.info(`$$$$$$$$$$$$La grabacion finalizó}`)
					clearInterval(isRecording)
					isRecording = undefined
					dispatch({type: RECORDING_STATS_STOP})
				}
			})
			obs.on('StreamStatus', res => {
				dispatch({
					type: STREAMING_STATS,
					payload: res
				})
				console.log(res)
			})
			obs.on('StreamStopped', () => {
				dispatch({type: STREAMING_STOP})
				console.log('stream stop')
			})
			obs.on('ConnectionClosed', () => {
				dispatch(displayAlert({title: 'Disconnected', description: 'The connection has been closed', icon:'warning'}))
				dispatch({type: OBS_DISCONNECT})
			})
			obs.on('error', (e) => {
				dispatch(displayAlert({title:e.error, description:e.description, icon:'error'}))
			})
		}).catch( e => {
			console.log(e)
			dispatch(displayAlert({title:e.error, description:e.description, icon:'error'}))
			return e
		})
	} catch (e) {		
		console.log('Catched on Connect function'+e);
		dispatch({
			type: OBS_ERROR,
			payload: e
		});
	}
};

export const Disconnect = () => async (dispatch) => {
	try {
		obs.disconnect()
		dispatch({type: OBS_DISCONNECT})
	} catch (e){
		console.log('Catched on Disconnect function'+e)
		dispatch({
			type: OBS_ERROR,
			payload: e.message
		})
	}
}

export const setCurrentScene = (name) => async(dispatch) => {
	try {
		await obs.call('SetCurrentProgramScene', {'sceneName': name})
			.then(e => console.log(e))
	} catch(e){
		console.log('Catched on setCurrentScene function'+e)
	}
}

export const startStopRecording = () => async (dispatch) => {
	try{
		await obs.call('ToggleRecord')
	} catch (e) {
		console.log('catched on startStopRecording function '+e)
	}
}

export const startStopStreaming = () => async (dispatch) => {
	try {
		await obs.call('ToggleStream')
	} catch (e) {
		console.log('Catched on startStopStreaming function'+e)
	}
}
