import { useState } from "react";
import { Modal, Application, Card, Button, ButtonIcon, Input, Avatar } from 'react-rainbow-components'
import { Alerts } from '../components/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faCog } from '@fortawesome/free-solid-svg-icons'
import ObsHandler from "../utils/obsHandler";
import { SettingsComponent } from '../components/SettingsComponent'
import { themeStore } from "../store/themeStore";

export const LoginView = () => {
	const [address, setAddress] = useState('ws://192.168.0.15:4444');
	const [isModalOpen, setIsModalOpen] = useState(false)
	const obs = ObsHandler
	const theme = themeStore(store => store.theme)
	const handleConnection = () => obs.connect(address)

	return (
		<Application theme={theme}>
			<Modal 
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(!isModalOpen)}
				title='Info'
				icon={<FontAwesomeIcon icon={faPlug} />}
			>
				<SettingsComponent />
			</Modal>
			<article style={{backgroundColor: theme.rainbow.palette.mainBackground}} className='d-flex flex-column justify-content-center vh-100 align-items-center'>
				<Alerts />
				<Card 
					className='w-50'
					title='Connect'
					icon={<Avatar variant='success' icon={<FontAwesomeIcon icon={faPlug} />} />}
					actions={
						<ButtonIcon variant='success' icon={<FontAwesomeIcon icon={faCog} onClick={() => setIsModalOpen(!isModalOpen) }/>}/>
					}
				>
					<div className='w-100 d-flex flex-column align-items-center'>
						<div className='w-50 d-flex flex-column margin-3'>
							<Input className='address-input' value={address} isCentered label='Host address' onChange={e => setAddress(e.target.value)} /> 
							<Button variant='brand' onClick={handleConnection}>Connect</Button>
						</div>
					</div>
				</Card>
			</article>
		</Application>
	);
};
