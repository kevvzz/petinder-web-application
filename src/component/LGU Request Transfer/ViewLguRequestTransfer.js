import React from 'react';
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
import { faTrash, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import './LguRequestTransfer.css';

function ViewLguRequestTransfer(props) {
    const request = props.lguAnnounce

    console.log(request);
     function convertTimestamp(stamp) {
         const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
         const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
     
         return dateString;
     }

     function handleAgree(e) {
      if (request.status === "Pending") {
        if (request.type === "PetSeller") {
          db.collection("PetSellerorAdoption_Profile")
            .doc(request.sender.toString())
            .update({
              PSA_Address: request.address,
              PSA_NearbyDVMFLoc: request.location,
            })
            .then(() => {
              toast.success("Seller Profile Transfer Successfully!");
              console.log("success");
            })
            .catch((error) => {
              toast.error(error);
              console.log(error);
            });
        } else if (request.type === "PetLover") {
          db.collection("PetLovers_Profile")
            .doc(request.sender.toString())
            .update({
              PL_Address: request.address,
              PL_NearbyDVMFLoc: request.location,
            })
            .then(() => {
              toast.success("Owner's Profile Transfer Successfully!");
              console.log("success");
            })
            .catch((error) => {
              toast.error(error);
              console.log(error);
            });
        } else {
          toast.error("Error Transfer of User!!!");
        }

        db.collection("Pets_Profile")
          .where("P_PetOwner", "==", request.sender)
          .get()
          .then((querySnapshot) => {
            const updatePromises = querySnapshot.docs.map((doc) =>
              doc.ref.update({
                P_RegisteredLocation: request.location,
              })
            );
            return Promise.all(updatePromises);
          })
          .then(() => {
            console.log("Pet transfer updated!");
          })
          .catch((error) => {
            toast.error(error);
            console.log(error);
          });
    
        db.collection("Request_Transfer")
          .where("Req_Sender", "==", request.sender)
          .where("Req_Status", "==", "Pending")
          .get()
          .then((querySnapshot) => {
            const updatePromises = querySnapshot.docs.map((doc) =>
              doc.ref.update({
                Req_Status: "Approved",
              })
            );
            return Promise.all(updatePromises);
          })
          .then(() => {
            notify(request.type, request.sender,"Your Request For Transfer has been APPROVED by the LGU");
            toast.success("AGREED REQUEST!!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            props.hidemodal();
            console.log("success");
          })
          .catch((error) => {
            toast.error(error);
            console.log(error);
          });
      }
    }
    
    function handleDecline(e) {
      if (request.status === "Pending") {
        db.collection("Request_Transfer")
          .where("Req_Sender", "==", request.sender)
          .where("Req_Status", "==", "Pending")
          .get()
          .then((querySnapshot) => {
            const updatePromises = querySnapshot.docs.map((doc) =>
              doc.ref.update({
                Req_Status: "Decline",
              })
            );
            return Promise.all(updatePromises);
          })
          .then(() => {
            notify(request.type, request.sender,"Your Request For Transfer has been DECLINED by the LGU");
            toast.success("DECLINE REQUEST!!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            props.hidemodal();
          })
          .catch((error) => {
            toast.error(error);
            console.log(error);
          });
      }
    }
    
    const notify = (Reqtype, ReqSenderEmail,Message) => {
      let collection = "";
      let email = "";
      if(Reqtype === "PetLover"){
        collection = "PetLovers_Profile";
        email = "PL_UserEmail";
      } else{
        collection = "PetSellerorAdoption_Profile";
        email = "PSA_UserEmail";
      }
      const db = firebase.firestore();
      const devicesCollection = db.collection(collection).where(email, "==", ReqSenderEmail);
  
      // Send message to all devices
      devicesCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const deviceToken = doc.data().RegistrationToken;
  
          console.log('Registration token:', deviceToken);
  
          // Send the notification
          fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'key=AAAAp19aKsI:APA91bHq0SsZEdxRkUqsy5GHubUld5HFz95vioS7VOvusbbbLvrpDuKuk0bDawVA_8sGyPQTt5PZ-fCxPtH_TKsPiaD1EtiBoivS72kKZ2FHpZFZ_9E6ljcQlYxzRxlV5hBmXO5X2urs'
            },
            body: JSON.stringify({
              notification: {
                title: "Notification for Request Transfer!!",
                body: Message
              },
              to: deviceToken
            })
          }).then((response) => {
            console.log('Notification sent:', response);
          }).catch((error) => {
            console.error('Error sending notification:', error);
          });
  
        })
  
      });
    }

   return (
     <div>
       <ToastContainer />
       <Modal show={props.showmodal} onHide={props.hidemodal} centered className='modal-lg'>
         <Modal.Header className='headerBG' closeButton>
           <Modal.Title>VIEW REQUEST TRANSFERS</Modal.Title>
         </Modal.Header>
         <Modal.Body> 
           <Row>
             <Col>
               <Form.Label className="h6" htmlFor="name">Sender:</Form.Label>
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
           <Col>
               <Form.Label className="h6" htmlFor="name">New Address For Transfer</Form.Label>
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
             <Col>
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
             </Col>
           </Row>
           <Row>
             <Col xs={6}>
               <Form.Label className="h6" htmlFor="name">Date Added</Form.Label>
               <InputGroup className='mb-3'>
                 <Form.Control
                   type="text"
                   name="date"
                   id="date"
                   readOnly
                   className="form-control mb-2"
                   value={request ?convertTimestamp(request.date) : ""}
                 //   onChange={handleInputChange}
                 />
               </InputGroup>
             </Col>
             <Col className='center'>
               <button onClick={handleAgree} type="button" className="announceAgree">
                 <FontAwesomeIcon icon={faCheck} /><span> </span>
                   AGREE
               </button>
             </Col>
             <Col className='center'>
               <button onClick={handleDecline} type="button" className="announceDelete">
                 <FontAwesomeIcon icon={faXmark} /><span> </span>
                   DECLINE
               </button>
             </Col>
           </Row>
         </Modal.Body>
       </Modal>
     </div>
   )
}

export default ViewLguRequestTransfer