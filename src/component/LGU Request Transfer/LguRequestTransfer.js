import React, { useState, useEffect } from 'react'
import { LguNavbar } from '../Navbar/Navbar';
import { Row, Col, InputGroup, Form, Card, Modal } from 'react-bootstrap'
//Firebase Firestore
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
import "firebase/compat/messaging";
import 'firebase/messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewLguRequestTransfer from './ViewLguRequestTransfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import './LguRequestTransfer.css';
import { ToastContainer, toast } from 'react-toastify';

function LguRequestTransfer() {
  const userData = JSON.parse(localStorage.getItem('lguData'));
  const [request, setRequest] = useState([]);
  const [history, setHistory] = useState([]);
  const [allOwner, setAllOwner] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);


  function onClickViewAnnouncement() {
    setShowViewModal(true);
  }

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onClickViewAnnouncement();
  };

  useEffect(() => {
    const docRef = db.collection("Request_Transfer")
    docRef.orderBy('Req_DateSent', 'desc').get()
      .then((querySnapshot) => {
        const requests = [];
        querySnapshot.forEach((doc) => {
          const request = doc.data();
          const { Req_Address, Req_LocTransfer, Req_Reason, Req_Receiver, Req_Sender, Req_Status, Req_Type, Req_DateSent } = request;

          requests.push({
            address: Req_Address,
            location: Req_LocTransfer,
            reason: Req_Reason,
            receiver: Req_Receiver,
            sender: Req_Sender,
            status: Req_Status,
            type: Req_Type,
            date: Req_DateSent
          });
        });
        const filteredRequest = requests.filter(
          (req) => req.location === userData.LGU_BranchName && req.status === "Pending"
        );
        setRequest(filteredRequest);
        const filteredHistory = requests.filter(
          (req) => req.location === userData.LGU_BranchName && (req.status === "Approved" || req.status === "Declined")
        );
        setHistory(filteredHistory);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  function convertTimestamp(stamp) {
    const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
    const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });

    return dateString;
  }

  function handleAgree(item) {
    if (item.status === "Pending") {
      if (item.type === "PetSeller") {
        db.collection("PetSellerorAdoption_Profile")
          .doc(item.sender.toString())
          .update({
            PSA_Address: item.address,
            PSA_NearbyDVMFLoc: item.location,
          })
          .then(() => {
            toast.success("Seller Profile Transfer Successful!");
            console.log("success");
          })
          .catch((error) => {
            toast.error(error);
            console.log(error);
          });
      } else if (item.type === "PetLover") {
        db.collection("PetLovers_Profile")
          .doc(item.sender.toString())
          .update({
            PL_Address: item.address,
            PL_NearbyDVMFLoc: item.location,
          })
          .then(() => {
            toast.success("Owner's Profile Transfer Successful!");
            console.log("success");
          })
          .catch((error) => {
            toast.error(error);
            console.log(error);
          });
      } else {
        toast.error("Error Transferring User!!!");
      }
  
      db.collection("Pets_Profile")
        .where("P_PetOwner", "==", item.sender)
        .get()
        .then((querySnapshot) => {
          const updatePromises = querySnapshot.docs.map((doc) =>
            doc.ref.update({
              P_RegisteredLocation: item.location,
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
        .where("Req_Sender", "==", item.sender)
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
          notify(
            item.type,
            item.sender,
            "Your Request For Transfer has been APPROVED by the LGU"
          );
          toast.success("AGREED REQUEST!!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log("success");
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  }
  
  function handleDecline(item) {
    if (item.status === "Pending") {
      db.collection("Request_Transfer")
        .where("Req_Sender", "==", item.sender)
        .where("Req_Status", "==", "Pending")
        .get()
        .then((querySnapshot) => {
          const updatePromises = querySnapshot.docs.map((doc) =>
            doc.ref.update({
              Req_Status: "Declined",
            })
          );
          return Promise.all(updatePromises);
        })
        .then(() => {
          notify(
            item.type,
            item.sender,
            "Your Request For Transfer has been DECLINED by the LGU"
          );
          toast.success("DECLINED REQUEST!!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  }
  

  const notify = (Reqtype, ReqSenderEmail, Message) => {
    let collection = "";
    let email = "";
    if (Reqtype === "PetLover") {
      collection = "PetLovers_Profile";
      email = "PL_UserEmail";
    } else {
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
    <div className='main-bg'>
      <LguNavbar />
      <ToastContainer />
      <div className="main-content">

        <header>
          <h1>
            LGU Transfer Request
          </h1>
        </header>
        <div className="container bodyBottom">
          <Row>
            <Col>
              <Row>
                <h1>
                  Request Transfer
                </h1>
              </Row>
              <Row className='bodyBottom'>
                <table>
                  <thead>
                    <tr className='headerBorder'>
                      <th className='tLeft'></th>
                      <th className='tLeft'>Requester</th>
                      <th className='tLeft'>Date Request</th>
                      <th className='tLeft'>Request Type</th>
                      <th className='tLeft'>From</th>
                      <th className='tLeft'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {request.map((doc) => (
                      <tr key={doc.id} className='lineBot'>
                        <td className='tLeft'>
                          <Row>
                            <Col className="circle-icon ms-3 p-1" style={{ backgroundColor: 'blue' }} onClick={() => handleItemClick(doc)}>
                              <FontAwesomeIcon icon={faEye} />
                            </Col>
                          </Row>
                        </td>
                        <td className='tLeft'>{doc.sender}</td>
                        <td className='tLeft'>{convertTimestamp(doc.date)}</td>
                        <td className='tLeft'>{doc.type}</td>
                        <td className='tLeft'>{doc.receiver}</td>
                        <td className='tLeft fw-bold text-primary'>{doc.status}</td>
                        <td className='tLeft'>
                          <Row>
                            <Col className="circle-icon me-2" style={{ backgroundColor: 'green' }} onClick={() => handleAgree(doc)}>
                              <FontAwesomeIcon icon={faCheck} />
                            </Col>

                            <Col className="circle-icon me-2" style={{ backgroundColor: 'red' }} onClick={() => handleDecline(doc)}>
                              <FontAwesomeIcon icon={faXmark} />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                    {history.map((hist) => (
                      <tr key={hist.id} className='lineBot'>
                        <td className='tLeft'>
                          <Row>
                            <Col className="circle-icon ms-3 p-1" style={{ backgroundColor: 'blue' }} onClick={() => handleItemClick(hist)}>
                              <FontAwesomeIcon icon={faEye} />
                            </Col>
                          </Row>
                        </td>
                        <td className='tLeft'>{hist.sender}</td>
                        <td className='tLeft'>{convertTimestamp(hist.date)}</td>
                        <td className='tLeft'>{hist.type}</td>
                        <td className='tLeft'>{hist.receiver}</td>
                        <td className='tLeft txtColor' style={{ color: hist.status === "Approved" ? "green" : "red", }}>{hist.status}</td>
                        <td className='tLeft'></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>

            </Col>

          </Row>
        </div>
        {/* <div className="container bodyBottom">
          <Row>
            <Col>
              <Row>
                <h1>
                  History Request
                </h1>
              </Row>
              <Row className='bodyBottom'>
                <table>
                  <thead>
                    <tr className='headerBorder'>
                      <th className='tLeft'>Requester</th>
                      <th className='tLeft'>Date Request</th>
                      <th className='tLeft'>Request Type</th>
                      <th className='tLeft'>From</th>
                      <th className='tLeft'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((hist) => (
                      <tr key={hist.id} className='lineBot'>
                        <td className='tLeft'>{hist.sender}</td>
                        <td className='tLeft'>{convertTimestamp(hist.date)}</td>
                        <td className='tLeft'>{hist.type}</td>
                        <td className='tLeft'>{hist.receiver}</td>
                        <td className='tLeft txtColor' style={{ color: hist.status === "Approved" ? "green" : "red", }}>{hist.status}</td>
                        <td className='tLeft'>
                          <Row>
                            <Col className="circle-icon" style={{ backgroundColor: 'blue' }} onClick={() => handleItemClick(hist)}>
                              <FontAwesomeIcon icon={faEye} />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>

            </Col>

          </Row>
        </div> */}
        <ViewLguRequestTransfer
          showmodal={showViewModal}
          hidemodal={() => setShowViewModal(false)}
          transferAccount={selectedItem}
        />

      </div>
    </div>
  )
}

export default LguRequestTransfer