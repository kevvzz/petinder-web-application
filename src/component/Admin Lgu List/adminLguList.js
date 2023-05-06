import React, { useState,useEffect } from 'react'
import {AdminNavbar} from '../Navbar/Navbar';
import AddLguUser from './AddLguUser';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
function AdminLguList() {
    const navigate = useNavigate()
    const [allOwner, setAllOwner] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filteredOwner, setFilteredOwner] = useState([]);
    
    function onClickAddLgu() {
        setShowAddModal(true);
    }

    useEffect(() => {
    db.collection("LGU_Profile")
      .get()
      .then((querySnapshot) => {
        const promises = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data().LGU_UserName;
          const branch = doc.data().LGU_BranchName;
          const address = doc.data().LGU_Address;
          const contact = doc.data().LGU_ContactNumber;
          const dateRegister = doc.data().LGU_DateRegistered;
          const email = doc.data().LGU_Email;


          const promise = storage
            .ref()
            .child(`LGU_DVMF/${user}`)
            .getDownloadURL()
            .then((url) => {
              return { branch,user, url, address, contact, dateRegister, email};
            })
            .catch((error) => {
              console.log(error);
              return null;
            });

          promises.push(promise);
        });

        Promise.all(promises).then((data) => {
          setAllOwner(data.filter((item) => item !== null));
          setFilteredOwner(data.filter((item) => item !== null));
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  console.log(allOwner);

  function searchFilter(e) {
    let term = e.target.value.toLowerCase();
    if (term == "") {
      setFilteredOwner(allOwner);
    } else {
      setFilteredOwner(
        allOwner.filter(
          (owner) => owner.branch.toLowerCase().indexOf(term) !== -1 || owner.user.toLowerCase().indexOf(term) !== -1
        )
      );
    }
  }
  return (
    <div className='main-bg'>
        <AdminNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                    Admin LGU List
                </h1>
            </header>
            <div className="container">
                    <Row className='bottomSpace'>
                        <Col  xs={2}>
                            <Row>
                                <a>
                                    <div className="button-wrapper" onClick={onClickAddLgu}>
                                        <button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>ADD NEW</button>
                                    </div>
                                </a>
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
                                    onChange={(e) => searchFilter(e)}
                                    />
                                </InputGroup>
                            </Row>
                        </Col>
                    </Row>
                    <AddLguUser
                        showmodal = {showAddModal}
                        hidemodal = {setShowAddModal}
                        showmodalhandler = {onClickAddLgu}
                    />
                    <div className="rowCard">
                        {filteredOwner.map((doc) => (
                            <div className="pet-card" key={doc.email} onClick={() => navigate("/admin-lgu-profile", {state: {filteredOwner, doc}} )}>
                                <a>
                                    <img src={doc.url} alt="profile"/>
                                    <div>
                                        <h4><center><b>{doc.user}</b></center></h4> 
                                    </div>
                                </a>   
                            </div>
                        ))}
                    </div>
            </div>	
        </div>
    </div>	
  )
}

export default AdminLguList