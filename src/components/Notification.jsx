import { Notification } from 'react-rainbow-components'
import { alertStore } from '../store/alertStore'

export const Alerts = () => {
	const isOpen = alertStore(store => store.isOpen)
	const data = alertStore(store => store.data)
	const hideAlert = alertStore(store => store.hideAlert)
	if (data && isOpen) {
		setTimeout(() => {
			hideAlert()
		}, 15000);
		return (
			<Notification
				className='alert'
				title={data.title}
				description={data.description}
				icon={data.icon}
				onRequestClose={() => hideAlert()}
			/>
		)
	} else {
		return null
	}
}
