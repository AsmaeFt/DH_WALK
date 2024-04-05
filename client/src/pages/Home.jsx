import React from 'react'
import './Home.css'
const Home = () => {
  return (
   <>
   <div className="header_container">
    <h2>DH Headcount Walk {new Date().getFullYear()}</h2>
    <span>Weekly Walk </span>
   </div>

   <div className="data_container">

    <div className="form_container">
      <form>

        <div className="form_feader data">
          <label>Month : </label><span>{new Date().toLocaleString('en-US',{month:'long'})} </span>
          <label> Week : </label><span> Week 5</span>
        </div>

        <div className="form_sub_Header data">
          <label>Project :</label><span>K9 KSK </span>
          <label>HAB-K9 :</label><span>K9 KSK </span>
          
        </div>

        <div className="form_content data">
          <table>
            
            <tbody>
              <tr> 
                <td><label>Indirects % </label> </td>
                <td> <input type='text'/></td>
              </tr>
              <tr>
                <td> <label>Crews</label> </td>
                <td> <input type='text'/></td>
              </tr>
              <tr>
                <td> <label>HC Crew  </label> </td>
                <td><input type='text'/></td>
              </tr>

              <tr>
                <td> <label>ME Definition  </label> </td>
                <td><input type='text'/></td>
              </tr>
              <tr>
                <td><label>ME Definition  </label> </td>
                <td><input type='text'/></td>
              </tr>
              <tr>
                <td><label> ME Support </label></td>
                <td><input type='text'/> </td>
              </tr>
              <tr>
                <td><label>Rework  </label></td>
                <td><input type='text'/></td>
              </tr>

              <tr>
                <td> <label>Poly </label></td>
                <td><input type='text'/> </td>
              </tr>
              <tr>
                <td> <label>Back-up </label></td>
                <td> <input type='text'/></td>
              </tr>
              <tr>
                <td> <label>Containment </label></td>
                <td><input type='text'/> </td>
              </tr>
              <tr>
                <td> <label>SOS  </label></td>
                <td><input type='text'/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
   </div>
   </>
  )
}

export default Home