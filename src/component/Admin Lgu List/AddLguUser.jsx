import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup, Button, Figure } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { ToastContainer,toast } from 'react-toastify';


export default function AddLguUser(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState('');

  const handClose = () => {
    props.hidemodal(false);
    setImageUpload('');
  }

  const userTarget = useRef(null);
  const [userShowTooltip, setUserShowTooltip] = useState(false);
  const branchNameTarget = useRef(null);
  const [branchNameShowTooltip, setBranchNameShowTooltip] = useState(false);
  const addressTarget = useRef(null);
  const [addressShowTooltip, setAddressShowTooltip] = useState(false);
  const contactTarget = useRef(null);
  const [contactShowTooltip, setContactShowTooltip] = useState(false);
  const profileTarget = useRef(null);
  const [profileShowTooltip, setProfileShowTooltip] = useState(false);
  const emailTarget = useRef(null);
  const [emailShowTooltip, setEmailShowTooltip] = useState(false);

  const currentDate = new Date();
  const timestamp = firebase.firestore.Timestamp.fromDate(currentDate);
  const password = "123456";

  const [lguAddProfile, setLguAddProfile] = useState({
    user: '',
    branch: '',
    address:'',
    contact: '',
    dateRegister: '',
    email: ''
  });

  const emailAuth = lguAddProfile.user + "@petinder.com";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLguAddProfile({ ...lguAddProfile, [name]: value });
  };

 
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const base64 = await convertBase64(file);
    setImageUpload(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSaveChanges = () => {
    if (lguAddProfile.user === "") {
      setUserShowTooltip(true);
    } else {
      setUserShowTooltip(false);
    }
    if (lguAddProfile.branch === "") {
      setBranchNameShowTooltip(true);
    } else {
      setBranchNameShowTooltip(false);
    }

    if (lguAddProfile.address === "") {
      setAddressShowTooltip(true);
    } else {
      setAddressShowTooltip(false);
    }

    if (lguAddProfile.contact === "") {
      setContactShowTooltip(true);
    } else {
      setContactShowTooltip(false);
    }

    if (lguAddProfile.email === "") {
      setEmailShowTooltip(true);
    } else {
      setEmailShowTooltip(false);
    }


    if ((lguAddProfile.email !== "" && lguAddProfile.email !== null) &&
      (lguAddProfile.user !== "" && lguAddProfile.user !== null) &&
      (lguAddProfile.branch !== "" && lguAddProfile.branch !== null) &&
      (lguAddProfile.address !== "" && lguAddProfile.address !== null) &&
      (lguAddProfile.contact !== "" && lguAddProfile.contact !== null)){


        firebase.auth().createUserWithEmailAndPassword(emailAuth, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);

          // Save the pet data to Firestore
          db.collection("LGU_Profile")
          .doc(lguAddProfile.user.toString())
          .set({
            LGU_UserName: lguAddProfile.user,
            LGU_BranchName: lguAddProfile.branch,
            LGU_Address: lguAddProfile.address,
            LGU_ContactNumber: lguAddProfile.contact,
            LGU_DateRegistered: timestamp,
            LGU_Email: lguAddProfile.email,
          })
          .then(() => {
            toast.success("LGU Added Successfully!");
            props.hidemodal();
            console.log("success");
          })
          .catch((error) => {
            toast.error("Error adding pet to Firestore: ");
            console.log(error)
          });


          const storageRef = storage.ref();
          const fileRef = storageRef.child(`LGU_DVMF/${lguAddProfile.user.toString()}`);
          fileRef.put(selectedFile).then(() => {
            console.log('File uploaded successfully');
            setTimeout(() => {
              window.location.reload();
            }, 2000); 
          });
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  }

  return (
    <>
      <ToastContainer/>
      <Modal
        show={props.showmodal}
        onHide={handClose}
        centered
        size='lg'
        backdrop="static"
      >
        <Modal.Header
          className='headerBG'
          closeButton
        >
          <Modal.Title>ADD LGU USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <Row>
                <Form.Label
                  className='h6'
                >UserName<span className='red' ref={userTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='user'
                  id='user'
                  className='mb-2'
                value={lguAddProfile.user}
                onChange={handleInputChange}
                />
                <Overlay
                target={userTarget.current}
                show={userShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty User
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  ref={emailTarget}
                  className='h6'
                >Email<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="email"
                  name='email'
                  id='email'
                  className='mb-2'
                value={lguAddProfile.email}
                onChange={handleInputChange}
                />
                <Overlay
                target={emailTarget.current}
                show={emailShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Email
                    </Tooltip>
                  )}
                </Overlay>
              </Row>

              <Row>
                <Form.Label
                  ref={branchNameTarget}
                  className='h6'
                >Branch Name<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='branch'
                  id='branch'
                  className='mb-2'
                value={lguAddProfile.branch}
                onChange={handleInputChange}
                />
                <Overlay
                target={branchNameTarget.current}
                show={branchNameShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Branch Name
                    </Tooltip>
                  )}
                </Overlay>

              </Row>

              <Row>
                <Form.Label
                  ref={addressTarget}
                  className='h6'
                >Address<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='address'
                  id='address'
                  className='mb-2'
                  value={lguAddProfile.address}
                onChange={handleInputChange}
                />
                <Overlay
                target={addressTarget.current}
                show={addressShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Address
                    </Tooltip>
                  )}
                </Overlay>
              </Row>

              <Row>
                <Form.Label
                  ref={contactTarget}
                  className='h6'
                >Contact Number<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='contact'
                  id='contact'
                  maxLength={11}
                  max={99999999999}
                  min={1000000000}
                  className='mb-2'
                  value={lguAddProfile.contact}
                  onChange={handleInputChange}
                />
                <Overlay
                target={contactTarget.current}
                show={contactShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Contact Number
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <Form.Label
                    ref={profileTarget}
                    className='h6'
                  >Upload Profile Picture<span className='red'> *</span></Form.Label>
                  <Form.Control
                    type="file"
                    name='profilePicture'
                    id='profilePicture'
                    className='mb-2'
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                  <Overlay
                  target={profileTarget.current}
                  show={profileShowTooltip}
                  placement="right"
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Empty Profile Picture
                      </Tooltip>
                    )}
                  </Overlay>
                </Col>
              </Row>
              {imageUpload !== '' && (
                <>
                  <Row>
                    <Col>
                      <Figure>
                        <Figure.Image
                          width={200}
                          height={200}
                          src={imageUpload}
                        />
                      </Figure>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex button-wrapper'>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </Modal.Footer>

      </Modal>
    </>
  )
}
