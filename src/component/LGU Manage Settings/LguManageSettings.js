import React, { useState } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.css';

//CSS
import '../../ManageSettings.css';
import '../../App.css';
function LguManageSettings() {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);

    function handleButtonClick1() {
        setShowDiv1(true);
        setShowDiv2(false);
      }
    
      function handleButtonClick2() {
        setShowDiv1(false);
        setShowDiv2(true);
      }
  return (
    
    <div className='main-bg'>
        <LguNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Manage Settings
                </h1>
            </header>
            <div class="container-settings">
            
			<div class="row-container">
                <Row>
                    <Col onClick={handleButtonClick1} style={{ background: showDiv1 ? '#ff8333' : 'white' }} className="col-settings header-update">
                        <Row><h3>Update Profile</h3></Row>
                    </Col>
                    <Col onClick={handleButtonClick2} style={{ background: showDiv2 ? '#ff8333' : 'white' }} className="col-settings header-change">
                        <Row><h3>Change Password</h3></Row>
                    </Col>
                </Row>
                
                <div  class="row-settings body">
                    <div style={{ display: showDiv1 ? 'block' : 'none' }} class="col-settings update" id="updateDiv">
                        <div class="col-settings-add">
                            <label for="email"><b>First Name</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Firstname" name="firstname" id="firstname" required/>
                        </div>
                        <div class="col-settings-add">
                            <label for="email"><b>Last Name</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Lastname" name="lastname" id="lastname" required/>
                        </div>
                        <div class="col-settings-add">
                            <label for="email"><b>Email</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Email" name="email" id="email" required/>
                        </div><div class="col-settings-add">
                            <label for="email"><b>Contact Number</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Contact Number" name="contact" id="contact" required/>
                        </div>

                        <div className='btn-wrapper'>
                            <button className='settingsBtn'>Submit</button>
                        </div>	
                    </div>

                    <div style={{ display: showDiv2 ? 'block' : 'none' }} class="col-settings change">
                        <div class="col-settings-add">
                            <label for="email"><b>Current Password</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Username" name="current" id="current" required/>
                        </div>
                        <div class="col-settings-add">
                            <label for="email"><b>New Password</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Password" name="new" id="new" required/>
                        </div><div class="col-settings-add">
                            <label for="email"><b>Confirm New Password</b></label>
                        </div>
                        <div class="col-settings-add">
                            <input type="text" placeholder="Enter Confirm Password" name="confirmNew" id="confirmNew" required/>
                        </div>

                        <div className='btn-wrapper'>
                            <button className='settingsBtn'>Submit</button>
                        </div>	
                    </div>
                    

                </div>
                
            </div>
		</div>
        </div>
    </div>	
  )
}

export default LguManageSettings