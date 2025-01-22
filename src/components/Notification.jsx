import { Notification } from 'react-rainbow-components'
import {useSelector, useDispatch} from 'react-redux'
import { hideAlert } from '../redux/alertDucks'

export const Alerts = () => {
	const alerts = useSelector(store => store.alertReducer)
	const dispatch = useDispatch()
	if (alerts && alerts.isOpen) {
		setTimeout(() => {
			dispatch(hideAlert())
		}, 15000);
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
