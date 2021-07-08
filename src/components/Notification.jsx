import React from 'react'
import { Notification } from 'react-rainbow-components'
import {useSelector, useDispatch} from 'react-redux'
import { hideAlert } from '../redux/alertDucks'

export const Alerts = () => {
	const alerts = useSelector(store => store.alertReducer)
	const dispatch = useDispatch()
	if (alerts && alerts.isOpen) {
		return (
			<Notification
				className='alert'
				title={alerts.data.title}
				description={alerts.data.description}
				icon={alerts.data.icon}
				onRequestClose={() => dispatch(hideAlert())}
			/>
		)
	} else {
		return null
	}
}
