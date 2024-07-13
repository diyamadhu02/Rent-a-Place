import React from 'react'
import { useValue } from '../../context/ContextProvider'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'
import UserMenu from './UserMenu'
import { useState } from 'react'
import useCheckTokens from '../../hooks/useCheckTokens'


const UserIcons = () => {
    useCheckTokens();
    const{
        state:{ currentUser },

    }= useValue();

    const[anchorUserMenu,setAnchorUserMenu]=useState(null)

  return (
   <Box>
    <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={20}>
            <Mail/>
        </Badge>
    </IconButton>
    <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={20}>
            <Notifications/>
        </Badge>
    </IconButton>
    <Tooltip title='Open User Settings'>
        <IconButton onClick={(e)=> setAnchorUserMenu(e.currentTarget)}>
            <Avatar src={currentUser?.photo} alt={currentUser?.name}>
                {currentUser?.name?.charAt(0).toUpperCase()}
            </Avatar>
        </IconButton>
    </Tooltip>
    <UserMenu {...{anchorUserMenu, setAnchorUserMenu}}/>
   </Box>
  )
}

export default UserIcons
