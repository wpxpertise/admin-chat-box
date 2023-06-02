import React, {useState, useEffect} from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import Modal from '../../Components/Modal/Modal'
import ReactPlayer from 'react-player'
import axios from "axios";
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./firebase.scss";

const Firebase = () => {
    /**
     * State
     */
    const [modalOpen, setModalOpen] = useState(false);
    const [userinfo, setUserinfo] = useState(null);
    const [err, setErr] = useState(false);
    const [apipassview1, setApipassview1] = useState(false);
    const [apipassview2, setApipassview2] = useState(false);
    const [apipassview3, setApipassview3] = useState(false);
    const [apipassview4, setApipassview4] = useState(false);
    const [apipassview5, setApipassview5] = useState(false);
    const [apipassview6, setApipassview6] = useState(false);
    const [passview, setPassview] = useState(false);
    const [credentials, setCredentials] = useState([]);

    const [testpassword, setTestpassword] = useState();
    const [testmail, setMail] = useState();
    /**
     * Get credentials
     */
    useEffect(() => {
      getUsers();
    }, []);

    function getUsers() {
        const firebaseConfig = {
          apiKey: "",
          authDomain: "",
          projectId: "",
          storageBucket: "",
          messagingSenderId: "",
          appId: ""
        };

        const formData = JSON.parse(localStorage.getItem("acbFireData") || JSON.stringify(firebaseConfig));
        setCredentials(formData);
    }

    // console.log(credentials);

    
    const [firebasecredentials, setFirebasecredentials] = useState({
      apiKey : credentials.apiKey,
      authDomain: credentials.authDomain,
      projectId : credentials.projectId,
      storageBucket : credentials.storageBucket,
      messagingSenderId : credentials.messagingSenderId,
      appId : credentials.appId,
    }); 

    const handleChange = e =>{
      setFirebasecredentials(prev=>({...prev, [e.target.name] : e.target.value})) 
    }

    /**
     * From localstorage firebase config data 
     */
    useEffect(() => {
      setFirebasecredentials({ 
        apiKey : credentials.apiKey,
        authDomain: credentials.authDomain,
        projectId : credentials.projectId,
        storageBucket : credentials.storageBucket,
        messagingSenderId : credentials.messagingSenderId,
        appId : credentials.appId,
       });
    }, [credentials]);

    /**
     * Style
     */
    const label = { inputProps: { 'aria-label': 'Size switch mailactive' } };

    /**
     * Eye for config
     */
    const handleViewapi = (fieldName) =>{
      switch (fieldName) {
        case "field1":
          setApipassview1(!apipassview1);
          break;
        case "field2":
          setApipassview2(!apipassview2);
          break;
        case "field3":
          setApipassview3(!apipassview3);
          break;  
        case "field4":
          setApipassview4(!apipassview4);
          break;  
        case "field5":
          setApipassview5(!apipassview5);
          break;  
        case "field6":
          setApipassview6(!apipassview6);
          break;   
        default:
          break;
      }

    }
    /**
     * Pass Eye
     */
    const handleViewpass = () =>{
      passview === true ? setPassview(false): setPassview(true)
    }

    /**
     * 
     * @param {save firebase credentials} Local Storage
     */
    const handleSave = async e => {
      e.preventDefault()
      localStorage.setItem("acbFireData", JSON.stringify(firebasecredentials));
      /* setFirebasecredentials({
        apiKey : "",
        authDomain: "",
        projectId : "",
        storageBucket : "",
        messagingSenderId : "",
        appId : "",
      });   */

      Swal.fire({
        toast: true,
        position: 'bottom-right',
        icon: 'success',
        title: "Firebase credentials configure successfully",
        showConfirmButton: false,
        timer: 1500
      })

    }

  /**
   * 
   * @param {Test Authentication} e 
   */
  const handleSubmit = async e => {
    e.preventDefault();
    const email = testmail;
    const password = testpassword;

    try{
        const FireInfo = await signInWithEmailAndPassword(auth, email, password);
        console.log(FireInfo);
        setUserinfo(FireInfo);
        signOut(auth);
      }
      catch(err){
        setErr(err.message);
        console.log(err)
      }
      setModalOpen(true)
  };

  /**
   * 
   * @param {Clear authentication cache} e 
   */
  const clear = async e => {
    window.location.reload();
  }

    
    
  return (
    <div className="acb_add_mail" id="acb_add_mail">
         { modalOpen && <Modal fdata={userinfo} err = {err} setOpenModal={setModalOpen}/>}
      <div className="acb_mails_container">
        {/* Start  */}
          <div className="acb_top">
              <h1 className="setting_panel">Authentication Panel -<a target="_blank" href="https://console.firebase.google.com/u/0/project/">FIREBASE</a></h1>
             
              <h1 className="tesing_panel">Test Authentication</h1>
          
          </div>
          <div className="acb_bottom" id='acb_bottom'>
              <div className="acb_left">
              <form action="" id="firebaseCredentials">
                        <div className="formInput">
                          <label htmlFor="apikey">*API Key</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field1")}>
                                  {apipassview1 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview1 === true ? "text" : "password"} placeholder="use apikey " name="apiKey" required onChange={handleChange} value={firebasecredentials.apiKey}/>
                            </div>
                        </div>
                        <div className="formInput">
                          <label htmlFor="authdomain">*Auth Domain</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field2")}>
                                  {apipassview2 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview2 === true ? "text" : "password"} placeholder="use auth domain " name="authDomain" required onChange={handleChange} value={firebasecredentials.authDomain}/>
                            </div>
                        </div>

                        <div className="formInput">
                          <label htmlFor="projectid">*Project Id</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field3")}>
                                  {apipassview3 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview3 === true ? "text" : "password"} placeholder="use project id " name="projectId" required onChange={handleChange} value={firebasecredentials.projectId}/>
                            </div>
                        </div>
                        <div className="formInput">
                          <label htmlFor="storagebucket">*Storage Bucket</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field4")}>
                                  {apipassview4 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview4 === true ? "text" : "password"} placeholder="use storage bucket " name="storageBucket" required onChange={handleChange} value={firebasecredentials.storageBucket}/>
                            </div>
                        </div>
                        <div className="formInput">
                          <label htmlFor="messagingsenderId">*Messaging SenderId</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field5")}>
                                  {apipassview5 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview5 === true ? "text" : "password"} placeholder="use messaging sender id " name="messagingSenderId"  required onChange={handleChange} value={firebasecredentials.messagingSenderId}/>
                            </div>
                        </div>
                        <div className="formInput">
                          <label htmlFor="appid">*APP ID</label>
                            <div className="acbapikey">
                                <div className="passimg" onClick={() => handleViewapi("field6")}>
                                  {apipassview6 === false ? <VisibilityOffIcon className='acbapikeypassVisibility'/> : <VisibilityIcon className='acbapikeypassVisibility'/>}
                                </div> 
                                <input type={apipassview6 === true ? "text" : "password"} placeholder="use app id " name="appId"  required onChange={handleChange} value={firebasecredentials.appId}/>
                            </div>
                        </div>
                      
                      <button className="acb_test_mail_send" onClick={handleSave}>SAVE</button>
                  </form>
              </div>
              <div className="acb_right">
                <form action="" className="acbform">
                  <div className="formInput">
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder="use your fireabse email" name="email" value={testmail} onChange={e =>setMail(e.target.value) } required />
                    </div>

                    <div className="formInput">
                      <label htmlFor="firebasepassword">Password</label>
                        <div className="wcsPass">
                            <div className="passimg" onClick={handleViewpass}>
                              {passview === false ? <VisibilityOffIcon className='passVisibility'/> : <VisibilityIcon className='passVisibility'/>}
                            </div> 
                            <input type={passview === true ? "text" : "password"} value={testpassword} onChange={e =>setTestpassword(e.target.value) } placeholder="firebase login password" name="firebasepassword" required/>
                        </div>
                    </div>

                  <button className="acb_test_mail_send" onClick={handleSubmit}>VERIFY</button>
                  <submit className="acb_test_mail_reset" onClick={clear}>CLEAR</submit>
                  </form>

                  {/* video  */}

                  <div className='wcs-player-wrapper'>
                    <ReactPlayer
                      className='wcs-react-player'
                      url='https://youtu.be/Btg75dp-TG4'
                      width='100%'
                      height='100%'
                    />
                </div>
                  
              </div>
          </div>
        {/* End  */}
      </div>
  </div>
  )
}

export default Firebase
