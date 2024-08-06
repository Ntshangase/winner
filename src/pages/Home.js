import React from 'react';
import CustomerLanding from './CustomerLanding';


function Home() {
  return (
    <div>
      <h2>Hello world</h2>
      <div>
        <button onClick={CustomerLanding}>Customer</button>
        <button>Repair</button>
      </div>
    </div>
  )
}

export default Home