import { create } from "zustand";
import { devtools } from "zustand/middleware";


const initialState = {
	isLoading: false,
	data: {},
	error: null
}

export const recordingStore = create(devtools((set) => ({
  ...initialState,
  getRecordingStatus: (data) => set(data),
  recordingError: (e) => set({error: e}),
  recordingLoading: () => set({isLoading: true}),
  recordingStop: () => set({...initialState})
})))