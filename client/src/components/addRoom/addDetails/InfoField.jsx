import { Check } from '@mui/icons-material'
import { Avatar, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../../../context/ContextProvider'

let timer
const InfoField = ({mainProps,optionalProps={},minLength}) => {

    const {dispatch}=useValue()
    const[editing,setEditing]=useState(false)
    const[error,setError]=useState(false)
    const[success,setSuccess]=useState(false)

    const handleChange=(e)=>{
        dispatch({type:'UPDATE_DETAILS',payload:{[e.target.name]:e.target.value}})
        if(!editing) setEditing(true)
        clearTimeout(timer)
        timer=setTimeout(()=>{
            setEditing(false)
            if(e.target.value.length<minLength){
                if(!error) setError(true);
                if(success) setSuccess(false);
            }
        else{
            if(error) setError(false);
            if(!success) setSuccess(true);

        }
        })
            
    }

  return (
    <TextField
    {...mainProps}
    {...optionalProps}
    error={error}
    helperText={error && `This field should be ${minLength} characters or more`}
    color={success ? 'success':'primary'}
    variant='outlined'
    onChange={handleChange}
    required
    InputProps={{
        endAdornment:(
            <InputAdornment position='end'>
                {editing?(
                    <Avatar sx={{height:70}}/>
                ):(
                    success && <Check color='success'/>
                )}
            </InputAdornment>
        )
    }}></TextField>
  )
}

export default InfoField