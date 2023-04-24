import React, { useState,useEffect } from 'react'
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
import { Table, thead, tbody, tr, th, td } from 'react-bootstrap';
import picture from '../../Assets/bingo.jpg'
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';

function LguPetProfile() {
    const location = useLocation();
    console.log(location.state);
    const data = location.state.doc;
  return (
    <div className='main-bg'>
      <LguNavbar/>
      <div className="main-content">
        <header>
            <h1>
                LGU Pet Profile
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
                  <Row><Col className='center'><div className='petId'>{data.id}</div></Col></Row>
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
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>ADD VACCINE</button></Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>PET OWNER:</Col>
                    <Col xs={6}>{data.owner}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>AGE:</Col>
                    <Col xs={6}>{data.age}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>BREED:</Col>
                    <Col xs={6}>{data.breed}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>COLOR:</Col>
                    <Col xs={6}>{data.color}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>REGISTER TYPE:</Col>
                    <Col xs={6}>{data.registerType}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>REGISTERED LOCATION:</Col>
                    <Col xs={6}>{data.registerLocation}</Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>SPECIES:</Col>
                    <Col xs={6}>{data.species}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>GENDER:</Col>
                    <Col xs={6}>{data.gender}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>STATUS:</Col>
                    <Col xs={6}>{data.status}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>NEUTERING:</Col>
                    <Col xs={6}>{data.neutering}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>LGU ACCOUNT:</Col>
                    <Col xs={6}>{data.lguAccount}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>DATE REGISTERED:</Col>
                    <Col xs={6}>march</Col>
                  </Row>
                </Col>
              </Row>
              <div className='vaccine'>Vaccine Information</div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date of Vaccine</th>
                    <th>Weight</th>
                    <th>Type of Vaccine</th>
                    <th>Manufacturer</th>
                    <th>Lot No./ Batch No.</th>
                    <th>Date of Next Vaccination</th>
                    <th>VET Name and PRC Np.</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.username}</td>
                    </tr>
                  ))} */}
                  <tr>
                    <td>March 21 2023</td>
                    <td>12 kl</td>
                    <td>Anti Rabies</td>
                    <td>China</td>
                    <td>No 145</td>
                    <td>April 21 2023</td>
                    <td>Ms Vet Yu</td>
                  </tr>
                </tbody>
              </Table>
              {/* <Row className='borderLine center p-0 m-0'>
                <Col>
                  <Row className='rightline'>Date of Vaccine</Row>
                </Col>
                <Col className='rightline'>Weight</Col>
                <Col className='rightline'>Type of Vaccine</Col>
                <Col className='rightline'>Manufacturer</Col>
                <Col className='rightline'>Lot No./ Batch No.</Col>
                <Col className='rightline'>Date of Next Vaccination</Col>
                <Col>VET Name and PRC Np.</Col>
              </Row>
              <Row className='borderLine none center p-0 m-0'>
                <Col className='rightline'>March 21 2023</Col>
                <Col className='rightline'>15klasdasdasd</Col>
                <Col className='rightline'>Anti Rabies asdasd </Col>
                <Col className='rightline'>Manufacturer asd asdads</Col>
                <Col className='rightline'>No 1452 asd asd </Col>
                <Col className='rightline'>April 21 2023</Col>
                <Col>Dr Vet yan</Col>
              </Row> */}
            </Col>
          </Row>
          
        </div>
        
      </div>
    </div>
  )
}

export default LguPetProfile