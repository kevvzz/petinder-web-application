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

import { ToastContainer,toast } from 'react-toastify';

// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';

function AddAnnouncement(props) {
    const announcementData = props.userData
    // const {quill, quillRef} = useQuill();
    const titleTarget = useRef(null);
    const [titleShowTooltip, setTitleShowTooltip] = useState(false);
    const messageTarget = useRef(null);
    const [messageShowTooltip, setMessageShowTooltip] = useState(false);

    const currentDate = new Date();
    const timestamp = firebase.firestore.Timestamp.fromDate(currentDate);
  
    const [announcement, setAnnouncement] = useState({
      id: Math.floor(10000000 + Math.random() * 90000000),
      date: '',
      message: '',
      receiver: '',
      sender: '',
      title: ''
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setAnnouncement({ ...announcement, [name]: value });
    };

    console.log(announcement);

    const handleSaveChanges = () => {
      if (announcement.title === "") {
        setTitleShowTooltip(true);
      } else {
        setTitleShowTooltip(false);
      }
      if (announcement.message === "") {
        setMessageShowTooltip(true);
      } else {
        setMessageShowTooltip(false);
      }
  
      if ((announcement.title !== "" && announcement.title !== null)&&
      (announcement.message !== "" && announcement.message !== null)){
        
        // Save the pet data to Firestore
        db.collection("LGU_Announcements")
          .doc(announcement.id.toString())
          .set({
            Ann_IDNumber: announcement.id.toString(),
            Ann_DateSent: timestamp,
            Ann_Message: announcement.message,
            Ann_Receiver: announcementData.LGU_BranchName,
            Ann_Sender: announcementData.LGU_UserName,
            Ann_Title: announcement.title,
          })
          .then(() => {
            toast.success("LGU Announcement Added Successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1000); 
            props.hidemodal1();
          })
          .catch((error) => {
            toast.error("Error adding announcement to Firestore: ");
            console.log(error)
          });
      }
  
  
    };

    // Fetch the quill content
  //   React.useEffect(() => {
  //     if (quill) {
  //         quill.on('text-change', (delta, oldDelta, source) => {
  //             var temp_content = quillRef.current.firstChild.innerHTML;
  //             setAnnouncement((prev) => {
  //                 return {
  //                     ...prev,
  //                     message: temp_content
  //                 }
  //             });
  //       });
  //     }
  // }, [quill]);
    return (
      <div>
      <ToastContainer/>
        <Modal show={props.showmodal1} onHide={props.hidemodal1} centered className='modal-lg'>
          <Modal.Header className='headerBG' closeButton>
            <Modal.Title>ADD ANNOUNCEMENT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Label ref={titleTarget} className="h6" htmlFor="name">Title<span className='red'> *</span></Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type="text"
                    name="title"
                    id="title"
                    className="form-control mb-2"
                    value={announcement.title}
                    onChange={handleInputChange}
                  />
                  <Overlay target={titleTarget.current} show={titleShowTooltip} placement="right">
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Empty Announcement Title
                      </Tooltip>
                    )}
                  </Overlay>
                </InputGroup>
              </Col>
            </Row>
            <Row>
            <Col>
              <Form.Label ref={messageTarget} className="h6">Message<span className='red'> *</span></Form.Label>
              <InputGroup className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      aria-label="message" 
                      aria-describedby="message" 
                      placeholder="Enter message" 
                      name="message" 
                      id='message'
                      value={announcement.message} 
                      onChange={handleInputChange}
                  />
                  <Overlay target={messageTarget.current} show={messageShowTooltip} placement="right">
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Empty Announcement Message
                      </Tooltip>
                    )}
                  </Overlay>
              </InputGroup>
            </Col>
              {/* <div ref={quillRef} />
              <div style={{ width: 400, height: 50}}></div> */}
            </Row>

            <div className='d-flex justify-content-end me-2 mt-4 button-wrapper'>
              <button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
}

export default AddAnnouncement