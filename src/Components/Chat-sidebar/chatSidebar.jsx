import React from 'react'
import ChatNavbar from '../../components/Chat-Navbar/chatNavbar';
import ChatSearch from '../../components/Chat-search/chatSearch';
import Chats from '../../components/Chats/Chats';

const chatSidebar = () => {
  return (
    <div className='acb_sidebar'>
        <ChatNavbar/>
        <ChatSearch/>
        <Chats/>
    </div>
  )
}

export default chatSidebar