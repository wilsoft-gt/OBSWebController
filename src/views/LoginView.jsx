import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Application, Card, Button, ButtonIcon, Input, Avatar } from 'react-rainbow-components'
import { Alerts } from '../components/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faCog } from '@fortawesome/free-solid-svg-icons'
import { Connect } from "../redux/connectDucks";
import { SettingsComponent } from '../components/SettingsComponent'

export const LoginView = () => {
	const [address, setAddress] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch();
	const theme = useSelector(store => store.themeReducer)
	const handleConnection = () => {
		dispatch(Connect(address))
	}

	return (
		<Application theme={theme.theme}>
			<Modal 
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(!isModalOpen)}
				title='Info'
				icon={<FontAwesomeIcon icon={faPlug} />}
			>
				<SettingsComponent />
			</Modal>
			<article style={{backgroundColor: theme.theme.rainbow.palette.mainBackground}} className='d-flex flex-column justify-content-center vh-100 align-items-center'>
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
