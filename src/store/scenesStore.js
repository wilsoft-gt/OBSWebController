import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isLoading: true,
	data: [],
	error: null
}

export const scenesStore = create(devtools((set) => ({
  ...initialState,
  setScenes: (scenes) =>  set({data: {...scenes}, isLoading: false}),
  scenesError: (e) => set({error: e, isLoading: false, data: []}),
  scenesLoading: () => set({...initialState, isLoading: true})
})))