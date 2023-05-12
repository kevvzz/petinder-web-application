import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup, Button, Figure } from 'react-bootstrap'
import {LguNavbar} from '../Navbar/Navbar';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { ToastContainer, toast } from 'react-toastify';
//CSS
import '../../ManageSettings.css';
import '../../App.css';
import { useNavigate,useLocation} from 'react-router-dom';
function LguManageSettings() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    console.log(userData);
    const [settings, setSettings] = useState({
        contact: '',
        email: '',
        old: '',
        new:'',
        confirm:''
    });
    const [newSettings, setNewSettings] = useState({
        contact: '',
        email: '',
        old: '',
        new:'',
        confirm:''
    });

    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);

    const contactTarget = useRef(null);
    const [contactShowTooltip, setContactShowTooltip] = useState(false);
    const emailTarget = useRef(null);
    const [emailShowTooltip, setEmailShowTooltip] = useState(false);

    const oldTarget = useRef(null);
    const [oldShowTooltip, setOldShowTooltip] = useState(false);
    const newTarget = useRef(null);
    const [newShowTooltip, setNewShowTooltip] = useState(false);
    const confirmTarget = useRef(null);
    const [confirmShowTooltip, setConfirmShowTooltip] = useState(false);
    
    useEffect(() => {
        const docRef = db.collection("LGU_Profile").doc(userData.LGU_UserName);
        docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const set = doc.data()
              const {
                LGU_Email,
                LGU_Password,
                LGU_ContactNumber,} = set;
    
              setNewSettings({ 
                email: LGU_Email,
                old: LGU_Password,
                contact: LGU_ContactNumber
              });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }, []);
    
    const handleEdits = (event) => {
        const { name, value } = event.target;
        setSettings({ ...settings, [name]: value });
      };

    function handleButtonClick1() {
        setShowDiv1(true);
        setShowDiv2(false);
      }
    
      function handleButtonClick2() {
        setShowDiv1(false);
        setShowDiv2(true);
    }
    const handleSaveChanges = () => {
        if (settings.contact === "") {
          setContactShowTooltip(true);
        } else {
          setContactShowTooltip(false);
        }
        if (settings.email === "") {
          setEmailShowTooltip(true);
        } else {
          setEmailShowTooltip(false);
        }
    
    
        if ((settings.email !== "" && settings.email !== null) &&
          (settings.contact !== "" && settings.contact !== null)){
       
        //   Save the pet data to Firestore
          db.collection("LGU_Profile")
            .doc(userData.LGU_UserName)
            .update({
              LGU_ContactNumber: settings.contact,
              LGU_Email: settings.email,
            })
            .then(() => {
                toast.success("Settings LGU Profile Updated Successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                
              console.log("success");
            })
            .catch((error) => {
              toast.error("Error adding Lgu to Firestore: ");
              console.log(error)
            });
        }
      }
    //   console.log(settings)
      const handlePasswordChanges = () => {
        if (settings.old === "") {
          setOldShowTooltip(true);
        } else {
          setOldShowTooltip(false);
        }
        if (settings.new === "") {
          setNewShowTooltip(true);
        } else {
          setNewShowTooltip(false);
        }
        if (settings.confirm === "") {
            setConfirmShowTooltip(true);
          } else {
            setConfirmShowTooltip(false);
          }
    
          
        if ((settings.old !== "" && settings.old !== null) &&
            (settings.confirm !== "" && settings.confirm !== null) &&
            (settings.new !== "" && settings.new !== null)){

            if(newSettings.old.toString() === settings.old){
                if(settings.new === settings.confirm){
                     //   Save the pet data to Firestore
                     db.collection("LGU_Profile")
                     .doc(userData.LGU_UserName)
                     .update({
                         LGU_Password: settings.new,
                     })
                     .then(() => {
                         toast.success("Password Updated Successfully!");
                         setTimeout(() => {
                             window.location.reload();
                         }, 2000);
                         
                     })
                     .catch((error) => {
                         toast.error("Error adding Lgu to Firestore: ");
                     });
                }else{
                    toast.error("New and Confirm Password Does Not Match!!");
                }
            } else {
                toast.error("Current Password Does Not Match!!");
            }
            
            
        }
      }
  return (
    
    <div className='main-bg'>
        <LguNavbar/>
        <ToastContainer/>
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
                        <Row>
                            <Form.Label className='h6'>Contact Number<span className='red' ref={contactTarget}> *</span></Form.Label>
                            <Form.Control value={userData.LGU_ContactNumber} type="text" maxLength={11} max={99999999999} min={1000000000} name='contact' id='contact' className='mb-2' onChange={handleEdits}/>
                            <Overlay target={contactTarget.current} show={contactShowTooltip} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                    Empty Contact
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Row>
                        <Row>
                            <Form.Label className='h6'>Email<span className='red' ref={emailTarget}> *</span></Form.Label>
                            <Form.Control type="email" name='email' id='email' className='mb-2' value={userData.LGU_Email} onChange={handleEdits}/>
                            <Overlay target={emailTarget.current} show={emailShowTooltip} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                    Empty Email
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Row>
                        
                        <div className='d-flex button-wrapper center'>
                            <Button onClick={handleSaveChanges}>
                            Save Changes
                            </Button>
                        </div>
                    </div>	
                

                    <div style={{ display: showDiv2 ? 'block' : 'none' }} class="col-settings change">
                        <Row>
                            <Form.Label className='h6'>Current Password<span className='red' ref={oldTarget}> *</span></Form.Label>
                            <Form.Control type="password" name='old' id='old' className='mb-2' onChange={handleEdits}/>
                            <Overlay target={oldTarget.current} show={oldShowTooltip} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                    Empty Current Password
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Row>
                        <Row>
                            <Form.Label className='h6'>New Password<span className='red' ref={newTarget}> *</span></Form.Label>
                            <Form.Control type="password" name='new' id='new' className='mb-2' onChange={handleEdits}/>
                            <Overlay target={newTarget.current} show={newShowTooltip} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                    Empty New Password
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Row>
                        <Row>
                            <Form.Label className='h6'>Confirm Password<span className='red' ref={confirmTarget}> *</span></Form.Label>
                            <Form.Control type="password" name='confirm' id='confirm' className='mb-2' onChange={handleEdits}/>
                            <Overlay target={confirmTarget.current} show={confirmShowTooltip} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                    Empty Confirm Password
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Row>

                        <div className='d-flex button-wrapper center'>
                            <Button onClick={handlePasswordChanges}>
                            Save Changes
                            </Button>
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