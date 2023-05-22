import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup, Button, Figure } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { ToastContainer,toast } from 'react-toastify';

function AddAdminSeller(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState('');

  const handClose = () => {
    props.hidemodal(false);
    setImageUpload('');
  }

  const emailTarget = useRef(null);
  const [emailShowTooltip, setEmailShowTooltip] = useState(false);
  const lastNameTarget = useRef(null);
  const [lastNameShowTooltip, setLastNameShowTooltip] = useState(false);
  const firstNameTarget = useRef(null);
  const [firstNameShowTooltip, setFirstNameShowTooltip] = useState(false);
  const middleNameTarget = useRef(null);
  const [middleNameShowTooltip, setMiddleNameShowTooltip] = useState(false);
  const addressTarget = useRef(null);
  const [addressShowTooltip, setAddressShowTooltip] = useState(false);
  const ageTarget = useRef(null);
  const [ageShowTooltip, setAgeShowTooltip] = useState(false);
  const birthdateTarget = useRef(null);
  const [birthdateShowTooltip, setBirthdateShowTooltip] = useState(false);
  const contactTarget = useRef(null);
  const [contactShowTooltip, setContactShowTooltip] = useState(false);
  const genderTarget = useRef(null);
  const [genderShowTooltip, setGenderShowTooltip] = useState(false);
  const locationTarget = useRef(null);
  const [locationShowTooltip, setLocationShowTooltip] = useState(false);
  const profileTarget = useRef(null);
  const [profileShowTooltip, setProfileShowTooltip] = useState(false);

  const currentDate = new Date();
  const timestamp = firebase.firestore.Timestamp.fromDate(currentDate);

  const [sellerAddProfile, setAddSellerProfile] = useState({
    email: '', 
    lastName: '',
    firstName: '',
    middleName: '', 
    address: '', 
    age: '', 
    birthdate: '', 
    contact: '', 
    gender: '', 
    location: '' 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddSellerProfile({ ...sellerAddProfile, [name]: value });
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
    if (sellerAddProfile.email === "") {
      setEmailShowTooltip(true);
    } else {
      setEmailShowTooltip(false);
    }
    if (sellerAddProfile.lastName === "") {
      setLastNameShowTooltip(true);
    } else {
      setLastNameShowTooltip(false);
    }

    if (sellerAddProfile.firstName === "") {
      setFirstNameShowTooltip(true);
    } else {
      setFirstNameShowTooltip(false);
    }

    if (sellerAddProfile.middleName === "") {
      setMiddleNameShowTooltip(true);
    } else {
      setMiddleNameShowTooltip(false);
    }

    if (sellerAddProfile.address === "") {
      setAddressShowTooltip(true);
    } else {
      setAddressShowTooltip(false);
    }

    if (sellerAddProfile.age === "") {
      setAgeShowTooltip(true);
    } else {
      setAgeShowTooltip(false);
    }

    if (sellerAddProfile.birthdate === "") {
      setBirthdateShowTooltip(true);
    } else {
      setBirthdateShowTooltip(false);
    }

    if (sellerAddProfile.contact === "") {
      setContactShowTooltip(true);
    } else {
      setContactShowTooltip(false);
    }

    if (sellerAddProfile.gender === "") {
      setGenderShowTooltip(true);
    } else {
      setGenderShowTooltip(false);
    }

    if (sellerAddProfile.location === "") {
      setLocationShowTooltip(true);
    } else {
      setLocationShowTooltip(false);
    }


    if ((sellerAddProfile.email !== "" && sellerAddProfile.email !== null) &&
      (sellerAddProfile.lastName !== "" && sellerAddProfile.lastName !== null) &&
      (sellerAddProfile.firstName !== "" && sellerAddProfile.firstName !== null) &&
      (sellerAddProfile.middleName !== "" && sellerAddProfile.middleName !== null) &&
      (sellerAddProfile.address !== "" && sellerAddProfile.address !== null) &&
      (sellerAddProfile.age !== "" && sellerAddProfile.age !== null) &&
      (sellerAddProfile.birthdate !== "" && sellerAddProfile.birthdate !== null) &&
      (sellerAddProfile.contact !== "" && sellerAddProfile.contact !== null) &&
      (sellerAddProfile.gender !== "" && sellerAddProfile.gender !== null) &&
      (sellerAddProfile.location !== "" && sellerAddProfile.location !== null) &&
      (imageUpload !== null && imageUpload !== "")){
      
      const birthdate = sellerAddProfile.birthdate; 
      const birthTimestamp = firebase.firestore.Timestamp.fromDate(new Date(birthdate)); 

      // Save the pet data to Firestore
      db.collection("PetSellerorAdoption_Profile")
        .doc(sellerAddProfile.email.toString())
        .set({
          PSA_Address: sellerAddProfile.address,
          PSA_Age: sellerAddProfile.age,
          PSA_BirthDate: birthTimestamp,
          PSA_ContactNumber: sellerAddProfile.contact,
          PSA_DateRegistered: timestamp,
          PSA_FirstName: sellerAddProfile.firstName,
          PSA_Gender: sellerAddProfile.gender,
          PSA_LastName: sellerAddProfile.lastName,
          PSA_MiddleName: sellerAddProfile.middleName,
          PSA_NearbyDVMFLoc: sellerAddProfile.location,
          PSA_UserEmail: sellerAddProfile.email
        })
        .then(() => {
          toast.success("Seller Profile Added Successfully!");
          props.hidemodal1();
          console.log("success");
        })
        .catch((error) => {
          toast.error("Error adding seller to Firestore: ");
          console.log(error)
        });
        const storageRef = storage.ref();
      const fileRef = storageRef.child(`PetSellerOrAdoption/${sellerAddProfile.email.toString()}`);
      fileRef.put(selectedFile).then(() => {
        console.log('File uploaded successfully');
        setTimeout(() => {
          window.location.reload(); 
        }, 1000); 
      });
    }


  };
  return (
    <>
    <ToastContainer/>
      <Modal
        show={props.showmodal}
        onHide={handClose}
        centered
        size='lg'
      >
        <Modal.Header
          className='headerBG'
          closeButton
        >
          <Modal.Title>ADD PET SELLER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <Row>
                <Form.Label
                  className='h6'
                >Email<span className='red' ref={emailTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='email'
                  id='email'
                  className='mb-2'
                value={sellerAddProfile.email}
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
                  className='h6'
                >Last Name<span className='red' ref={lastNameTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='lastName'
                  id='lastName'
                  className='mb-2'
                value={sellerAddProfile.lastName}
                onChange={handleInputChange}
                />
                <Overlay
                target={lastNameTarget.current}
                show={lastNameShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Last Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>

              <Row>
                <Form.Label
                  className='h6'
                >Middle Name<span className='red' ref={middleNameTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='middleName'
                  id='middleName'
                  className='mb-2'
                value={sellerAddProfile.middleName}
                onChange={handleInputChange}
                />
                <Overlay
                target={middleNameTarget.current}
                show={middleNameShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Middle Name
                    </Tooltip>
                  )}
                </Overlay>

              </Row>

              <Row>
                <Form.Label
                  className='h6'
                >Address<span className='red' ref={addressTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='address'
                  id='address'
                  className='mb-2'
                value={sellerAddProfile.address}
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
                  className='h6'
                >Age<span className='red' ref={ageTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='age'
                  id='age'
                  className='mb-2'
                value={sellerAddProfile.age}
                onChange={handleInputChange}
                />
                <Overlay
                target={ageTarget.current}
                show={ageShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Age
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  className='h6'
                >Gender<span className='red' ref={genderTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='gender'
                  id='gender'
                  className='mb-2'
                value={sellerAddProfile.gender}
                onChange={handleInputChange}
                />
                <Overlay
                target={genderTarget.current}
                show={genderShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Gender
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
            </Col>
            <Col xs={1}></Col>        
            <Col>
              <Row>
                <Form.Label
                  className='h6'
                >First Name<span className='red' ref={firstNameTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  id='firstName'
                  className='mb-2'
                value={sellerAddProfile.firstName}
                onChange={handleInputChange}
                />
                <Overlay
                target={firstNameTarget.current}
                show={firstNameShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty First Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  className='h6'
                >Birthdate<span className='red' ref={birthdateTarget}> *</span></Form.Label>
                <Form.Control
                  type="date"
                  name='birthdate'
                  id='birthdate'
                  className='mb-2'
                value={sellerAddProfile.birthdate}
                onChange={handleInputChange}
                />
                <Overlay
                target={birthdateTarget.current}
                show={birthdateShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Birthdate
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  className='h6'
                >Contact Number<span className='red' ref={contactTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='contact'
                  id='contact'
                  className='mb-2'
                value={sellerAddProfile.contact}
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
              <Row>
                <Form.Label
                  className='h6'
                >Nearest DVMF Location<span className='red' ref={locationTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='location'
                  id='location'
                  className='mb-2'
                value={sellerAddProfile.location}
                onChange={handleInputChange}
                />
                <Overlay
                target={locationTarget.current}
                show={locationShowTooltip}
                placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty DVMF Location
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  className='h6'
                >Upload Profile Picture<span className='red' ref={profileTarget}> *</span></Form.Label>
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
              </Row>
              {imageUpload !== '' && (
                <>
                  <Row>
                    <Col>
                      <Figure className='borderLine center'>
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

export default AddAdminSeller