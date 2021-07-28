import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { ScenesComponents } from '../components/ScenesList'
import { PreviewComponent } from '../components/Preview'
import { RecordingComponent } from '../components/RecordingComponent'
import { StreamingComponent } from '../components/StreamingComponent'
import { SettingsComponent } from '../components/SettingsComponent'
import {Application, Tabset, Tab, Card, ButtonIcon, Avatar, Button, Modal } from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish, faDotCircle, faPhotoVideo, faCog } from '@fortawesome/free-solid-svg-icons'
import { Alerts } from '../components/Notification'

export const ControllerView = () => {
	window.onResize = (e) => console.log(e)
	const theme = useSelector(state => state.themeReducer)
	const [screenWidth, setScreenWidth ] = useState(window.innerWidth)
	const [tabSelection, setTabSelection] = useState('stream')
	const [isSettingsOpen, setSettingsOpen] = useState(false)

	const getTabContent = () => {
		return {'stream': <StreamingComponent />,
			'record': <RecordingComponent />,
			'scenes': <ScenesComponents />
		}[tabSelection]
	} 

	useEffect( () => {
		window.addEventListener('resize', (e) =>{
			setScreenWidth(window.innerWidth)
		})
	}, [])

	return(	
		<Application theme={theme.theme}>
			<Card
				icon={
					screenWidth > 768 ? <Avatar size='small' src='icon.png' /> : null
				}
				title={screenWidth > 768 ? 'Connected' : null}
				actions={ screenWidth > 768 ?
					<Button variant='success' size='small' onClick={() => setSettingsOpen(true)}>
						<FontAwesomeIcon className='margin-r-05' icon={faCog} />
						Settings
					</Button> : null
				}
				className='d-flex flex-column flex-grow-1 vh-100'
			>	
				<Alerts />
				<Modal 
					isOpen={isSettingsOpen} 
					onRequestClose={() => setSettingsOpen(false)} 
					title='Settings'
					icon={<FontAwesomeIcon icon={faCog} />}
				>
					<SettingsComponent />
				</Modal>
				<PreviewComponent />
				<div className="d-flex flex-column flex-grow-1 overflow-auto justify-content-center align-items-center w-100">

					<div className='d-flex flex-grow-1 overflow-auto w-75'> 
						{screenWidth > 768 ?
							<Card title='Choose the scene' className='w-50'> 
								<ScenesComponents />
							</Card> : '' }
						<Card className='d-flex flex-column justify-content-center align-items center w-50 flex-grow-1'>
							<Tabset
								fullWidth
								className='w-100'
								variant='line'
								id='tabset'
								onSelect={ (e, selected) => setTabSelection(selected) }
								activeTabName={tabSelection}
							> 
								{screenWidth < 768 ?
									<Tab
										name='scenes'
										label={
											<span> 
												<FontAwesomeIcon icon={faPhotoVideo} /> Scenes
											</span>
										}
									/> : null }
								<Tab
									name='stream'
									label={
										<span>
											<FontAwesomeIcon icon={faSatelliteDish} /> Stream
										</span>
									}
								/>
								<Tab 
									name='record'
									label={
										<span> 
											<FontAwesomeIcon icon={faDotCircle} /> Record
										</span>
									}
								/>
							</Tabset>
							{getTabContent()}
						</Card>
					</div>

				</div>
				{ screenWidth < 768 ?
					<ButtonIcon className='settingsButton' variant='success' icon={<FontAwesomeIcon icon={faCog} onClick={() => setSettingsOpen(!isSettingsOpen)} />} />: 
						null 
				}
			</Card>
		</Application>
	)	
}
