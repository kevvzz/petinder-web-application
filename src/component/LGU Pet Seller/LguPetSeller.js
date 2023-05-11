import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
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

import AddLguSeller from './AddLguSeller';
 
function LguPetSeller() {
  const userData = JSON.parse(localStorage.getItem('lguData'));
  const navigate = useNavigate()
  const [allSeller, setAllSeller] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredSeller, setFilteredSeller] = useState([]);
  
  function onClickAddSeller() {
      setShowAddModal(true);
  }
  

  useEffect(() => {
  db.collection("PetSellerorAdoption_Profile")
    .get()
    .then((querySnapshot) => {
      const promises = [];
      querySnapshot.forEach((doc) => {
        const email = doc.data().PSA_UserEmail;
        const firstName = doc.data().PSA_FirstName;
        const lastName = doc.data().PSA_LastName;
        const middleName = doc.data().PSA_MiddleName;
        const address = doc.data().PSA_Address;
        const age = doc.data().PSA_Age;
        const birthdate = doc.data().PSA_BirthDate;
        const contact = doc.data().PSA_ContactNumber;
        const dateRegister = doc.data().PSA_DateRegistered;
        const gender = doc.data().PSA_Gender;
        const location = doc.data().PSA_NearbyDVMFLoc;


        if (location === userData.LGU_BranchName){
          const promise = storage
          .ref()
          .child(`PetSellerOrAdoption/${email}`)
          .getDownloadURL()
          .then((url) => {
            return { email, firstName,lastName, url, middleName, address, age, birthdate, contact, dateRegister, gender, location};
          })
          .catch((error) => {
            console.log(error);
            return null;
          });

        promises.push(promise);
        }
      });

      Promise.all(promises).then((data) => {
        setAllSeller(data.filter((item) => item !== null));
        setFilteredSeller(data.filter((item) => item !== null));
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}, []);

function searchFilter(e) {
  let term = e.target.value.toLowerCase();
  if (term == "") {
    setFilteredSeller(allSeller);
  } else {
    setFilteredSeller(
      allSeller.filter(
        (seller) => seller.email.toLowerCase().indexOf(term) !== -1 || seller.name.toLowerCase().indexOf(term) !== -1
      )
    );
  }
}
console.log(filteredSeller);
return (
  <div className='main-bg'>
      <LguNavbar/>
      <div className="main-content">
          <header>
              <h1>
                  LGU Pet Seller
              </h1>
          </header>
          <div className="container">
            <Row className='bottomSpace'>
                <Col  xs={2}>
                    <Row>
                        <a>
                            <div className="button-wrapper" onClick={onClickAddSeller}>
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
            <AddLguSeller
                showmodal = {showAddModal}
                hidemodal = {setShowAddModal}
                showmodalhandler = {onClickAddSeller}
            />
            <div className="rowCard">
                {filteredSeller.map((doc) => (
                    <div className="pet-card" key={doc.email} onClick={() => navigate("/lgu-seller-profile", {state: {filteredSeller, doc}} )}>
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

export default LguPetSeller