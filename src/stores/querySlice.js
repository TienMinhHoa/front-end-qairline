import { createSlice } from '@reduxjs/toolkit'

const querySlice = createSlice({
    name: 'query',
    initialState: {
        query: {},
    },
    reducers: {
        setQueryStore: (state, action) => {
            console.log(action.payload)
            state.query = {
                airportTo: action.payload.airportTo,
                airportFrom: action.payload.airportFrom,
                timeStart: action.payload.timeStart,
            }
        },
    },
})

export const { setQueryStore } = querySlice.actions
export default querySlice.reducer