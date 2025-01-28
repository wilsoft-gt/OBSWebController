import { LoginView } from './LoginView'
import { ControllerView } from './ControlerView'
import { obsStore } from '../store/connectStore'

export const MainView = () => {
	const connection = obsStore(store => store.isConnected)
	if (!connection.isConnected) {
		return (

				<LoginView />

		)
	} else {
		return (

				<ControllerView />

		)
	}
}
