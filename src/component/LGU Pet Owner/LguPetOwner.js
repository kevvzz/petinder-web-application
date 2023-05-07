import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddLguOwner from './AddLguOwner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
function LguPetOwner() {
  const navigate = useNavigate()
    const [allOwner, setAllOwner] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filteredOwner, setFilteredOwner] = useState([]);
    
    function onClickAddOwner() {
        setShowAddModal(true);
    }
    

    useEffect(() => {
    db.collection("PetLovers_Profile")
      .get()
      .then((querySnapshot) => {
        const promises = [];
        querySnapshot.forEach((doc) => {
          const email = doc.data().PL_UserEmail;
          const firstName = doc.data().PL_FirstName;
          const lastName = doc.data().PL_LastName;
          const middleName = doc.data().PL_MiddleName;
          const address = doc.data().PL_Address;
          const age = doc.data().PL_Age;
          const birthdate = doc.data().PL_BirthDate;
          const contact = doc.data().PL_ContactNumber;
          const dateRegister = doc.data().PL_DateRegistered;
          const gender = doc.data().PL_Gender;
          const location = doc.data().PL_NearbyDVMFLoc;

          const promise = storage
            .ref()
            .child(`PetLover/${email}`)
            .getDownloadURL()
            .then((url) => {
              return { email, firstName,lastName, url, middleName, address, age, birthdate, contact, dateRegister, gender, location};
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


  function searchFilter(e) {
    let term = e.target.value.toLowerCase();
    if (term == "") {
      setFilteredOwner(allOwner);
    } else {
      setFilteredOwner(
        allOwner.filter(
          (owner) => owner.email.toLowerCase().indexOf(term) !== -1 || owner.name.toLowerCase().indexOf(term) !== -1
        )
      );
    }
  }
  return (
    <div className='main-bg'>
        <LguNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                    LGU Pet Owners
                </h1>
            </header>
            <div className="container">
              <Row className='bottomSpace'>
                  <Col  xs={2}>
                      <Row>
                          <a>
                              <div className="button-wrapper" onClick={onClickAddOwner}>
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
              <AddLguOwner
                  showmodal = {showAddModal}
                  hidemodal = {setShowAddModal}
                  showmodalhandler = {onClickAddOwner}
              />
              <div className="rowCard">
                  {filteredOwner.map((doc) => (
                      <div className="pet-card" key={doc.email} onClick={() => navigate("/lgu-owner-profile", {state: {filteredOwner, doc}} )}>
                          <a>
                              <img src={doc.url} alt="profile"/>
                              <div>
                                  <h4 className='name-transform'><center><b>{(doc.firstName+" "+ doc.lastName)}</b></center></h4> 
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

export default LguPetOwner