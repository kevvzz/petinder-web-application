import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
import { Table, thead, tbody, tr, th, td } from 'react-bootstrap';
import picture from '../../Assets/bingo.jpg'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import john from '../../Assets/pet-owner-profile.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';
function LguPetSellerProfile() {
    const location = useLocation();
    console.log(location.state);
    const data = location.state.doc;
  return (
    <div className='main-bg'>
      <LguNavbar/>
      <div className="main-content">
        <header>
            <h1>
                LGU Pet Seller Profile
            </h1>
        </header>
        <div className='container paddingBottom'>
          <Row>
            <Col>
              <Row className='orange'>
                <Col xs="auto"></Col>
                  <img className='picture' src={data.url} alt="picture"/>
                <Col>
                  <Row><Col className='center'><div className='petName'>{data.name}</div></Col></Row>
                </Col>
              </Row>
              <Row>
                <Col className='marginTop' xs={3}>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>UPDATE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>DELETE</button></Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Address:</Col>
                    <Col xs={6}>New York</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>AGE:</Col>
                    <Col xs={6}>30</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>BirthDate:</Col>
                    <Col xs={6}>March 13 2023</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Contact Number:</Col>
                    <Col xs={6}>09786728371</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Date Registered:</Col>
                    <Col xs={6}>April 14 2023</Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Gender:</Col>
                    <Col xs={6}>Female</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>DVMF Location:</Col>
                    <Col xs={6}>DVMF Toledo</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Owned Pets:</Col>
                    <Col xs={6}>3</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Email Address:</Col>
                    <Col xs={6}>gennie@email.com</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          
        </div>
        
      </div>
    </div>
  
  )
}

export default LguPetSellerProfile