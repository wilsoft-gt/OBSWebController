import { LoginView } from './LoginView'
import { ControllerView } from './ControlerView'
import { useSelector } from 'react-redux'
export const MainView = () => {


	const connection = useSelector(store => store.obsReducer)
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
