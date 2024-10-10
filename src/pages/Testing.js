import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incriment, decrement } from '../Features/Counter/CounterSlice';

export const Testing = () => {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

  return (
    <main>
        <p>{count}</p>
        <div>
            <button onClick={() => {dispatch(incriment())}}>+</button>
            <button onClick={() => {dispatch(decrement())}}>-</button>
        </div>
    </main>
  )
}
