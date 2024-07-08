import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    infos: {}, 
    isDarkMode: false
}

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState, 
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
        setDarkModeInfos: (state, action) => {
            state.infos = action.payload
        }
    }
})


export const {toggleDarkMode, setDarkModeInfos} = darkModeSlice.actions

export const selectIsDarkMode = (state) => state.darkMode.isDarkMode
export const selectDarkModeInfos = (state) => state.darkMode.infos

export default darkModeSlice.reducer