import React from 'react'
import NavBar from './components/NavBar'
import Login from './components/user/Login'
import Notifications from './components/Notifications';
import Loading from './components/Loading';
import BottomNav from './components/BottomNav';
import Room from './components/rooms/Room';

const App = () => {
  return (
    <>
    <Loading />
    <Notifications />
    <Login />
    <NavBar />
    <BottomNav />
    <Room/>
    </>
  );
}

export default App