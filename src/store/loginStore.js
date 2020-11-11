import { writable, derived } from 'svelte/store'

const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key))
const setLocalStorageItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

let loginLocalStorage = getLocalStorageItem('login') || { isLogedIn:false, token:null }
export const session = writable(loginLocalStorage)

// save store to localstorage on change
session.subscribe( $session=>{
  //console.log('na subscribe',$session)
  if (!$session) return
  if ( $session.isLogedIn) setLocalStorageItem('login', $session)
  if (!$session.isLogedIn) setLocalStorageItem('login', { isLogedIn:false, token:null })
  //if ( $session.isLogedIn){
  //  var [resp,err] = await fetch2('api/v2/message_client_unread_count_get')   
  //  console.log('message_client_unread_count_get',  resp)
  //}
    //message_client_unread_count = storeTemplate('message_client_unread_count')

})


//export {session}