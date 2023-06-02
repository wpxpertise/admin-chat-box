import { useState, useEffect } from "react";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Navbar from "../../Components/Navbar/Navbar";
import "./acbtab.scss";
import Firebase from "../Firebase/Firebase";
import Setting from "../Setting/Setting";
import DataTableUser from "../../Components/Data-Table_User/DataTableUser";

let current_page = window.location.pathname;
const AcbTab = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
      setToggleState(index);
  };
  return (
    <div className='acb_home'>
            <div className='acb_sidebar'>
                <div className="acb_top">
                    <span className="acb_logo"> <a href={current_page + '?page=admin_chat_box'} style={{textDecoration:"none"}}>DASHBOARD</a></span>
                </div>
                <hr />
                <div className="acb_center">
                  <ul>     
                      <p className="acb_title">
                      PREFERENCES
                      </p>
                      <a className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                          <li className={toggleState === 1 ? "active" : "tabs"}>
                          <LocalFireDepartmentIcon className='acb_icon'/>
                              <span >Firebase Authentication</span>
                          </li>
                      </a>
                      <a className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                          <li className={toggleState ===2 ? "active" : "tabs"}>
                            <SupportAgentIcon className='acb_icon'/>
                              <span >Users</span>
                          </li>
                      </a>                      
                      <a className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
                          <li className={toggleState ===3 ? "active" : "tabs"}>
                            <SettingsApplicationsIcon className='acb_icon'/>
                              <span >Setting</span>
                          </li>
                      </a>                      
                      
                  </ul>
            </div>
          </div>

          <div className="acb_homeContainer">
            <Navbar/>
              <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    {toggleState === 1 && <Firebase/> }
                   
                </div>
             
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    {toggleState === 2 &&  <DataTableUser/> }   
                   
                </div>
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    {toggleState === 3 &&  <Setting/> }   
                   
                </div>
                
              </div>
          </div>
      </div>
  )
}

export default AcbTab
