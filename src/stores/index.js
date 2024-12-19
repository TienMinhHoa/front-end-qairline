import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import queryReducer from './querySlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        query: queryReducer,
    },
})

export default store