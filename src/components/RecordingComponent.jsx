import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { startStopRecording } from '../redux/connectDucks'
import { Card, Button } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

export const RecordingComponent = () => {
	const stats = useSelector(store =>  store.recordingReducer)
	const dispatch = useDispatch()
 
	if (stats.data && stats.data.isRecording) {
		return(	
			<div className='flex-grow-1'>
				<p><FontAwesomeIcon icon={faCircle} className='breathingAnimation margin-r-05' style={{color: 'red'}}/> Recording </p>
				<p>Time: {stats.data.recordTimecode}</p>
				<p>Filename: { stats.data.recordingFilename.slice(stats.data.recordingFilename.lastIndexOf('/')+1, stats.data.recordingFilename.length) }</p>
				<p>File Path: { stats.data.recordingFilename.slice(0, stats.data.recordingFilename.lastIndexOf('/')+1) }</p>	
				<Button variant='destructive' onClick={() => dispatch(startStopRecording())}> 
					<FontAwesomeIcon icon={faStopCircle} className='margin-r-1'/>
					Stop recording
				</Button>
			</div>
		)	
	} else {
		return(
			<div className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
				<Button onClick={() => dispatch(startStopRecording())} variant='brand'>
					<FontAwesomeIcon icon={faDotCircle} className='margin-r-1' />
					Start recording
				</Button>
			</div>
		)
	}

}
