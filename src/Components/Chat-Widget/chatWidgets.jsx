import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person3Icon from '@mui/icons-material/Person3';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css'
import './chatwidgets.scss'


const chatWidgets = ( {type} ) => {
    
    /**
     * Switch 
     */
    let data;
    const percentage = 0;
    switch(type){
        case "total_staffs":
            data ={
                title: "Total User",
                // total: '3',
                total: "0",
                isPercantage:false,
                activeContent:false,
                content:"Editor are act as staff. So to give staff access please set capability to editor",
                link: "See all staff info",
                icon:(
                    <SupportAgentIcon className='wcs_staff_icon' style={{color:"black"}}/>
                )
            };
            break;
        case "total_users":
            data ={
                title: "Blocked User",
                total: "0",
                isPercantage:false,
                activeContent:false,
                content:"Your users are your subscribers. Anyone who creates an account is initially considered as a subscriber.",
                link: "See all users",
                icon:(
                    <Person3Icon className='wcs_users_icon' style={{color:"black"}}/>
                )
            };
            break;
        case "total_ticket_close":
            data ={
                title: "Active User",
                total: "0",
                isPercantage:true,
                activeContent:false,
                content:"Total Ticket close",
                link: "Visit ticket panel",
                icon:(
                    <BookmarkAddedIcon className='wcs_resolve_icon' style={{color:"#31522a"}}/>
                )
            };
            break;

        default:
            break;
    }
  return (
    <div className='wcs_widget wcs_widgets_free'>
            <h4 className='pro_badge'>UPCOMMING</h4>
            <div className="wcs_left wec_left_free">
                {data.activeContent ===true && 
                <Tippy content={data.content}>
                    <span className="wcs_title">{data.title}<HelpOutlineIcon className='wcs_tooltip_icon'/></span>
                </Tippy>}
                {data.activeContent ===false && 
                    <span className="wcs_title">{data.title}</span>
                }
                    <span className="wcs_counter">{data.total}</span>
                    <span className="wcs_link">{data.link}</span>
                </div>
            <div className="wcs_right wec_right_free">

            {data.isPercantage &&
            <div className="wcs_percentage wcs_positive">
                <KeyboardArrowUpIcon/>
              {percentage}{data.isPercantage && "%"}
            </div>
            }
            <div className="wcs_percentage wcs_positive"></div> 

           {data.icon}
        </div>
    </div>
  )
}

export default chatWidgets