import React, { useState, useEffect } from 'react'
import { LguNavbar } from '../Navbar/Navbar';
import { Row, Col, InputGroup, Form, Card, Modal } from 'react-bootstrap'

import ViewLguNewTransfer from './ViewLguNewTransfer';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';

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
        const filteredHistory = requests.filter(
          (req) => req.receiver === userData.LGU_BranchName && (req.status === "Approved" || req.status === "Declined")
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
  return (
    <div className='main-bg'>
      <LguNavbar />
      <ToastContainer />
      <div className="main-content">

        <header>
          <h1>
            LGU New Transfer
          </h1>
        </header>
        <div className="container bodyBottom">
          <Row>
            <Col>
              <Row>
                <h1>
                  New Transfer History
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
                    {history.map((hist) => (
                      <tr key={hist.id} className='lineBot'>
                        <td className='tLeft'>
                          <Row>
                            <Col className="circle-icon ms-3 p-2" style={{ backgroundColor: 'blue' }} onClick={() => handleItemClick(hist)}>
                              <FontAwesomeIcon icon={faEye} />
                            </Col>
                          </Row>
                        </td>
                        <td className='tLeft'>{hist.sender}</td>
                        <td className='tLeft'>{convertTimestamp(hist.date)}</td>
                        <td className='tLeft'>{hist.type}</td>
                        <td className='tLeft'>{hist.receiver}</td>
                        <td className='tLeft txtColor' style={{ color: hist.status === "Approved" ? "green" : "red", }}>{hist.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>

            </Col>

          </Row>
        </div>
        <ViewLguNewTransfer
          showmodal={showViewModal}
          hidemodal={() => setShowViewModal(false)}
          transferAccount={selectedItem}
        />
      </div>
    </div>
  )
}

export default LguNewTransfer