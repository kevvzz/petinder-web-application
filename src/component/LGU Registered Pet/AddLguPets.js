import React, { useState } from 'react';
import {Modal, Row, Col, Form, Container, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
function AddLguPets(props) {
  const [formData, setFormData] = useState({
    petOwner: '',
    petName: '',
    species: '',
    gender: '',
    color: '',
    neutring: '',
    breed: '',
    status: '',
    profilePicture: null,
  });
  return (
    <div> 
       <Modal show={props.showmodal1} onHide={props.hidemodal1} centered className='modal-lg'>
          <Modal.Header className='headerBG' closeButton>
            <Modal.Title>ADD PETS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Pet Owner<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                          type="text" 
                          name="petOwner"
                          id="petOwner"
                          className="form-control mb-2"
                          value={formData.petOwner}
                          onChange={(e) => setFormData({ ...formData, petOwner: e.target.value })}
                      />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Pet Name<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petName"
                        id="petName"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      />
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Species<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petSpecies"
                        id="petSpecies"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petSpecies: e.target.value })}
                      />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Gender<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petGender"
                        id="petGender"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petGender: e.target.value })}
                      />
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Color<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petColor"
                        id="petColor"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petColor: e.target.value })}
                      />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Neutring<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petNuetring"
                        id="petNuetring"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petNuetring: e.target.value })}
                      />
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Breed<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petBreed"
                        id="petBreed"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                      />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="h6" htmlFor="name">Status<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="petStatus"
                        id="petStatus"
                        className="form-control mb-2"
                        value={formData.petOwner}
                        onChange={(e) => setFormData({ ...formData, petStatus: e.target.value })}
                      />
                  </InputGroup>
                </Col>
            </Row>
            <Row>
              <Form.Label className="h6" htmlFor="notes">Profile Picture</Form.Label>
              <InputGroup className="mb-3">
                  <Form.Control
                      type="file"
                      aria-label="file_name" 
                      aria-describedby="file_name" 
                      placeholder=""
                      name="file_name" 
                      id='file_name' 
                      // onChange={(e) => handle(e)}
                  />
              </InputGroup>
            </Row>
           
            <div className='d-flex justify-content-end me-2 mt-4 button-wrapper'>
              {/* <button variant="secondary" onClick={props.hidemodal1}>
                Close
              </button> */}
              <button variant="primary">
                Save Changes
              </button>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default AddLguPets