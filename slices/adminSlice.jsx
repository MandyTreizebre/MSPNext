import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    infos: {}, //Objet vide pour stocker les informations de l'admin 
    isLogged: false,
}

export const adminSlice = createSlice({
    name: "admin", 
    initialState, 
    reducers: {  
        initializeAdmin: (state, action) => {
            state.infos = action.payload //Mise à jour des informations de l'admin avec les données fournies dans le payload
            state.isLogged = true  
        },
        //Connecte l'admin en mettant à jour l'état avec les données fournies
        connectAdmin: (state, action) => {
            state.infos = action.payload /*Updating the admin's info with the provided payload*/
            state.isLogged = true /*Setting the logged in flag to true*/
        },
        //Déconnecte l'admin en réinitialisant l'état à ses valeurs initiales
        logoutAdmin: (state) => {
            state.infos = {} 
            state.isLogged = false 
        }

    }
})

//Exportation des actions pour être utilisées par les composants
export const {connectAdmin, logoutAdmin, initializeAdmin} = adminSlice.actions
//Sélecteur pour obtenir le slice admin depuis le store Redux
export const selectAdmin = (state) => state.admin
//Exportation de la fonction réductrice pour être utilisée par le store Redux
export default adminSlice.reducer