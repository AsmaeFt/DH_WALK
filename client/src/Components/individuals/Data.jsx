import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import date from '../assets/dates.png'
import car from '../assets/car.png'
import next from '../assets/next.png'
import './Data.css'


//import components
import Inputs from './inputs'

const Data = () => {

  const [project_Data, setProject_Data] = useState({})

const callback = useCallback(async ()=> {

  try {
    const res = await axios.get('http://localhost:1200/api/Get_project');
    const projects = await res.data
    setProject_Data(projects)

    const getProject= projects.filter((e)=> e.name==='Project A');
    const families = getProject.map((e) => e.family.map((f) => f.name));
    
    console.log(getProject,families);

     } catch(err){
      return console.error(err)
     }
},[])
useEffect(()=> {callback();},[callback]);





  return (
    <div className="data_container">

    <div className="form_container">
      <form>

        <div className="form_header">
        <img src={date}/>
          <label> Week : <span> 05 </span>  </label>
          <label>  Month : <span>{new Date().toLocaleString('en-US', { month: 'long' })} </span></label>
          <label>  Year : <span>{new Date().getFullYear()} </span></label>
         
        

        </div>

        <div className="project">
        <img src={car}/>
          <label> Project : <span> K9 KSK </span> </label>
        </div>

        <div className="form_content">

          <div>
        
          </div>

           
          <div>

            <label > Total HC : </label><input type='text'/>
            <label > Total HC Required: </label><input type='text'/>
            <label > Total HC Family1: </label><input type='text'/>
            <label > Total HC Family2: </label><input type='text'/>
            <label > Total HC Family3: </label><input type='text'/>
            <label > Total OS: </label><input type='text'/>
            <label > Total Special list out of the plant: </label><input type='text'/>
            <label > Acual DH: </label><input type='text'/>
          </div>
        </div>
      </form>

    </div>
   </div>
  )
}

export default Data