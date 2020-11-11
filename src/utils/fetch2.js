import { session } from '@/store/loginStore.js'
import axios from 'axios'
let authorization = null;
session.subscribe($session=>{
  authorization = $session?$session.token:null
})
const HOSTNAME = "http://localhost:3001/api/v2/"

export const fetch2 = window.fetch2 = function(method, url, obj){
  //console.log('params', obj)
  return axios({
    method: method || 'post',
    url: HOSTNAME+url,
    data: obj,
    params: obj,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(authorization? {"authorization":'Bearer '+ authorization}:{})
    },
  })
  .then(function (response) {
      //return [response.data,null]
      if (response.data && response.data.errorCode)
        return([null,response.data])
      else
        return([response.data,null]) 


  })
  .catch(function (error) {
    console.error(error);
    return [null,error]
  });
}
