import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form, Card, Modal} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';

function LguNewTransfer() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    const [request, setRequest] = useState([]);
    const [history, setHistory] = useState([]);

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
  docRef.get()
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
      const filteredHistory = requests.filter(
        (req) => req.location === userData.LGU_BranchName && (req.status === "Approved")
      );
      setHistory(filteredHistory);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}, []);

function convertTimestamp(stamp) {
    const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
    const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});

    return dateString;
  }
  return (
    <div className='main-bg'>
        <LguNavbar/>
        <ToastContainer/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU New Transfer
                </h1>
            </header>
            <div className="container">
                <Row>
                    <Col>
                        <Row> 
                            <h1>
                                History For New Trasfer
                            </h1>
                        </Row>
                        <Row>
                            {history.map((doc) => (
                                <div className='newSize'>
                                    <div class="history-body">
                                        <Card.Text>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <h6 class="fw-bold center">New Transfer</h6>
                                                </Row>
                                                <Row>
                                                    <Col><b>Requester:</b></Col>
                                                    <Col>{doc.sender}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><b>Date of Transfer:</b></Col>
                                                    <Col>{convertTimestamp(doc.date)}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><b>Request Type:</b></Col>
                                                    <Col>{doc.type}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        </Card.Text>
                                    </div>
                                </div>
                            ))}
                        </Row>
                    </Col>
                </Row>
              </div>
            </div>	
        </div>	
  )
}

export default LguNewTransfer