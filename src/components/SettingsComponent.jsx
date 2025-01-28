import { Button, CheckboxToggle } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { themeStore } from '../store/themeStore.js'
import { obsStore } from '../store/connectStore.js'
import ObsInstance from '../utils/obsHandler.js'

export const SettingsComponent = () => {
	const setTheme = themeStore(store => store.setTheme)
	const isDarkMode = themeStore(store => store.isDarkMode)
	const connected = obsStore(state => state.isConnected)
	const obs = ObsInstance
	return(
		<div>
			<div>
				<img src="icon.png" alt="obs icon" style={{width:'150px', height:'auto'}} />
				<h2>OBS remote controller</h2>
				<p>Developed by <a href="https://github.com/wilsoft-gt" target="_blank">wilsoft-gt</a></p>
				<p>You can check the source code on <a href="https://github.com/wilsoft-gt/OBSWebController" target="_blank">here</a></p>
			</div>		
			<div className='d-flex flex-row align-items-center justify-content-center'>
				<FontAwesomeIcon icon={faSun} size='2x' />
				<CheckboxToggle 
					className='margin-3'
					value={isDarkMode}
					onChange={() => setTheme(!isDarkMode)}
				/>
				<FontAwesomeIcon icon={faMoon} size='2x'/>
			</div>
			{connected && <Button variant='destructive' onClick={() => obs.disconnect()}>
				<FontAwesomeIcon icon={faTimesCircle} className='margin-r-05' />
				Disconnect
			</Button>}
		</div>
	)
}
