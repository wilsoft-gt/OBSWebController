import {useSelector,useDispatch} from 'react-redux'
import { startStopRecording } from '../redux/connectDucks'
import { Button } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

export const RecordingComponent = () => {
	const stats = useSelector(store =>  store.recordingReducer)
	const dispatch = useDispatch()

	if (stats.data && stats.data.outputActive) {
		return(	
			<div className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
				<p className='breathingAnimation' style={{fontSize: "1.5em"}}><FontAwesomeIcon icon={faCircle} className='margin-r-05' style={{color: 'red'}}/><strong>Recording</strong></p><br />
				<ul>
					<li><strong>Time: </strong>{stats.data.outputTimecode.split(".")[0]}</li>
					<li><strong>Video info: </strong> {stats.data.outputWidth}x{stats.data.outputHeight}, {stats.data.path.split(".").slice(-1)}</li>
					<li><strong>Output name: </strong>{stats.data.path.split("/").slice(-1)[0].split(".")[0]}</li>
					<li><strong>Output path: </strong>{stats.data.path.slice(0, stats.data.path.lastIndexOf("/")+1)}</li>
					<li><strong>Output size: </strong> {(stats.data.outputBytes*0.000001).toFixed(2)}MB</li>
				</ul><br /><br />
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
