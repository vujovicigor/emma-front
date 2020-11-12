import { session } from '@/store/loginStore.js'
import axios from 'axios'
import Toast from '@/utils/toast.js'
const toast = new Toast({duration:2000})  
let authorization = null;
session.subscribe($session=>{
  authorization = $session?$session.token:null
})
//const APIHOSTNAME = "http://localhost:3001/api/v2/"

function showErrorNotification(errorArray){
  let msg_array = []
  if (!errorArray || !Array.isArray(errorArray)) return
  errorArray.forEach((e,i)=>{
    msg_array.push( e.stack )
  }); 
  toast.error(msg_array.join('\n'))
}

export const fetch2 = window.fetch2 = function(method, url, obj){
  //console.log('params', obj)
  return axios({
    method: method || 'post',
    url: window.APIHOSTNAME+url,
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
      if (response.data && response.data.errorCode){
        showErrorNotification(response.data.error)
        return([null,response.data])
      }
      else
        return([response.data,null]) 


  })
  .catch(function (error) {
    if (error.response && error.response.data && error.response.data.error)
      showErrorNotification(error.response.data.error)
    return [null,error]
  });
}
