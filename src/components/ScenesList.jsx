import { useState, useEffect } from 'react'
import { scenesStore } from '../store/scenesStore'
import { VisualPicker, VisualPickerOption, Spinner } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import ObsInstance from '../utils/obsHandler'

export const ScenesComponents = () => {
	const obs = ObsInstance
	const data = scenesStore(store => store.data)
	const [pickerValue, setPickerValue ] = useState(data.currentProgramSceneName)
	const handlePickerValue = (value) => {
		console.info(`El nuevo valor del picker es: ${value}`)
		setPickerValue(value)
		obs.setCurrentScene(value)
		console.info(`El valor del estado es: ${pickerValue}`)
	}

	useEffect(() => {
		setPickerValue(data.currentProgramSceneName)	
	}, [data.currentProgramSceneName])

	if (data.scenes === undefined) {
		return <Spinner size='large' type='arc' variant='brand'/> 
	} else {
		return(
			<div className='h-100 overflow-auto'>
				<VisualPicker 
					id='visual-picker'	
					value={pickerValue}
					onChange={(value) => handlePickerValue(value)}
					className='overflow-auto'
				>
					{
						data.scenes.map((scene) => {
							return (
								<VisualPickerOption key={scene.sceneId} name={scene.sceneName}>
									<FontAwesomeIcon style={{marginBottom: '0.25em'}} icon={faPhotoVideo} size='3x' />
									{scene.sceneName}
								</VisualPickerOption>
							)
						})
					}
				</VisualPicker>
			</div>
		)

	}
}
