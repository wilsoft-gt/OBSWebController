import React from 'react'
import { LoginView } from './LoginView'
import { ControllerView } from './ControlerView'
import { useSelector } from 'react-redux'
import { Application } from 'react-rainbow-components'
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
