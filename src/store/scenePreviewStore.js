import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isLoading: true,
	image: null,
	error: null
}

export const scenePreviewStore = create(devtools((set) => ({
  ...initialState,
  setScenePreview: (preview) => set({image: preview, isLoading: false}),
  stopScenePreview: () => set({...initialState, isLoading: false}),
  scenePreviewError: (e) => set({fetchScene: undefined, error: e, isLoading: false})
})))