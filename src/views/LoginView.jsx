import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, ButtonIcon, Input, Avatar } from 'react-rainbow-components'
import { Alerts } from '../components/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlug } from '@fortawesome/free-solid-svg-icons'
import { displayAlert } from '../redux/alertDucks'
import { Connect } from "../redux/connectDucks";

export const LoginView = () => {
	const [address, setAddress] = useState('');
	const dispatch = useDispatch();
	const handleConnection = () => {
		dispatch(Connect(address))
	}

	return (
		<div className='d-flex flex-column justify-content-center vh-100 align-items-center'>
			<Alerts />
			<Card 
				className='w-50'
				title='Establish Connection'
				icon={<Avatar variant='success' icon={<FontAwesomeIcon icon={faPlug} />} />}
actions={<ButtonIcon onClick={() => dispatch(displayAlert({title: 'Soon', description: 'Here you will have the option to choose a color theme but still a work in progress', icon: 'info'}))} variant='neutral' icon={<FontAwesomeIcon icon={faCog}/>} />}
			>
			<div className='w-100 d-flex flex-column align-items-center'>
				<div className='w-50 d-flex flex-column margin-3'>
					<Input className='address-input' value={address} isCentered label='Host address' onChange={e => setAddress(e.target.value)} /> 
					<Button variant='brand' onClick={handleConnection}>Connect</Button>
				</div>
			</div>
			</Card>
		</div>
	);
};
