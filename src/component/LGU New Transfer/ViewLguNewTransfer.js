import React, { useState,useEffect } from 'react'
import { Modal, Row, Col, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging'; 
import "firebase/compat/messaging";
import 'firebase/messaging';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import './LguNewTransfer.css';

function ViewLguNewTransfer(props) {
    const request = props.transferAccount?props.transferAccount:""; 
    const [allOwner, setAllOwner] = useState([]);
     function convertTimestamp(stamp) {
         const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
         const dateString = date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
     
         return dateString;
     }

     useEffect(() => {
      if (request.type === "PetLover") {
        db.collection("PetLovers_Profile")
          .doc(request.sender)
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.data();
            if (data) {
              const promises = [];
              const email = data.PL_UserEmail;
              const firstName = data.PL_FirstName;
              const lastName = data.PL_LastName;
              const middleName = data.PL_MiddleName;
              const address = data.PL_Address;
              const age = data.PL_Age;
              const birthdate = data.PL_BirthDate;
              const contact = data.PL_ContactNumber;
              const dateRegister = data.PL_DateRegistered;
              const gender = data.PL_Gender;
              const location = data.PL_NearbyDVMFLoc;
    
              const promise = storage
                .ref()
                .child(`PetLover/${request.sender}`)
                .getDownloadURL()
                .then((url) => {
                  return {
                    email,
                    firstName,
                    lastName,
                    url,
                    middleName,
                    address,
                    age,
                    birthdate,
                    contact,
                    dateRegister,
                    gender,
                    location,
                  };
                })
                .catch((error) => {
                  console.log(error);
                  return null;
                });
    
              promises.push(promise);
    
              Promise.all(promises).then((data) => {
                setAllOwner(data.filter((item) => item !== null));
              });
            }
          })
          .catch((error) => {
            console.log("Error getting document: ", error);
          });
      } else if (request.type === "PetSeller") {
        db.collection("PetSellerorAdoption_Profile")
          .doc(request.sender)
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.data();
            if (data) {
              const promises = [];
              const email = data.PSA_UserEmail;
              const firstName = data.PSA_FirstName;
              const lastName = data.PSA_LastName;
              const middleName = data.PSA_MiddleName;
              const address = data.PSA_Address;
              const age = data.PSA_Age;
              const birthdate = data.PSA_BirthDate;
              const contact = data.PSA_ContactNumber;
              const dateRegister = data.PSA_DateRegistered;
              const gender = data.PSA_Gender;
              const location = data.PSA_NearbyDVMFLoc;
    
              const promise = storage
                .ref()
                .child(`PetSellerOrAdoption/${request.sender}`)
                .getDownloadURL()
                .then((url) => {
                  return {
                    email,
                    firstName,
                    lastName,
                    url,
                    middleName,
                    address,
                    age,
                    birthdate,
                    contact,
                    dateRegister,
                    gender,
                    location,
                  };
                })
                .catch((error) => {
                  console.log(error);
                  return null;
                });
    
              promises.push(promise);
    
              Promise.all(promises).then((data) => {
                setAllOwner(data.filter((item) => item !== null));
              });
            }
          })
          .catch((error) => {
            console.log("Error getting document: ", error);
          });
      }
    }, [request]);

   return (
     <div>
       <ToastContainer />
       <Modal show={props.showmodal} onHide={props.hidemodal} centered className='modal-lg'>
         <Modal.Header className='headerBG' closeButton>
           <Modal.Title>VIEW REQUEST TRANSFERS</Modal.Title>
         </Modal.Header>
          <Modal.Body> 
            <Row className='marginBottom'>
              <Col>
              {allOwner.map((doc) => (
                <Row className='orange'>
                  <Col xs="auto"></Col>
                    <img className='picture' src={doc.url} alt="picture"/>
                  <Col>
                    <Row>
                      <Col className='center'>
                        <div className='petName'>{(doc.firstName+" "+doc.lastName)}</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='center'>
                        <div className='petOwner'>{doc.contact}</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='center'>
                        <div className='petOwner'>{doc.location}</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='center'>
                        <div className='petOwner'>{doc.address}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="h6" htmlFor="name">Email:</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="sender"
                    id="sender"
                    readOnly
                    className="form-control mb-2"
                    value={request? request.sender : ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Label className="h6" htmlFor="name">Type:</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="type"
                    id="type"
                    readOnly
                    className="form-control mb-2"
                    value={request? request.type : ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="h6">Reason for Request</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    aria-label="reason"
                    aria-describedby="reason"
                    readOnly
                    name="reason"
                    id='reason'
                    value={request? request.reason : ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              {/* <Col>
                <Form.Label className="h6" htmlFor="name">Transfer to New DVMF:</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="newDVMF"
                    id="newDVMF"
                    readOnly
                    className="form-control mb-2"
                    value={request? request.location: ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col> */}
              <Col>
                <Form.Label className="h6" htmlFor="name">New Address</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="newAddress"
                    id="newAddress"
                    readOnly
                    className="form-control mb-2"
                    value={request? request.address : ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Label className="h6" htmlFor="name">Date Requested</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="date"
                    id="date"
                    readOnly
                    className="form-control mb-2"
                    value={request.date ?convertTimestamp(request.date) : ""}
                  //   onChange={handleInputChange}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>
       </Modal>
     </div>
   )
}

export default ViewLguNewTransfer