import React, { useCallback } from 'react'
import axios from 'axios'

const vertical_table = () => {

    const fetchData = useCallback(async () => {
        try{

        const res = await axios.get('http://10.236.150.19:8080/api/DATA');
        }catch (error) {
            console.error('Error fetching data:', error);
          }
    },[]);

  return (
    <div>vertical_table</div>

  )
}

export default vertical_table