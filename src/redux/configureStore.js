import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import obsReducer from "./connectDucks";
import scenesReducer from "./scenesDucks"
import previewReducer from './scenePreviewDucks'
import recordingReducer from './RecordingDucks'
import streamingReducer from './streamStatusDucks'
import alertReducer from './alertDucks'

const rootReducer = combineReducers({
	obsReducer: obsReducer,
	scenesReducer: scenesReducer,
	previewReducer: previewReducer,
	recordingReducer: recordingReducer,
	streamReducer: streamingReducer,
	alertReducer: alertReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function GenerateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
  return store;
}
