import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../../firebase';
import {signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Add from "../../img/addAvatar.png"
import "./chats.scss";

const Chats = () => {
  const [chats, setChats] = useState([])
  const [imgerr, setImgErr] = useState(false);
  const [err, setErr] = useState(false);
  const [error, setError] = useState(null);//firebase
  const [form, setForm] = useState(1);
  // const [imageUploaded, setImageUploaded] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  /**
   * From backend collecting logged in user info
   */
  useEffect(()=>{
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
        return () => {
          unsub();
        };
      }
    }
    currentUser && currentUser.uid && getChats();
  },[currentUser])

  const handleSelect = ( u ) =>{
    dispatch({type:"CHANGE_USER", payload: u})
  }
  /**
   * Style
   */
  const acb_fromWrapper_style = {
    backgroundColor: "white",
    padding: "20px 60px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center"
  };
  const acb_chats_scroll = {
    overflowY: "scroll",
    // height: "70vh",
    height: "65vh",
  }

  /**
   * 
   * @param {Sign In} e 
   */
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    if(password.length <= 5){
      setErr(true);
    }

    /**
     * Authentication
     */
    try{
         await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
        setErr(true);
        setError(err.message);
        console.log(err)
    }
  }

  /**
   * 
   * @param {Register} e 
   */
  const handleRegister = async(e) =>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; 

    if(password.length <= 5){
      setErr(true);
      return;
    }
    if(e.target[3].files.length === 0){
      setImgErr(true);
      return;
    }

    /**
     * Authentication
     */

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on( 
          (error) => {
            setErr(true)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                //   console.log('File available at', downloadURL);
                await updateProfile(res.user,{
                    displayName, //displayName:displayName,
                    photoURL: downloadURL,
                });

                // set Doc and database 
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });

                // create user chat db once register done
                await setDoc(doc(db, "userChats", res.user.uid),{});

                /* setTimeout(() => {
                  window.location.reload();
                }, 500);  */

            });
          }
        );
        // end 
    }
    catch(err){
        setErr(true);
        setError(err.message);
        console.log(err)
    }
  };

  return (
    <div className='acb_chats' style={currentUser && acb_chats_scroll}>
       {currentUser ? (
        <>
          {chats ? Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
          // {Object.entries(chats)?.map(chat=>(
            <div className="acb_userChat" key={chat[0]} onClick={ ()=> handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="acb_userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text }</p>
                </div>
            </div>
          )): null}
        </>
      ) : 
    
        <div className='signinpanel'>

          <div className="acb_formContainer">
              {/* Login  */}
            {form === 1 ? (
              <>
              <div className="acb_fromWrapper" style={acb_fromWrapper_style}>
                  <span className="acb_logo">CUSTOMER SUPPORT LOGIN PORATL</span>
                  <span className="acb_title">Login</span>
                  <form action="" onSubmit={handleSubmit}>
                      <input type="email" placeholder='email'/>
                      <input type="password" placeholder='password'/>
    
                      <button>Login</button>
                      {err && <span style={{color:"red"}}>{error}</span>}
                  </form>
                  <span>You don't have an account? <span className="acb_signup" onClick={() => setForm(2)}>Sign up</span></span>
              </div>
              </>
            ):
            <>
              {/* Register  */}
              <div className="acb_fromWrapper">
                <span className="acb_logo">CUSTOMER SUPPORT SIGNUP PORATL</span>
                <span className="acb_title">Register</span>
                <form action="" onSubmit={handleRegister}>
                    <input type="text" placeholder='display name'/>
                    <input type="email" placeholder='email'/>
                   
                    <input type="password" placeholder='password'/>
                    {err && <span style={{color:"red"}}>Use at least a 6-digit password.</span>}
                    <input style={{display:"none"}} type="file" id='acb_file' />
                        <label htmlFor="acb_file">
                            <img src={Add} alt="avatar" />
                                <span>Add an avatar</span>
                        </label>
                    <button>Sign up</button>
                {imgerr && (<p style={{color:"red"}}>Please uploaded images</p>)}
                {err && <p>{error}</p> }
                </form>
                <span>You do have an account? <span className="acb_signup" onClick={() => setForm(1)}>Login</span></span>
            </div>
            </>
          }

        </div>


        </div>
      }
    </div>
  )
}

export default Chats