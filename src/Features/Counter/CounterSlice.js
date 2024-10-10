import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0,
}

export const counterSlice = createSlice ({
    name: 'counter',
    initialState,
    reducers: {
        incriment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
        }
    }
});

export const { incriment, decrement} = counterSlice.actions;
export default counterSlice.reducer;