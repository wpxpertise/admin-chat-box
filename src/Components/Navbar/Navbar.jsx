import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className='acb_navbar'>
            <div className="acb_wrapper">
               <div className="acb_search">
                  <input type="text" placeholder='search...' />
                  <PersonSearchIcon className='acb_icon'/>
               </div>
               <div className="acb_items">
                  <div className="acb_item">
                      <NotificationsIcon className='acb_icon'/>
                      <div className="acb_counter">1</div>
                  </div>
                  <div className="acb_item">
                      <ChatIcon className='acb_icon'/>
                      <div className="acb_counter">2</div>
                  </div>
                  <div className="acb_item">
                      <LowPriorityIcon className='acb_icon'/>
                  </div>
               </div>
            </div>
      </div>
  )
}

export default Navbar