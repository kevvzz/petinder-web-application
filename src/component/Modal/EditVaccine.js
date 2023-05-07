import React, { useState,useRef,useEffect } from 'react';
import {Modal, Row, Col, Form, InputGroup, Table } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';

//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';


import {ToastContainer, toast } from 'react-toastify';

function EditVaccine(props) {
    const dateTarget = useRef(null);
    const [dateShowTooltip, setDateShowTooltip] = useState(false);
    const weightTarget = useRef(null);
    const [weightShowTooltip, setWeightShowTooltip] = useState(false);
    const typeTarget = useRef(null);
    const [typeShowTooltip, setTypeShowTooltip] = useState(false);
    const manufacturerTarget = useRef(null);
    const [manufacturerShowTooltip, setManufacturerShowTooltip] = useState(false);
    const batchTarget = useRef(null);
    const [batchShowTooltip, setBatchShowTooltip] = useState(false);
    const nextTarget = useRef(null);
    const [nextShowTooltip, setNextShowTooltip] = useState(false);
    const vetNameTarget = useRef(null);
    const [vetNameShowTooltip, setVetNameShowTooltip] = useState(false);

    const editPetProfile = props.editPetProfile;
    const vaccineId = props.vaccineId;
    const vaccineInfo = props.vaccineInfo;
   
    function handle(e) {
      let vaccineInformation = { ...vaccineInfo };
      vaccineInformation[e.target.id][vaccineId] = e.target.value;
      props.setVaccineInfo(vaccineInformation);
  }
  const handleEditVaccine = () =>{
    if(vaccineInfo.date[vaccineId] === ""){
      setDateShowTooltip(true);
    }else{
      setDateShowTooltip(false);
    }

    if(vaccineInfo.weight[vaccineId] === ""){
      setWeightShowTooltip(true);
    }else{
      setWeightShowTooltip(false);
    }

    if(vaccineInfo.type[vaccineId] === ""){
      setTypeShowTooltip(true);
    }else{
      setTypeShowTooltip(false);
    }

    if(vaccineInfo.manufacturer[vaccineId] === ""){
      setManufacturerShowTooltip(true);
    }else{
      setManufacturerShowTooltip(false);
    }

    if(vaccineInfo.batchNumber[vaccineId] === ""){
      setBatchShowTooltip(true);
    }else{
      setBatchShowTooltip(false);
    }

    if(vaccineInfo.nextDate[vaccineId] === ""){
      setNextShowTooltip(true);
    }else{
      setNextShowTooltip(false);
    }

    if(vaccineInfo.vetName[vaccineId] === ""){
      setVetNameShowTooltip(true);
    }else{
      setVetNameShowTooltip(false);
    }

    if((vaccineInfo.date[vaccineId] !== "" && vaccineInfo.date[vaccineId] !== null) && 
    (vaccineInfo.weight[vaccineId] !== "" && vaccineInfo.weight[vaccineId] !== null) && 
    (vaccineInfo.type[vaccineId] !== "" && vaccineInfo.type[vaccineId] !== null) &&
    (vaccineInfo.manufacturer[vaccineId] !== "" && vaccineInfo.manufacturer[vaccineId] !== null) &&
    (vaccineInfo.batchNumber[vaccineId] !== "" && vaccineInfo.batchNumber[vaccineId] !== null) &&
    (vaccineInfo.nextDate[vaccineId] !== "" && vaccineInfo.nextDate[vaccineId] !== null) &&
    (vaccineInfo.vetName[vaccineId] !== "" && vaccineInfo.vetName[vaccineId] !== null)) {
        // Get the document reference
        const docRef = db.collection("P_Vaccination_File").doc(editPetProfile.id);
        docRef.get().then((doc) => {
            const data = doc.data();
            const V_BatchNumber = data.V_BatchNumber || [];
            const V_Date = data.V_Date || [];
            const V_Manufacturer = data.V_Manufacturer || [];
            const V_NextVaccinationDate = data.V_NextVaccinationDate || [];
            const V_TypeofVacine = data.V_TypeofVacine || [];
            const V_VeterinarianName = data.V_VeterinarianName || [];
            const V_Weight = data.V_Weight || [];

            V_BatchNumber[vaccineId] = vaccineInfo.batchNumber[vaccineId];
            V_Date[vaccineId] = vaccineInfo.date[vaccineId];
            V_Manufacturer[vaccineId] = vaccineInfo.manufacturer[vaccineId];
            V_NextVaccinationDate[vaccineId] = vaccineInfo.nextDate[vaccineId];
            V_TypeofVacine[vaccineId] = vaccineInfo.type[vaccineId];
            V_VeterinarianName[vaccineId] = vaccineInfo.vetName[vaccineId];
            V_Weight[vaccineId] = vaccineInfo.weight[vaccineId];
          
            docRef.update({
              V_BatchNumber,
              V_Date,
              V_Manufacturer,
              V_NextVaccinationDate,
              V_TypeofVacine,
              V_VeterinarianName,
              V_Weight
        }).then(() => {
          toast.success("Pet Vaccine Updated Succesfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000); 
          props.hidemodal1();
        })
        .catch((error) => {
          toast.error("Error updating Vaccine to Firestore: ");
          console.log(error)
        });     
      }) 
        
    }  
  }
  
    
  return (
    <div>
    <ToastContainer/>
        <Modal show={props.showmodal1} onHide={props.hidemodal1} centered className='modal-lg'>
          <Modal.Header className='headerBG' closeButton>
            <Modal.Title>EDIT VACCINE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                  <Form.Label ref={dateTarget} className="h6" htmlFor="name">Date of Vaccine<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="date" 
                      name="date"
                      id="date"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.date[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={dateTarget.current} show={dateShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Date of Vaccine
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label ref={weightTarget} className="h6" htmlFor="name">Weight<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="weight" 
                        id="weight"
                        className="form-control mb-2" 
                        defaultValue={vaccineId?vaccineInfo.weight[vaccineId]:""} 
                        onChange={(e) => handle(e)}
                      />
                    <Overlay target={weightTarget.current} show={weightShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Weight
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label ref={typeTarget} className="h6" htmlFor="name">Type of Vaccine<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="text" 
                      name="type"
                      id="type"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.type[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={typeTarget.current} show={typeShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Type of Vaccine
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label ref={manufacturerTarget} className="h6" htmlFor="name">Manufacturer<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="text" 
                      name="manufacturer"
                      id="manufacturer"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.manufacturer[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={manufacturerTarget.current} show={manufacturerShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Manufacturer
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label ref={batchTarget} className="h6" htmlFor="name">Lot No. / Batch No.<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="text" 
                      name="batchNumber"
                      id="batchNumber"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.batchNumber[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={batchTarget.current} show={batchShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Lot / Batch Number
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label ref={nextTarget} className="h6" htmlFor="name">Date of Next Vaccination<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="date" 
                      name="nextDate"
                      id="nextDate"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.nextDate[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={nextTarget.current} show={nextShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Next Date
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Label ref={vetNameTarget} className="h6" htmlFor="name">Vet Name and PRC No.<span className='red'> *</span></Form.Label>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type="text" 
                      name="vetName"
                      id="vetName"
                      className="form-control mb-2"
                      defaultValue={vaccineId?vaccineInfo.vetName[vaccineId]:""}
                      onChange={(e) => handle(e)}
                    />
                    <Overlay target={vetNameTarget.current} show={vetNameShowTooltip} placement="right">
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Pet Breed
                        </Tooltip>
                      )}
                    </Overlay>
                  </InputGroup>
                </Col>
            </Row>
           
            <div className='d-flex justify-content-end me-2 mt-4 button-wrapper'>
              <button variant="primary" onClick={handleEditVaccine}>
                Save Changes
              </button>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default EditVaccine