import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isConnected: false
}

export const obsStore = create(devtools((set) => ({
  ...initialState,
  connect: () => set({isConnected: true}),
  disconnect: () => set(initialState)
})))

