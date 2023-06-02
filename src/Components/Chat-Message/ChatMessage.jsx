import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

const ChatMessage = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior:"smooth" })
  },[message])

  return (
    <div ref={ref} className={`acb_message ${message.senderId === (currentUser && currentUser.uid) && "owner"}`}>
      <div className="acb_messageInfo">
        <img src={message.senderId === (currentUser && currentUser.uid) ? (currentUser && currentUser.photoURL) : data.user.photoURL} 
        alt="" />
        <span>Just now</span>
      </div>
      <div className="acb_messageContent">
        <p>{message.text}</p>
        { message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default ChatMessage
