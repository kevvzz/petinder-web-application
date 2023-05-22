import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form, Card, Modal} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import AddAnnouncement from './AddAnnouncement';
import ViewAnnouncement from './ViewAnnouncement';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { ToastContainer,toast } from 'react-toastify';
function LguAnnouncement() {
    const userData = JSON.parse(localStorage.getItem('lguData'));
    const [lguAnnounce, setLguAnnounce] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [filteredAnnounce, setFilteredAnnounce] = useState([]);

    function onClickAnnouncement() {
        setShowAddModal(true);
    }
    function onClickViewAnnouncement() {
      setShowViewModal(true);
  }

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onClickViewAnnouncement();
  };
    
useEffect(() => {
  const docRef = db.collection("LGU_Announcements").orderBy('Ann_DateSent', 'desc')
  docRef.get()
    .then((querySnapshot) => {
      const announcements = [];
      querySnapshot.forEach((doc) => {
        const announcement = doc.data();
        const { Ann_DateSent, Ann_IDNumber, Ann_Message, Ann_Receiver, Ann_Sender, Ann_Title } = announcement;

        announcements.push({ 
          id: Ann_IDNumber,
          date: Ann_DateSent,
          message: Ann_Message,
          receiver: Ann_Receiver,
          sender: Ann_Sender,
          title: Ann_Title,
        });
      });
      const filteredAnnouncements = announcements.filter(
        (announce) => announce.sender === userData.LGU_UserName
      );
      setLguAnnounce(filteredAnnouncements);
      setFilteredAnnounce(filteredAnnouncements);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}, []);
 
  function searchFilter(e) {
    let term = e.target.value.toLowerCase();
    if (term == "") {
      setFilteredAnnounce(lguAnnounce);
    } else {
      setFilteredAnnounce(
        filteredAnnounce.filter(
          (announce) => announce.title.toLowerCase().indexOf(term) !== -1
        )
      );
    }
  }
  function convertTimestamp(stamp) {
    const date = new Date(stamp.seconds * 1000 + stamp.nanoseconds / 1000000);
    const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});

    return dateString;
  }
  return (
    <div className='main-bg'>
        <LguNavbar/>
        <ToastContainer/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Announcement
                </h1>
            </header>
            <div className="container">
                <Row className='bottomSpace'>
                    <Col  xs={2}>
                        <Row>
                            <div className="button-wrapper" onClick={onClickAnnouncement}>
                                <button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>ADD NEW</button>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={7}>
                        <Row>
                            <InputGroup className="search-employee">
                            <InputGroup.Text className='icon-part'><FontAwesomeIcon className='glass' icon={faMagnifyingGlass}/></InputGroup.Text>
                            <Form.Control
                                className="search-part me-3"
                                type="text"
                                autoComplete="off"
                                aria-label="term"
                                aria-describedby="term"
                                placeholder="Search Pets"
                                name="term"
                                id="term"
                                required
                                onChange={(e) => searchFilter(e)}
                                />
                            </InputGroup>
                        </Row>
                    </Col>
                </Row>
                <AddAnnouncement
                    showmodal1 = {showAddModal}
                    hidemodal1 = {() => setShowAddModal(false)}
                    showmodal1handler = {onClickAnnouncement}
                    userData = {userData}
                />
                <ViewAnnouncement
                    showmodal = {showViewModal}
                    hidemodal = {() => setShowViewModal(false)}
                    lguAnnounce = {selectedItem}
                />
                <div className="row">
                    {filteredAnnounce.map((doc) => (
                      <div class='col-lg-4 col-md-6 mb-4' onClick={() => handleItemClick(doc)}>
                        <div class="request-body">
                          <Card.Text>
                            <Row>
                              <Col>
                                <Row>
                                  <h6 class="fw-bold center">{doc.receiver}</h6>
                                </Row>
                                <Row>
                                  {doc.title}
                                </Row>
                                <Row>
                                  Date Added: {convertTimestamp(doc.date)}
                                </Row>
                              </Col>
                            </Row>
                          </Card.Text>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>	
        </div>	
  )
}

export default LguAnnouncement