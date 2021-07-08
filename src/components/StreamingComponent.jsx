import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { startStopStreaming } from '../redux/connectDucks'
import { Button, ProgressBar, ProgressCircular } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish, faStopCircle } from '@fortawesome/free-solid-svg-icons'

/*
Data to use:
fps
kbitsPerSec
memoryUsage
numDroppedFrames
numTotalFrames
streamTimecode
cpuUsage
*/

export const StreamingComponent = () => {
	const stats = useSelector(store => store.streamReducer)
	const dispatch = useDispatch()

	if (stats && stats.data.fps) {
		
		return(
			<div className='d-flex flex-column justify-content-center align-items-center flex-grow-1 w-100'>	
				<p>
					<FontAwesomeIcon icon={faSatelliteDish} className='margin-r-05 breathingAnimation' style={{color: 'red'}} />
					Live now	
				</p>
				<div className='d-flex flex-row justify-content-between align-items-between w-100'>
					<div className='text-left stats'>
						<p>FPS: {Math.floor(stats.data.fps)}</p>
						<p>Streaming time: {stats.data.streamTimecode}</p>
						<p>Bitrate: {stats.data.kbitsPerSec}kb/s</p>
						<p>Skiped Frames: {stats.data.numDroppedFrames}/{stats.data.numTotalFrames}</p>
						<p>Memory: {parseFloat(stats.data.memoryUsage).toFixed(2)}</p>
					</div>
					<div>
						<ProgressCircular value={parseFloat(stats.data.cpuUsage).toFixed(1)} />	
						<p>CPU ussage</p>
					</div>
		
				</div>
				<Button variant='destructive' onClick={() => dispatch(startStopStreaming())}>
					<FontAwesomeIcon icon={faStopCircle} className='margin-r-1' />
					Stop Streaming
				</Button>
			</div>
		)
	} else {
		return (
			<div className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
				<Button variant='brand' onClick={ () => dispatch(startStopStreaming()) }>
					<FontAwesomeIcon className='margin-r-1' icon={faSatelliteDish} />
					Start Sreaming
				</Button>
			</div>
		)
	}
}
