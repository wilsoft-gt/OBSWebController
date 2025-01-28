import { LoginView } from './LoginView'
import { ControllerView } from './ControlerView'
import { obsStore } from '../store/connectStore'

export const MainView = () => {
	const connection = obsStore(store => store.isConnected)
	if (!connection) {
		console.log("Waitfint for connection")
		return <LoginView />
	} else {
		console.log("Connection established!")
		return <ControllerView />
	}
}
