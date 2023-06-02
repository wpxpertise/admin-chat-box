import React, {useState, useEffect} from "react"
import ChatWidgets from "../../Components/Chat-Widget/chatWidgets"
import ChatFeatured from "../../Components/Featured-chart/chatFeatured"
import ChatCharts from "../../Components/Chart/chatCharts"
import Switch from '@mui/material/Switch';
import "./setting.scss";

const Setting = () => {
    
  return (
    <div className="acb_add_mail" id="acb_add_mail">
      <div className="acb_mails_container">
        {/* Start  */}
          <div className="acb_top">
              <h1 className="setting_panel">Dashboard Panel -<a target="_blank" href="https://console.firebase.google.com/u/0/project/">FIREBASE</a></h1>
             
              <h1 className="tesing_panel">Others</h1>
          
          </div>

          <div className="acb_bottom" id='acb_bottom'>
            <label className="setting_panel" htmlFor="mailactive">Enable Frontend Chat System: {<Switch className="mailactive"  checked="false"  color="secondary" />} </label>
          </div>

          <div className="acb_bottom" id='acb_bottom'>
              <ChatWidgets type="total_staffs" /> 
              <ChatWidgets type="total_staffs" /> 
              <ChatWidgets type="total_staffs" /> 
          </div>
          <div className="acb_bottom" id='acb_bottom'>
              <div className="acb_left">
              <ChatFeatured/>
              </div>
              <div className="acb_right">
              <ChatCharts/>
              </div>
          </div>
        {/* End  */}
      </div>
  </div>
  )
}

export default Setting
