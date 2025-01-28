import { Button, CheckboxToggle } from 'react-rainbow-components'
import { Disconnect } from '../redux/connectDucks.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { themeStore } from '../store/themeStore.js'
import { obsStore } from '../store/connectStore.js'

export const SettingsComponent = () => {

	const theme = themeStore(store => store.theme)
	const connected = obsStore(state => state.isConnected)
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
					value={theme.darkMode}
					onChange={() => dispatch(setTheme(!theme.darkMode))}
				/>
				<FontAwesomeIcon icon={faMoon} size='2x'/>
			</div>
			{connected && <Button variant='destructive' onClick={() => dispatch(Disconnect())}>
				<FontAwesomeIcon icon={faTimesCircle} className='margin-r-05' />
				Disconnect
			</Button>}
		</div>
	)
}
