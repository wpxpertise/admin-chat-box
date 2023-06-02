import React from 'react'
import Countdown from 'react-countdown';
import './modal.scss'

const Modal = ({ setOpenModal, fdata, err }) => {
  console.log(fdata)

  return (
    <div className="wcsmodalBackground">
   {/* <div class="wcs_popup_overlay"></div> */}
      <div className="wcsmodalContainer">
        <div className="wcstitleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="wcsmodaltitle">
          {err && <h1 className='wcs_offer_percentage'><span className='wcs_count' style={{color: "red"}}>FAILED</span> <span className='wcs_count_text'></span></h1>}
          {err && <h1 style={{color: "red"}}>{err}</h1>}
          {!err &&<h1 className='wcs_offer_percentage'><span className='wcs_count'>SUCCESS</span> <span className='wcs_count_text'></span></h1>}
          {!err && <h3><span>User name:</span> {fdata.user.displayName}</h3> }
          {!err && <h3>Email: {fdata.user.email}</h3> }
          {!err && <h3>Mobile: {fdata.user.phoneNumber ? fdata.user.phoneNumber : "Not Found" }</h3> }
          {!err && <h3>User ID: {fdata.user.uid}</h3> }
        </div>
        <div className="wcsmodalbody">
        {err &&<p>Not registered. To makesure clear the page</p>}
        </div>
        <div className="wcsmodalfooter">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal