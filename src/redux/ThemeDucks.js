export const SET_THEME = 'SET_THEME'

const themes = {
	dark: {
		rainbow: {
			palette: {
				mainBackground: '#212121',
				brand: '#885090',
				success: '#82a0b9',
				error: '#C4595F',
				warning: '#e7a553'
			}
		}
	},
	light: {
		rainbow: {
			palette: {
				mainBackground: '#fff',
				brand: '#01B6F5',
				success: '#1DE9B6',
				error: '#FE4849',
				warning: '#FC0'
			}
		}
	}
}


export default function themeReducer (
	state={
		darkMode: false,
		theme: themes['light']
	},
	action
) {
	switch(action.type) {
		case SET_THEME:
			return {...state, darkMode: action.payload, theme: themes[ action.payload ? 'dark' : 'light']}
		default:
			return state
	}
}

export const setTheme = (darkMode) => async (dispatch) => {
	dispatch({
		type: SET_THEME,
		payload: darkMode
	})
}
