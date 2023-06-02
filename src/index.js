import App from "./App";
import React from 'react';
import { render } from '@wordpress/element';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

window.addEventListener('DOMContentLoaded', (event) => {

    var dashboard = document.getElementById('acb_admin_chat_box');
    var setting = document.getElementById('acb_admin_chat_box_firebase');

    if (dashboard) {
       render(
        <AuthContextProvider> 
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>
       , dashboard);
    }
    if (setting) {
        render(<App />, setting);
    }

});