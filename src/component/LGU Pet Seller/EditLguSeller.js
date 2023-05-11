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

import { ToastContainer, toast } from 'react-toastify';

function EditLguSeller(props) {
  const sellerProfile = props.sellerProfile
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
  const dateRegisterTarget = useRef(null);
  const [dateRegisterShowTooltip, setDateRegisterShowTooltip] = useState(false);
  const genderTarget = useRef(null);
  const [genderShowTooltip, setGenderShowTooltip] = useState(false);
  const locationTarget = useRef(null);
  const [locationShowTooltip, setLocationShowTooltip] = useState(false);
  const profileTarget = useRef(null);
  const [profileShowTooltip, setProfileShowTooltip] = useState(false);

  function handleEdits(e) {
    let seller = { ...sellerProfile };
    const regex = /^\d{4}-\d{2}-\d{2}$/; // regular expression to match the format yyyy-mm-dd
    let value = e.target.value

    if (regex.test(value)) {
      value = firebase.firestore.Timestamp.fromDate(new Date(value));
    }

    seller[e.target.id] = value;
    props.setSellerProfile(seller);
  }
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

  let sellerDate = sellerProfile.birthdate;

  const regex = /^\d{4}-\d{2}-\d{2}$/; // regular expression to match the format yyyy-mm-dd
  if (regex.test(sellerDate)) {
    sellerDate = firebase.firestore.Timestamp.fromDate(new Date(sellerProfile.birthdate));
    console.log("qweqweqwe" + sellerDate);
    // additional logic here
  }
  console.log("qweqweqwe" + sellerDate);

  const birth = new Date(sellerProfile.birthdate.seconds * 1000 + sellerProfile.birthdate.nanoseconds / 1000000);
  const birthString = birth.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const formatedDate = getFormattedDate(new Date(birthString));


  const handleSaveChanges = () => {
    if (sellerProfile.email === "") {
      setEmailShowTooltip(true);
    } else {
      setEmailShowTooltip(false);
    }
    if (sellerProfile.lastName === "") {
      setLastNameShowTooltip(true);
    } else {
      setLastNameShowTooltip(false);
    }

    if (sellerProfile.firstName === "") {
      setFirstNameShowTooltip(true);
    } else {
      setFirstNameShowTooltip(false);
    }

    if (sellerProfile.middleName === "") {
      setMiddleNameShowTooltip(true);
    } else {
      setMiddleNameShowTooltip(false);
    }

    if (sellerProfile.address === "") {
      setAddressShowTooltip(true);
    } else {
      setAddressShowTooltip(false);
    }

    if (sellerProfile.age === "") {
      setAgeShowTooltip(true);
    } else {
      setAgeShowTooltip(false);
    }

    if (sellerProfile.birthdate === "") {
      setBirthdateShowTooltip(true);
    } else {
      setBirthdateShowTooltip(false);
    }

    if (sellerProfile.contact === "") {
      setContactShowTooltip(true);
    } else {
      setContactShowTooltip(false);
    }

    if (sellerProfile.dateRegister === "") {
      setDateRegisterShowTooltip(true);
    } else {
      setDateRegisterShowTooltip(false);
    }

    if (sellerProfile.gender === "") {
      setGenderShowTooltip(true);
    } else {
      setGenderShowTooltip(false);
    }

    if (sellerProfile.location === "") {
      setLocationShowTooltip(true);
    } else {
      setLocationShowTooltip(false);
    }


    if ((sellerProfile.email !== "" && sellerProfile.email !== null) &&
      (sellerProfile.lastName !== "" && sellerProfile.lastName !== null) &&
      (sellerProfile.firstName !== "" && sellerProfile.firstName !== null) &&
      (sellerProfile.middleName !== "" && sellerProfile.middleName !== null) &&
      (sellerProfile.address !== "" && sellerProfile.address !== null) &&
      (sellerProfile.age !== "" && sellerProfile.age !== null) &&
      (sellerProfile.birthdate !== "" && sellerProfile.birthdate !== null) &&
      (sellerProfile.contact !== "" && sellerProfile.contact !== null) &&
      (sellerProfile.dateRegister !== "" && sellerProfile.dateRegister !== null) &&
      (sellerProfile.gender !== "" && sellerProfile.gender !== null) &&
      (sellerProfile.location !== "" && sellerProfile.location !== null)) {

      const storageRef = storage.ref();
      const fileRef = storageRef.child(`PetSellerOrAdoption/${sellerProfile.email.toString()}`);
      if (selectedFile !== null) {
        fileRef.put(selectedFile).then(() => {
          console.log('File uploaded successfully');
        });
      }

      const birthdate = sellerProfile.birthdate;
      const birthTimestamp = firebase.firestore.Timestamp.fromDate(new Date(birthdate));

      // Save the pet data to Firestore
      db.collection("PetSellerorAdoption_Profile")
        .doc(sellerProfile.email.toString())
        .update({
          PSA_Address: sellerProfile.address,
          PSA_Age: sellerProfile.age,
          PSA_BirthDate: birthTimestamp,
          PSA_ContactNumber: sellerProfile.contact,
          // PSA_DateRegistered: sellerProfile.dateRegister,
          PSA_FirstName: sellerProfile.firstName,
          PSA_Gender: sellerProfile.gender,
          PSA_LastName: sellerProfile.lastName,
          PSA_MiddleName: sellerProfile.middleName,
          PSA_NearbyDVMFLoc: sellerProfile.location,
          PSA_UserEmail: sellerProfile.email
        })
        .then(() => {
          toast.success("Seller Profile Added Successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          props.hidemodal1();
          console.log("success");
        })
        .catch((error) => {
          toast.error("Error updating seller to Firestore: ");
          console.log(error)
        });
    }


  };
  return (
    <>
      <ToastContainer />
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
          <Modal.Title>EDIT PET SELLER</Modal.Title>
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
                  value={sellerProfile ? sellerProfile.email : ""}
                  onChange={handleEdits}
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
                  value={sellerProfile ? sellerProfile.lastName : ""}
                  onChange={handleEdits}
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
                  value={sellerProfile ? sellerProfile.middleName : ""}
                  onChange={handleEdits}
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
                  value={sellerProfile ? sellerProfile.address : ""}
                  onChange={handleEdits}
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
                  type="number"
                  name='age'
                  id='age'
                  className='mb-2'
                  value={sellerProfile ? sellerProfile.age : ""}
                  onChange={handleEdits}
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
                 <Form.Select
                  aria-label="Default select example"
                  name="gender"
                  id="gender"
                  className='mb-2'
                  value={sellerProfile ? sellerProfile.gender : ""}
                  onChange={handleEdits}
                >
                  <option value="">Select Gender</option>
                  <option value="Adoption">Male</option>
                  <option value="Sale">Female</option>
                </Form.Select>
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
                  value={sellerProfile ? sellerProfile.firstName : ""}
                  onChange={handleEdits}
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
                  value={sellerProfile ? formatedDate : ""}
                  onChange={handleEdits}
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
                  type="number"
                  name='contact'
                  id='contact'
                  className='mb-2'
                  value={sellerProfile ? sellerProfile.contact : ""}
                  onChange={handleEdits}
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
                  value={sellerProfile ? sellerProfile.location : ""}
                  readOnly
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
                >Upload Image<span className='red' ref={profileTarget}> *</span></Form.Label>
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

export default EditLguSeller