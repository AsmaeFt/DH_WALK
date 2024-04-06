import React from 'react'

import './Data.css'
const Data = () => {


  return (
    <div className="data_container">

    <div className="form_container">
      <form>

        <div className="form_header">
          <label> Date : {new Date().getFullYear()}</label>
          <label> Month : {new Date().toLocaleString('en-US', { month: 'long' })}</label>
          <label> Week : week 05 </label>
        </div>

        <div className="project">
          <h3>Project : <span> K9 KSK </span> </h3>
        </div>

        <div className="form_content">
          <div> 
            <label> Crews : </label> <input type='text' />
            <label> ME definition  : </label><input type='text' />
            <label> ME support  : </label><input type='text' />
            <label> Rework  : </label><input type='text' />
            <label> Poly  : </label><input type='text' />
            <label> Back-up  : </label><input type='text' />
            <label> Containment  : </label><input type='text' />
            <label> SOS  : </label><input type='text' />
            
            </div>
          <div>

         

          </div>
        </div>

      </form>

    </div>
   </div>
  )
}

export default Data