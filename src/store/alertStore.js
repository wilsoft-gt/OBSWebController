import { create } from "zustand";
import { devtools } from "zustand/middleware";


const initialState = {
  isOpen: false,
  data: {
		title: '',
		description: '',
		icon: ''
	}
}

export const alertStore = create(devtools((set) => ({
  ...initialState,
  displayAlert: (newData) => set({isOpen: true, data: newData}, false, "Display Alert"),
  hideAlert: () => set(({isOpen: false, data: initialState.data}), false, "Hide Alert")
})))