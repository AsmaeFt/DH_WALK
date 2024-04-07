
import React from 'react';

const Inputs = ({ family }) => {

  return (
    <> 
    <div> 
      <div className="form_content_header">
        <label> Family : <span>{family}</span> </label>
      </div>
      
      <label>Crews:</label> <input type='text' name="crews"   />
      <label>ME definition:</label><input type='text' name="meDefinition"  />
      <label>ME support:</label><input type='text' name="meSupport"  />
      <label>Rework:</label><input type='text' name="rework"  />
      <label>Poly:</label><input type='text' name="poly"  />
      <label>Back-up:</label><input type='text' name="backup"   />
      <label>Containment:</label><input type='text' name="containment"   />
      <label>SOS:</label><input type='text' name="sos" />
      </div>
    </>
  );
};

export default Inputs;
