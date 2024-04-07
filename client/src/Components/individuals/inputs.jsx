import React from 'react'

const inputs = ({family}) => {
  return (
    <> 
    <div className="form_content_header"><label> Family : <span>{family}</span> </label></div>
    
    <label> Crews : </label> <input type='text' />
    <label> ME definition  : </label><input type='text' />
    <label> ME support  : </label><input type='text' />
    <label> Rework  : </label><input type='text' />
    <label> Poly  : </label><input type='text' />
    <label> Back-up  : </label><input type='text' />
    <label> Containment  : </label><input type='text' />
    <label> SOS  : </label><input type='text' />
    </>
  )
}

export default inputs
