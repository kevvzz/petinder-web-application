import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import logoName from '../../Assets/petinder_logo.png';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faPaw, faBullhorn, faSliders } from '@fortawesome/free-solid-svg-icons';
export function AdminNavbar() {
    const [showManageAdmin, setShowManageAdmin] = useState(false);
    const [showAdminSettings, setShowAdminSettings] = useState(false);
    return (
        <div className='nav'>
        <div className = "logo-wrapper">
            <img src = {logoName} className="logo" alt = 'Logo' />
        </div>
        <NavLink style={{transition: "all .3s"}} to = "/admin-dashboard" className={({isActive}) => (isActive ? "navText navText-selected": "navText")}>
            <div>
                <span style={{fontSize:"20px"}}><FontAwesomeIcon icon={faPaw}/>Dashboard</span>
            </div>
        </NavLink>
        <div className='navText' onClick={(e) => setShowManageAdmin(!showManageAdmin)}>
            
            <span style={{fontSize:"18px"}}><FontAwesomeIcon icon={faUser}/>MANAGE ACCOUNT<FontAwesomeIcon icon={faCaretDown}/></span>
           
            {/* {!showManageAccount ? 
                <ExpandMoreIcon fontSize='medium' className='caret'/> :
                <ExpandLessIcon fontSize='medium' className='caret'/>
            } */}
        </div>

        {showManageAdmin &&
            <div>
                <NavLink style={{transition: "all .3s"}} to = "/admin-register" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Registered Pets</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/admin-owner" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Pet Owner</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/admin-seller" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Pet Seller</span>
                    </p>
                </NavLink>
               
                <NavLink style={{transition: "all .3s"}} to = "/admin-list" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Admin Side</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/admin-lgu-list" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>LGU</span>
                    </p>
                </NavLink>
            </div>    
        }
        
        <div className='navText' onClick={(e) => setShowAdminSettings(!showAdminSettings)}>
            <span style={{fontSize:"20px"}}><FontAwesomeIcon icon={faSliders}/>SETTINGS<FontAwesomeIcon icon={faCaretDown}/></span>
        </div>

        {showAdminSettings &&
            <div>
                <NavLink style={{transition: "all .3s"}} to = "/admin-settings" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Manage Settings</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Logout</span>
                    </p>
                </NavLink>
            </div>    
        }

    </div>
    );
};

export function LguNavbar() {
    const [showManageAccount, setShowManageAccount] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
  return (
    <div className='nav'>
        <div className = "logo-wrapper">
            <img src = {logoName} className="logo" alt = 'Logo' />
        </div>
        <div className='navText' onClick={(e) => setShowManageAccount(!showManageAccount)}>
            
            <span style={{fontSize:"18px"}}><FontAwesomeIcon icon={faUser}/>MANAGE ACCOUNT<FontAwesomeIcon icon={faCaretDown}/></span>
           
            {/* {!showManageAccount ? 
                <ExpandMoreIcon fontSize='medium' className='caret'/> :
                <ExpandLessIcon fontSize='medium' className='caret'/>
            } */}
        </div>

        {showManageAccount &&
            <div>
                    <NavLink style={{transition: "all .3s"}} to = "/lgu-register" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span> Registered Pets</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/lgu-owner" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span> Pet Owner</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/lgu-seller" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span> Pet Seller</span>
                    </p>
                </NavLink>
            </div>    
        }
        <NavLink style={{transition: "all .3s"}} to = "/lgu-lost" className={({isActive}) => (isActive ? "navText navText-selected": "navText")}>
            <div>
                <span style={{fontSize:"20px"}}><FontAwesomeIcon icon={faPaw}/>LOST PET</span>
            </div>
        </NavLink>
        <NavLink style={{transition: "all .3s"}} to = "/lgu-announcement" className={({isActive}) => (isActive ? "navText navText-selected": "navText")}>
            <div>
                <span style={{fontSize:"20px"}}><FontAwesomeIcon icon={faBullhorn}/>ANNOUNCEMENT</span>
            </div>
        </NavLink>
        <div className='navText' onClick={(e) => setShowSettings(!showSettings)}>
            <span style={{fontSize:"20px"}}><FontAwesomeIcon icon={faSliders}/>SETTINGS<FontAwesomeIcon icon={faCaretDown}/></span>
        </div>

        {showSettings &&
            <div>
                <NavLink style={{transition: "all .3s"}} to = "/lgu-settings" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Manage Settings</span>
                    </p>
                </NavLink>
                <NavLink style={{transition: "all .3s"}} to = "/" className={({isActive}) => (isActive ? "dropdown dropdown-selected": "dropdown")}>
                    <p>
                        <span>Logout</span>
                    </p>
                </NavLink>
            </div>    
        }

    </div>
  );
};


