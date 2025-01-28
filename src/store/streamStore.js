import { create } from "zustand";
import { devtools } from "zustand/middleware";


const initialState = {
  isLoading: false,
  data: {},
  error: null
}

export const streamStore = create(devtools((set) => ({
  ...initialState,
  setStreamStatus: (data) => set(data),
  streamError: (e) => set({error: e}),
  streamLoading: () => set({isLoading: true}),
  streamStop: () => set({...initialState})
})))