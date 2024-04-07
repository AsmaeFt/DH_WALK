
import React from 'react';

const Inputs = ({family,value,onInputChange }) => {

  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <> 
    <div> 
      <div className="form_content_header">
        <label> Family : <span>{family}</span> </label>
      </div>
      
      <label>Crews:</label> <input type='text'  value={value} onChange={handleInputChange}  />
      <label>ME definition:</label><input type='text' name="meDefinition"  value={value} onChange={handleInputChange}/>
      <label>ME support:</label><input type='text' name="meSupport"  value={value} onChange={handleInputChange}/>
      <label>Rework:</label><input type='text' name="rework"  value={value} onChange={handleInputChange} />
      <label>Poly:</label><input type='text' name="poly"  value={value} onChange={handleInputChange}/>
      <label>Back-up:</label><input type='text' name="backup"  value={value}  onChange={handleInputChange}/>
      <label>Containment:</label><input type='text' name="containment"  value={value}  onChange={handleInputChange}/>
      <label>SOS:</label><input type='text' name="sos"  value={value} onChange={handleInputChange} />
      </div>
    </>
  );
};

export default Inputs;
