import { Button } from '@mui/material'
import { Google } from '@mui/icons-material'
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import {jwtDecode} from 'jwt-decode'




const GoogleOne = () => {
  const { dispatch }=useValue()
  const[disabled,setDisabled]=useState(false)

const handleResponse=(response)=>{
  const token=response.credential
  const decodedToken=jwtDecode(token)
  const {sub:id,email,name,picture:photoURL}=decodedToken
  dispatch({type:'UPDATE_USER',payload:{id,email,name,photoURL,token,google:true},
});
  dispatch({type:'CLOSE_LOGIN'})
}

const handleGoogleLogin=()=>{
  setDisabled(true)
  try {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });

    console.log('Google API initialized. Prompting sign-in...');
    window.google.accounts.id.prompt((notification) => {
      console.log('Google prompt notification:', notification);
      if (notification.isNotDisplayed()) {
        throw new Error('Google Sign-In prompt not displayed. Try clearing cookies or check the client_id.');
      }
      if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
        setDisabled(false);
      }
    });
  } catch (error) {
    dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message } });
    console.error('Error during Google login:', error);
  }
}
  return (
    <Button variant='outlined' startIcon={<Google />} disabled={disabled} onClick={handleGoogleLogin}>
        Login with Google
    </Button>
  )
}

export default GoogleOne