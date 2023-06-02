import  MoreVertTwoTone  from '@mui/icons-material/MoreVert'
//Progreebar below
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './featured.scss'

const chatFeatured = () => {
    

  return (
    <div className='wcs_featured wcs_featured_free'>
        <h4 className='pro_badge'>UPCOMMING</h4>
        <div className="wcs_featured wec_left_featured">
            <div className="wcs_top">
                <h1 className="wcs_title">Today's Response statistics</h1>
                <MoreVertTwoTone fontSize='small'/>
            </div>
            <div className="wcs_bottom">
                <div className="wcs_featuredChart">
                <CircularProgressbar value={0} text={`${0}%`} strokeWidth={5} />
                </div>
                <p className="wcs_title">Total Response</p>
                <p className="wcs_amount">100</p>
                <div className="wcs_summary">
                    
                    <div className="wcs_item">
                        <div className="itemTitle">Pending</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                            <div className="resultAmount">2 Pending</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">New register</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                            <div className="resultAmount">10 User</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">Visit Count</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize='small'/>
                            <div className="resultAmount">100 Person</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default chatFeatured