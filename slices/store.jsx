import {configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import adminReducer from "./adminSlice"
import { PersistGate } from 'redux-persist/integration/react'


const adminPersistConfig = {
    key: 'admin',
    storage,
}

const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer)

const store = configureStore({
    reducer: {
        admin: persistedAdminReducer,
    }
})

export const persistor = persistStore(store)

export const makeStore = () => {
    return store
}

export default store