import React from 'react';
import AcbTab from '../src/pages/Tab/AcbTab';
import Dashboard from '../src/pages/Dashboard/Dashboard';
const App = () => {
    let current_page = window.location.search;

    if(current_page === '?page=admin_chat_box'){
        return (
            <div className="acb_dashboard" id='acb_dashboard_start'>
               <Dashboard/>
            </div>
         );
    }else if(current_page === '?page=admin_chat_box_setting'){
        return (
            <div className="acb_setting" id='acb_setting_start'>
                <AcbTab/>
            </div>
        );
    } 
 
}


export default App; 