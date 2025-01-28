/* Imports */
import OBSWebSocket from "obs-websocket-js";
const obs = new OBSWebSocket();

import { STREAMING_STATS, STREAMING_STOP } from './streamStatusDucks'
import { alertStore } from './../store/alertStore'
import { recordingStore } from "../store/recordingStore";
import { scenePreviewStore } from "../store/scenePreviewStore";
import { scenesStore } from "../store/scenesStore";
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
	const displayAlert = alertStore(store => store.displayAlert) 
	const getRecordingStatus = recordingStore(store => store.getRecordingStatus)
	const fetchScenePreview = scenePreviewStore(store => store.fetchScenePreview)
	const fetchScenes = scenesStore(store => store.fetchScenes)
	try {
		let result = await obs.connect(address=`ws://${address||'192.168.0.15'}:4444`)
		if (result) {
			dispatch({type: OBS_CONNECT})		
			fetchScenes(obs)
			fetchScenePreview(obs)
			
			obs.call('GetRecordStatus').then( res => {
				if(res.outputActive && !isRecording) {
					isRecording = setInterval(() => getRecordingStatus(obs), 1000)
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
				displayAlert({title: 'Disconnected', description: 'The connection has been closed', icon:'warning'})
				dispatch({type: OBS_DISCONNECT})
			})
			
			obs.on('error', (e) => {
				displayAlert({title:e.error, description:e.description, icon:'error'})
			})
		}
	}
	catch (e) {
			console.log(e)
			displayAlert({title:e.error, description:JSON.stringify(e), icon:'error'})
			dispatch({
				type: OBS_ERROR,
				payload: e
			});
		}
}

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

export const setCurrentScene = async (name) => {
	try {
		await obs.call('SetCurrentProgramScene', {'sceneName': name})
			.then(e => console.log(e))
	} catch(e){
		console.log('Catched on setCurrentScene function'+e)
	}
}

export const startStopRecording = () => async (dispatch) => {
	const displayAlert = alertStore(store => store.displayAlert)
	const getRecordingStatus = recordingStore(store => store.getRecordingStatus)
	const recordingStop = recordingStore(store => store.recordingStop)
	try{
		let recordingStatus = await obs.call('ToggleRecord')
		if (recordingStatus.outputActive) {
			isRecording = setInterval(() => getRecordingStatus(obs), 1000)
			displayAlert({title: "Recording", description: "Recording has started", icon: "success"})
		} else if (!recordingStatus.outputActive && isRecording) {
			clearInterval(isRecording)
			recordingStop()
			displayAlert({title: "Recording", description: "Recording has stoped", icon: "info"})
		}
	} catch (e) {
		console.log('catched on startStopRecording function '+e)
	}
}

export const startStopStreaming = async () => {
	try {
		await obs.call('ToggleStream')
	} catch (e) {
		console.log('Catched on startStopStreaming function'+e)
	}
}