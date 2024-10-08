import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { apiSlice } from './apiSlide'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store