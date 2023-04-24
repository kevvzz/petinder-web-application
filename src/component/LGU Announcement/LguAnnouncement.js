import React from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import lguLogo from '../../Assets/lgu-cebu-logo.png';
//CSS
import './LguAnnouncement.css';
import '../../App.css';
function LguAnnouncement() {
  return (
    <div className='main-bg'>
        <LguNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Announcement
                </h1>

                <div className="announcement-button">
                        <button type="button">Create</button>
                </div>
            </header>
            <div className="container">
                <div className="announcement-wrapper">
                    <div className="announcement-header">
                        <h2>Announcement</h2>
                        <div className="line"></div>
                    </div>
                    <div className="announcement-col">
                        <div className="customer">
                            <div className="customer-table">
                                <img src={lguLogo} className='lguLogo' alt=""/>
                                <div className="customer-info">
                                    <h5>LGU-DVMF TALISAY</h5>
                                    <p>Free Vaccine in Mountain Barangays</p>
                                    <p>February 10, 2023</p>
                                </div>
                            </div>
                        </div>
				    </div>
                </div>
            </div>	
        </div>
    </div>	
  )
}

export default LguAnnouncement