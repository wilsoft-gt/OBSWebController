import { recordingStore } from '../store/recordingStore'
import ObsInstance from '../utils/obsHandler'
import { Button } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

export const RecordingComponent = () => {
	const data = recordingStore(store =>  store.data)
	const obs = ObsInstance
	if (data && data.outputActive) {
		return(	
			<div className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
				<p className='breathingAnimation' style={{fontSize: "1.5em"}}><FontAwesomeIcon icon={faCircle} className='margin-r-05' style={{color: 'red'}}/><strong>Recording</strong></p><br />
				<ul>
					<li><strong>Time: </strong>{data.outputTimecode.split(".")[0]}</li>
					<li><strong>Video info: </strong> {data.outputWidth}x{data.outputHeight}, {data.path.split(".").slice(-1)}</li>
					<li><strong>Output name: </strong>{data.path.split("/").slice(-1)[0].split(".")[0]}</li>
					<li><strong>Output path: </strong>{data.path.slice(0, data.path.lastIndexOf("/")+1)}</li>
					<li><strong>Output size: </strong> {(data.outputBytes*0.000001).toFixed(2)}MB</li>
				</ul><br /><br />
				<Button variant='destructive' onClick={() => obs.startStopRecording()}> 
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
