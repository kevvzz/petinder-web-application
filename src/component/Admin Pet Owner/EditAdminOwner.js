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

function EditAdminOwner(props) {
  const ownerProfile = props.ownerProfile
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState('');

  const handClose = () => {
    props.hidemodal(false);
    setImageUpload('');
  }

  const lastNameTarget = useRef(null);
  const [lastNameShowTooltip, setLastNameShowTooltip] = useState(false);
  const firstNameTarget = useRef(null);
  const [firstNameShowTooltip, setFirstNameShowTooltip] = useState(false);
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

  function handleEdits(e) {
    let owner = { ...ownerProfile };
    const regex = /^\d{4}-\d{2}-\d{2}$/; // regular expression to match the format yyyy-mm-dd
    let value = e.target.value

    if (regex.test(value)) {
      value = firebase.firestore.Timestamp.fromDate(new Date(value));
    }

    owner[e.target.id] = value;
    props.setOwnerProfile(owner);
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

  let ownerDate = ownerProfile.birthdate;

  const regex = /^\d{4}-\d{2}-\d{2}$/; // regular expression to match the format yyyy-mm-dd
  if (regex.test(ownerDate)) {
    ownerDate = firebase.firestore.Timestamp.fromDate(new Date(ownerProfile.birthdate));
  }

  const birth = new Date(ownerProfile.birthdate.seconds * 1000 + ownerProfile.birthdate.nanoseconds / 1000000);
  const birthString = birth.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const formatedDate = getFormattedDate(new Date(birthString));

  const handleSaveChanges = () => {
    if (ownerProfile.lastName === "") {
      setLastNameShowTooltip(true);
    } else {
      setLastNameShowTooltip(false);
    }

    if (ownerProfile.firstName === "") {
      setFirstNameShowTooltip(true);
    } else {
      setFirstNameShowTooltip(false);
    }

    if (ownerProfile.address === "") {
      setAddressShowTooltip(true);
    } else {
      setAddressShowTooltip(false);
    }

    if (ownerProfile.age === "") {
      setAgeShowTooltip(true);
    } else {
      setAgeShowTooltip(false);
    }

    if (ownerProfile.birthdate === "") {
      setBirthdateShowTooltip(true);
    } else {
      setBirthdateShowTooltip(false);
    }

    if (ownerProfile.contact === "") {
      setContactShowTooltip(true);
    } else {
      setContactShowTooltip(false);
    }

    if (ownerProfile.gender === "") {
      setGenderShowTooltip(true);
    } else {
      setGenderShowTooltip(false);
    }

    if (ownerProfile.location === "") {
      setLocationShowTooltip(true);
    } else {
      setLocationShowTooltip(false);
    }


    if((ownerProfile.lastName !== "" && ownerProfile.lastName !== null) &&
      (ownerProfile.firstName !== "" && ownerProfile.firstName !== null) &&
      (ownerProfile.address !== "" && ownerProfile.address !== null) &&
      (ownerProfile.age !== "" && ownerProfile.age !== null) &&
      (ownerProfile.birthdate !== "" && ownerProfile.birthdate !== null) &&
      (ownerProfile.contact !== "" && ownerProfile.contact !== null) &&
      (ownerProfile.dateRegister !== "" && ownerProfile.dateRegister !== null) &&
      (ownerProfile.gender !== "" && ownerProfile.gender !== null) &&
      (ownerProfile.location !== "" && ownerProfile.location !== null)) {

        // Save the pet data to Firestore
        db.collection("PetLovers_Profile")
        .doc(ownerProfile.email.toString())
        .update({
          PL_Address: ownerProfile.address,
          PL_Age: ownerProfile.age,
          PL_BirthDate: ownerDate,
          PL_ContactNumber: ownerProfile.contact,
          // PL_DateRegistered: ownerProfile.dateRegister,
          PL_FirstName: ownerProfile.firstName,
          PL_Gender: ownerProfile.gender,
          PL_LastName: ownerProfile.lastName,
          PL_MiddleName: ownerProfile.middleName,
          PL_NearbyDVMFLoc: ownerProfile.location,
          PL_UserEmail: ownerProfile.email
        }).then(() => {
          toast.success("Owner Profile Updated Successfully!");
          props.hidemodal();
          console.log("success");
        }).catch((error) => {
          toast.error(error);
          console.log(error);
        });

        const storageRef = storage.ref();
        const fileRef = storageRef.child(`PetLover/${ownerProfile.email.toString()}`);
        if (selectedFile !== null) {
          fileRef.put(selectedFile).then(() => {
            console.log('File uploaded successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }
      }
    }

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
          <Modal.Title>EDIT PET OWNER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <Row>
                <Form.Label
                  className='h6'
                >First Name<span className='red' ref={firstNameTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  id='firstName'
                  className='mb-2'
                  value={ownerProfile ? ownerProfile.firstName : ""}
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
                >Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name='middleName'
                  id='middleName'
                  className='mb-2'
                  value={ownerProfile ? ownerProfile.middleName : ""}
                  onChange={handleEdits}
                />
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
                  value={ownerProfile ? ownerProfile.address : ""}
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
                  value={ownerProfile ? ownerProfile.age : ""}
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
                  value={ownerProfile ? ownerProfile.gender : ""}
                  onChange={handleEdits}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                >Last Name<span className='red' ref={lastNameTarget}> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='lastName'
                  id='lastName'
                  className='mb-2'
                  value={ownerProfile ? ownerProfile.lastName : ""}
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
                >Birthdate<span className='red' ref={birthdateTarget}> *</span></Form.Label>
                <Form.Control
                  type="date"
                  name='birthdate'
                  id='birthdate'
                  className='mb-2'
                  value={ownerProfile ? formatedDate : ""}
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
                  value={ownerProfile ? ownerProfile.contact : ""}
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
                  value={ownerProfile ? ownerProfile.location : ""}
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

export default EditAdminOwner