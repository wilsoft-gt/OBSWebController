import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import logger from 'redux-logger'
import obsReducer from "./connectDucks";
import scenesReducer from "./scenesDucks"
import previewReducer from './scenePreviewDucks'
import recordingReducer from './RecordingDucks'
import streamingReducer from './streamStatusDucks'
import alertReducer from './alertDucks'
import themeReducer from './ThemeDucks'

const rootReducer = combineReducers({
	obsReducer: obsReducer,
	scenesReducer: scenesReducer,
	previewReducer: previewReducer,
	recordingReducer: recordingReducer,
	streamReducer: streamingReducer,
	alertReducer: alertReducer,
	themeReducer: themeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = [thunk]

if (process.env.NODE_ENV !== 'production' ) {
	middleware.push(logger)	
}

export default function GenerateStore() {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(...middleware))
	);
	return store;
}
