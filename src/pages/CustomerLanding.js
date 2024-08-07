import React from 'react'
import Navbar from '../Components/Navbar'

function CustomerLanding() {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Track My Repair</h1>
        <p>This is your one stop shop for everything repair related</p>
      </div>
      <div>
        <h2>Active Orders</h2>
      </div>
      <div>
        <h2>Repair Quote</h2>
        <form>
          <label>
            Device Name: 
            <input type="text" />
          </label>
          <label>
            Device Type: 
            <select>
              <option value="Devices">Devices</option>
              <option value="Cars">Cars</option>
              <option value="Machinery">Machinery</option>
              <option value="Clothing">Clothing</option>
            </select>
          </label>
        </form>
      </div>
      <div>
        <h2>Timeline</h2>
      </div>
    </div>
  )
}

export default CustomerLanding