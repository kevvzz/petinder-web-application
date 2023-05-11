import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging'; // import the Firebase messaging module
import "firebase/compat/messaging";
import 'firebase/messaging';
import { ToastContainer, toast } from 'react-toastify';

// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';


function ViewAnnouncement(props) {

   const lguAnnounce = props.lguAnnounce
   console.log(lguAnnounce)

    function convertTimestamp(stamp) {
        const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
        const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
    
        return dateString;
    }
   
  return (
    <div>
      <ToastContainer />
      <Modal show={props.showmodal} onHide={props.hidemodal} centered className='modal-lg'>
        <Modal.Header className='headerBG' closeButton>
          <Modal.Title>VIEW ANNOUNCEMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Row>
            <Col>
              <Form.Label className="h6" htmlFor="name">Title</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  readOnly
                  className="form-control mb-2"
                  value={lguAnnounce? lguAnnounce.title : ""}
                //   onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="h6">Message</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  aria-label="message"
                  aria-describedby="message"
                  placeholder="Enter message"
                  readOnly
                  name="message"
                  id='message'
                  value={lguAnnounce? lguAnnounce.message : ""}
                //   onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
            {/* <div ref={quillRef} />
              <div style={{ width: 400, height: 50}}></div> */}
          </Row>
          <Row>
            <Col>
              <Form.Label className="h6" htmlFor="name">Date Added</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  readOnly
                  className="form-control mb-2"
                  value={lguAnnounce ?convertTimestamp(lguAnnounce.date) : ""}
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

export default ViewAnnouncement