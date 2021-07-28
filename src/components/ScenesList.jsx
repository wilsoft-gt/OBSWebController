import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VisualPicker, VisualPickerOption, Spinner, Card } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import { setCurrentScene } from '../redux/connectDucks'

export const ScenesComponents = () => {
	const data = useSelector(store => store.scenesReducer.data)
	const [pickerValue, setPickerValue ] = useState('')
	const dispatch = useDispatch()
	const handlePickerValue = (value) => {
		setPickerValue(value)
		dispatch(setCurrentScene(value))
	}

	useEffect(() => {
		setPickerValue(data.currentScene)	
	}, [data])

	if (data.scenes === undefined) {
		return <Spinner size='large' type='arc' variant='brand'/> 
	} else {
		return(
			<div className='h-100 overflow-auto'>
				<VisualPicker 
					id='visual-picker'	
					value={pickerValue}
					onChange={handlePickerValue}
					className='overflow-auto'
				>
					{
						data.scenes.map((scene, index) => {
							return (
								<VisualPickerOption key={index} name={scene.name}>
									<FontAwesomeIcon style={{marginBottom: '0.25em'}} icon={faPhotoVideo} size='3x' />
									{scene.name}
								</VisualPickerOption>
							)
						})
					}
				</VisualPicker>
			</div>
		)

	}
}
