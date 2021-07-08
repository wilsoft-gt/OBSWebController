import React from 'react'
import {Button} from 'react-rainbow-components'
import { useDispatch } from 'react-redux'
import { Disconnect } from '../redux/connectDucks.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
export const SettingsComponent = () => {
	const dispatch = useDispatch()
	return(
		<div>
			<div>
				<img src="icon.png" alt="obs icon" style={{width:'150px', height:'auto'}} />
				<h2>OBS remote controller</h2>
				<p>Developed by <a href="wilsoft-gt.github.io" target="_blank">wilsoft-gt</a></p>
				<p>You can check the source code on <a href="http://www.url.com" target="_blank">here</a></p>
			</div>		
			<div>
				<h2>Theme chooser will be here</h2>
			</div>
			<Button variant='destructive' onClick={() => dispatch(Disconnect())}>
				<FontAwesomeIcon icon={faTimesCircle} className='margin-r-05' />
				Disconnect
			</Button>
		</div>
	)
}
