import { configureStore } from "@reduxjs/toolkit";
import { counterSlice }from "../../src/Features/Counter/CounterSlice";

export const Store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    }
});