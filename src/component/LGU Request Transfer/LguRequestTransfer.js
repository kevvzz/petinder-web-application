import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form, Card, Modal} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewLguRequestTransfer from './ViewLguRequestTransfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import './LguRequestTransfer.css';
import { ToastContainer,toast } from 'react-toastify';

function LguRequestTransfer() {
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
      const filteredRequest = requests.filter(
        (req) => req.receiver === userData.LGU_BranchName && req.status === "Pending"
      );
      setRequest(filteredRequest);
      const filteredHistory = requests.filter(
        (req) => req.receiver === userData.LGU_BranchName && (req.status === "Approved" || req.status === "Decline")
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
                    LGU Request Transfer
                </h1>
            </header>
            <div className="container">
                <Row>
                    <Col>
                        <Row> 
                            <h1>
                                Pending Request
                            </h1>
                        </Row>
                        <Row>
                            {request.map((doc) => (
                                <div className='padBottom' onClick={() => handleItemClick(doc)}>
                                    <div class="card-body">
                                        <Card.Text>
                                        <Row>
                                            <Col>
                                            <Row>
                                                <h6 class="fw-bold center">Request Transfer</h6>
                                            </Row>
                                            <Row>
                                                <Col xs={4}><b>Requester:</b></Col>
                                                <Col>{doc.sender}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><b>Date Request:</b></Col>
                                                <Col>{convertTimestamp(doc.date)}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><b>Request Type:</b></Col>
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
                    <Col>
                        <Row> 
                            <h1>
                                History For Request
                            </h1>
                        </Row>
                        <Row>
                            {history.map((doc) => (
                                <div className='padBottom'>
                                    <div class="history-body"  style={{ background: doc.status === "Approved" ? "#43a047" : "red" }}>
                                        <Card.Text>
                                        <Row>
                                            <Col>
                                            <Row>
                                                <h6 class="fw-bold center">Request Transfer</h6>
                                            </Row>
                                            <Row>
                                                <Col xs={4}><b>Requester:</b></Col>
                                                <Col>{doc.sender}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><b>Date Request:</b></Col>
                                                <Col>{convertTimestamp(doc.date)}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><b>Request Type:</b></Col>
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
              <ViewLguRequestTransfer
                showmodal = {showViewModal}
                hidemodal = {() => setShowViewModal(false)}
                lguAnnounce = {selectedItem}
              />
            </div>	
        </div>	
  )
}

export default LguRequestTransfer