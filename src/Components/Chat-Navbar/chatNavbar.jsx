import React, { useContext } from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase'
import NavbarImg from '../../img/loginpage.jpg'
import { AuthContext } from '../../context/AuthContext'
import { useState } from "react";

const chatNavbar = () => {
  const {currentUser} = useContext(AuthContext)

  const clear = async e => {
    window.location.reload();
  }

  return (
    <div className='acb_navbar'>
      <span className="acb_logo">
        CUSTOMER SUPPORT
      </span>

      <div className="acb_user">
        <img src={currentUser && currentUser.photoURL ? currentUser.photoURL: NavbarImg} alt="" />
        <span>{currentUser && currentUser.displayName ? currentUser.displayName : <span>Please Logged in</span>}</span>
        { currentUser && <button onClick={()=> signOut(auth) }>logout</button>}
        { currentUser && <button onClick={clear}>Clear</button>}
      </div>

      {/* <div className="acb_user">
        {currentUser ? (
            <>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=> signOut(auth) }>logout</button>
            </>
          ) : 
            <>
            <img src={NavbarImg} alt="" />
            <span>Please Logged in</span>
            </>
        }
      </div> */}


    </div>
  )
}

export default chatNavbar