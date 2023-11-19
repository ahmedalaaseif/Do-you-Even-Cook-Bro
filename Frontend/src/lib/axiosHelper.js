
import axios from 'axios';

// let backendURL= 'http://localhost:3000/'
// let backendURL= 'http://131.159.203.84:3000/'
let backendURL= 'http://172.20.10.4:3000/'
export const axiosHelper= async (method,endpoint,data)=>
{
    try {
        const res = await axios({
            method: method,
            url: backendURL+endpoint,
            data
          })
    
        return res
    } catch (error) {
        return error
    }
 
}