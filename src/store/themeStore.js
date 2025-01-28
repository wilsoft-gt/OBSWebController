import { create } from "zustand";
import { devtools } from "zustand/middleware";


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

const initialState = {
  isDarkMode: false,
  theme: themes["light"]
}


export const themeStore = create(devtools((set) => ({
  ...initialState,
  setTheme: (isDarkMode) => set({isDarkMode: isDarkMode, theme: themes[isDarkMode ? "dark" : "light"]}),
})))