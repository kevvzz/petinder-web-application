import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup, Table } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LguNavbar } from '../Navbar/Navbar';


// import { Table, thead, tbody, tr, th, td } from 'react-bootstrap';
import DeleteModal from '../Modal/DeleteModal';
import EditLguPets from '../LGU Registered Pet/EditLguPets';
import EditVaccine from '../Modal/EditVaccine';
import GenerateQRModal from '../Modal/GenerateQRModal';

//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faQrcode } from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function LguPetProfile() {
  const navigate = useNavigate()

  const location = useLocation();
  const data = location.state.doc;
  const [editPetProfile, setEditPetProfile] = useState({
    id: '',
    owner: '',
    name: '',
    species: '',
    gender: '',
    color: '',
    age: '',
    neutering: '',
    breed: '',
    status: '',
    registerType: '',
    lguAccount: '',
    registerLocation: '',
    dateRegister: ''
  });
  console.log(data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showEditVaccineModal, setShowEditVaccineModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [exist, setShowExist] = useState(false);
  const [vaccineInfo, setVaccineInfo] = useState("");
  const [vaccineId, setVaccineId] = useState("");


  function onClickDeletePet() {
    setShowDeleteModal(true);
  }
  function onClickEditPet() {
    setShowEditModal(true);
  }
  function onClickVaccinePet() {
    setShowVaccineModal(true);
  }
  function onClickQrCode() {
    setShowQrModal(true);
  }

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

  const [vaccineData, setVaccineData] = useState({
    idVaccine: Math.floor(10000 + Math.random() * 90000),
    dateVaccine: '',
    weightVaccine: '',
    typeVaccine: '',
    manufacturerVaccine: '',
    batchVaccine: '',
    nextVaccine: '',
    vetNameVaccine: '',
  });
  useEffect(() => {
    const docRef = db.collection("Pets_Profile").doc(data.id);
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const pet = doc.data();
          const { P_Age,
            P_Breed,
            P_Color,
            P_DateRegistered,
            P_Gender,
            P_IDNumber,
            P_LGUAccount,
            P_Name,
            P_Neutering,
            P_PetOwner,
            P_RegisterType,
            P_RegisteredLocation,
            P_Species,
            P_Status } = pet;

          setEditPetProfile({
            id: P_IDNumber,
            owner: P_PetOwner,
            name: P_Name,
            species: P_Species,
            gender: P_Gender,
            color: P_Color,
            age: P_Age,
            neutering: P_Neutering,
            breed: P_Breed,
            status: P_Status,
            registerType: P_RegisterType,
            lguAccount: P_LGUAccount,
            registerLocation: P_RegisteredLocation,
            dateRegister: P_DateRegistered,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  useEffect(() => {
    const vaccine = db.collection("P_Vaccination_File").doc(data.id);
    vaccine.get()
      .then((doc) => {
        if (doc.exists) {
          setShowExist(true);
          const data = doc.data();
          const vBatchNumber = data.V_BatchNumber;
          const vDate = data.V_Date;
          const vManufacturer = data.V_Manufacturer;
          const vNextDate = data.V_NextVaccinationDate;
          const vType = data.V_TypeofVacine;
          const vVetName = data.V_VeterinarianName;
          const vWeight = data.V_Weight;
          setVaccineInfo({
            batchNumber: vBatchNumber,
            date: vDate,
            manufacturer: vManufacturer,
            nextDate: vNextDate,
            type: vType,
            vetName: vVetName,
            weight: vWeight
          });
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [data]);

  function handleRemove(e) {
    // Delete the document from Firestore
    db.collection('Pets_Profile')
      .doc(data.id)
      .delete()

    // Delete the image from Storage
    const photoRef = storage.ref().child(`Pet/${data.id}`);
    photoRef.delete()
      .then(() => {
        toast.success("Pet Profile Deleted Successfully!");
        setShowDeleteModal(false);
        setTimeout(() => {
          navigate("/lgu-register");
        }, 2000);
        console.log("success");
      })
      .catch((error) => {
        toast.error("Error deleting pet to Firestore: ");
        console.log(error)
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVaccineData({ ...vaccineData, [name]: value });
  };

  const handleVaccineSave = () => {

    if (vaccineData.dateVaccine === "") {
      setDateShowTooltip(true);
    } else {
      setDateShowTooltip(false);
    }

    if (vaccineData.weightVaccine === "") {
      setWeightShowTooltip(true);
    } else {
      setWeightShowTooltip(false);
    }

    if (vaccineData.typeVaccine === "") {
      setTypeShowTooltip(true);
    } else {
      setTypeShowTooltip(false);
    }

    if (vaccineData.manufacturerVaccine === "") {
      setManufacturerShowTooltip(true);
    } else {
      setManufacturerShowTooltip(false);
    }

    if (vaccineData.batchVaccine === "") {
      setBatchShowTooltip(true);
    } else {
      setBatchShowTooltip(false);
    }

    if (vaccineData.nextVaccine === "") {
      setNextShowTooltip(true);
    } else {
      setNextShowTooltip(false);
    }

    if (vaccineData.vetNameVaccine === "") {
      setVetNameShowTooltip(true);
    } else {
      setVetNameShowTooltip(false);
    }

    if ((vaccineData.dateVaccine !== "" && vaccineData.dateVaccine !== null) &&
      (vaccineData.weightVaccine !== "" && vaccineData.weightVaccine !== null) &&
      (vaccineData.typeVaccine !== "" && vaccineData.typeVaccine !== null) &&
      (vaccineData.manufacturerVaccine !== "" && vaccineData.manufacturerVaccine !== null) &&
      (vaccineData.batchVaccine !== "" && vaccineData.batchVaccine !== null) &&
      (vaccineData.nextVaccine !== "" && vaccineData.nextVaccine !== null) &&
      (vaccineData.vetNameVaccine !== "" && vaccineData.vetNameVaccine !== null)) {
      const vaccId = data.id;
      console.log(exist);
      // // Save the pet data to Firestore
      if (exist) {
        // Get the document reference
        const docRef = db.collection("P_Vaccination_File").doc(data.id);

        // Get the current document data
        docRef.get().then((doc) => {
          const data = doc.data();
          const V_BatchNumber = data.V_BatchNumber || [];
          const V_Date = data.V_Date || [];
          const V_IDNumber = data.V_IDNumber || [];
          const V_Manufacturer = data.V_Manufacturer || [];
          const V_NextVaccinationDate = data.V_NextVaccinationDate || [];
          const V_TypeofVacine = data.V_TypeofVacine || [];
          const V_VeterinarianName = data.V_VeterinarianName || [];
          const V_Weight = data.V_Weight || [];

          V_BatchNumber.push(vaccineData.batchVaccine);
          V_Date.push(vaccineData.dateVaccine);
          V_IDNumber.push(vaccineData.idVaccine);
          V_Manufacturer.push(vaccineData.manufacturerVaccine);
          V_NextVaccinationDate.push(vaccineData.nextVaccine);
          V_TypeofVacine.push(vaccineData.typeVaccine);
          V_VeterinarianName.push(vaccineData.vetNameVaccine);
          V_Weight.push(vaccineData.weightVaccine);

          docRef.update({
            V_BatchNumber,
            V_Date,
            V_IDNumber,
            V_Manufacturer,
            V_NextVaccinationDate,
            V_TypeofVacine,
            V_VeterinarianName,
            V_Weight
          }).then(() => {
            toast.success("New Pet Vaccine Added Successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setShowExist(true)
            setShowVaccineModal(false)
            console.log("success");
          })
            .catch((error) => {
              toast.error("Error adding Vaccine to Firestore: ");
              console.log(error)
            });
        }

        );
      }else{
        db.collection("P_Vaccination_File")
          .doc(data.id.toString())
          .set({
            P_IDNumber: data.id.toString(),
            V_IDNumber: [vaccineData.idVaccine],
            V_BatchNumber: [vaccineData.batchVaccine],
            V_Date: [vaccineData.dateVaccine],
            V_Manufacturer: [vaccineData.manufacturerVaccine],
            V_NextVaccinationDate: [vaccineData.nextVaccine],
            V_TypeofVacine: [vaccineData.typeVaccine],
            V_VeterinarianName: [vaccineData.vetNameVaccine],
            V_Weight: [vaccineData.weightVaccine],
          })
          .then(() => {
            toast.success("Pet Vaccine Added Successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setShowExist(true)
            setShowVaccineModal(false)
            console.log("success");
          })
          .catch((error) => {
            toast.error("Error adding Vaccine to Firestore: ");
            console.log(error)
          });
      }
    }


  };
  const handleSelectAction = (e) => {
    const { id, value } = e.target;
    if (value === "edit") {
      setShowEditVaccineModal(true)
      setVaccineId(id);
    } else if (value === "delete") {
      deleteVaccine(id);
    }
  }

  function deleteVaccine(index) {
    const docRef = db.collection("P_Vaccination_File").doc(data.id.toString());
    docRef.get().then((doc) => {
      if (doc.exists) {
        const V_BatchNumber = doc.data().V_BatchNumber;
        V_BatchNumber.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_BatchNumber: V_BatchNumber }); // update the document with the modified array

        const V_Date = doc.data().V_Date;
        V_Date.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_Date: V_Date }).then(() => { });// update the document with the modified array

        const V_IDNumber = doc.data().V_IDNumber;
        V_IDNumber.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_IDNumber: V_IDNumber }).then(() => { }); // update the document with the modified array

        const V_Manufacturer = doc.data().V_Manufacturer;
        V_Manufacturer.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_Manufacturer: V_Manufacturer }).then(() => { }); // update the document with the modified array

        const V_NextVaccinationDate = doc.data().V_NextVaccinationDate;
        V_NextVaccinationDate.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_NextVaccinationDate: V_NextVaccinationDate }).then(() => { }); // update the document with the modified array

        const V_VeterinarianName = doc.data().V_VeterinarianName;
        V_VeterinarianName.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_VeterinarianName: V_VeterinarianName }).then(() => { }); // update the document with the modified array

        const V_TypeofVacine = doc.data().V_TypeofVacine;
        V_TypeofVacine.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_TypeofVacine: V_TypeofVacine }).then(() => { }); // update the document with the modified array

        const V_Weight = doc.data().V_Weight;
        V_Weight.splice(index, 1); // remove the element at the specified index
        docRef.update({ V_Weight: V_Weight }).then(() => {
          toast.success("Pet Vaccine Deleted Successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        ); // update the document with the modified array
      } else {
        console.log("No such document!");
      }
    })
      .then(() => {
        console.log("yeahhawww");

      }).catch((error) => {
        console.log("Error getting document:", error);
      });

  }


  const date = new Date(editPetProfile.dateRegister.seconds * 1000 + editPetProfile.dateRegister.nanoseconds / 1000000);
  const dateString = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  // const dateString = editPetProfile.dateRegister.toDate().toLocaleString();
  return (
    <div className='main-bg'>
      <LguNavbar />
      <ToastContainer />
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
                <img className='picture' src={data.url} alt="picture" />
                <Col>
                  <Row><Col className='center'><div className='petName'>{editPetProfile.name}</div></Col></Row>
                  <Row><Col className='center'><div className='petId'>{editPetProfile.id}</div></Col></Row>
                </Col>
              </Row>
              <Row>
                <Col className='marginTop' xs={3}>
                  <Row className="button-wrapper">
                    <Col className='center'><button onClick={onClickEditPet} type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus} /><span> </span>UPDATE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button onClick={onClickDeletePet} type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus} /><span> </span>DELETE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button onClick={onClickVaccinePet} type="button" className="add"><FontAwesomeIcon icon={faFileCirclePlus} /><span> </span>ADD VACCINE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button onClick={onClickQrCode} type="button" className="add"><FontAwesomeIcon icon={faQrcode} /><span> </span>QR CODE</button></Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>PET OWNER:</Col>
                    <Col xs={6}>{editPetProfile.owner}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>AGE:</Col>
                    <Col xs={6}>{editPetProfile.age}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>BREED:</Col>
                    <Col xs={6}>{editPetProfile.breed}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>COLOR:</Col>
                    <Col xs={6}>{editPetProfile.color}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>REGISTER TYPE:</Col>
                    <Col xs={6}>{editPetProfile.registerType}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>REGISTERED LOCATION:</Col>
                    <Col xs={6}>{editPetProfile.registerLocation}</Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>SPECIES:</Col>
                    <Col xs={6}>{editPetProfile.species}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>GENDER:</Col>
                    <Col xs={6}>{editPetProfile.gender}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>STATUS:</Col>
                    <Col xs={6}>{editPetProfile.status}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>NEUTERING:</Col>
                    <Col xs={6}>{editPetProfile.neutering}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>LGU ACCOUNT:</Col>
                    <Col xs={6}>{editPetProfile.lguAccount}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>DATE REGISTERED:</Col>
                    <Col xs={5}>{dateString}</Col>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineInfo && (
                    <>
                      {vaccineInfo.batchNumber.map((batch, index) => (
                        <tr key={index}>
                          <td>{vaccineInfo.date[index]}</td>
                          <td>{vaccineInfo.weight[index]}</td>
                          <td>{vaccineInfo.type[index]}</td>
                          <td>{vaccineInfo.manufacturer[index]}</td>
                          <td>{batch}</td>
                          <td>{vaccineInfo.nextDate[index]}</td>
                          <td>{vaccineInfo.vetName[index]}</td>
                          <select className="dropdown-btn" aria-label="" onChange={handleSelectAction} id={index} value=''>
                            <option selected hidden>Actions</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                          </select>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          <DeleteModal
            name="PET PROFILE"
            show={showDeleteModal}
            hide={() => setShowDeleteModal(false)}
            remover={handleRemove}
          />
          <EditLguPets
            showmodal1={showEditModal}
            hidemodal1={() => setShowEditModal(false)}
            editPetProfile={editPetProfile}
            setEditPetProfile={setEditPetProfile}
          />
          <EditVaccine
            showmodal1={showEditVaccineModal}
            hidemodal1={() => setShowEditVaccineModal(false)}
            editPetProfile={data}
            vaccineId={vaccineId}
            vaccineInfo={vaccineInfo}
            setVaccineInfo={setVaccineInfo}
          />
          <GenerateQRModal
            showmodal = {showQrModal}
            hidemodal = {() => setShowQrModal(false)}
            editPetProfile = {editPetProfile}
            setEditPetProfile={setEditPetProfile}
          />

        </div>

      </div>
      <Modal show={showVaccineModal} onHide={() => setShowVaccineModal(false)} centered className='modal-lg'>
        <Modal.Header className='headerBG' closeButton>
          <Modal.Title>ADD VACCINE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label ref={dateTarget} className="h6" htmlFor="name">Date of Vaccine<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="date"
                  name="dateVaccine"
                  id="dateVaccine"
                  className="form-control mb-2"
                  value={vaccineData.dateVaccine}
                  onChange={handleInputChange}
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
                  name="weightVaccine"
                  id="weightVaccine"
                  className="form-control mb-2"
                  value={vaccineData.weightVaccine}
                  onChange={handleInputChange}
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
                  name="typeVaccine"
                  id="typeVaccine"
                  className="form-control mb-2"
                  value={vaccineData.typeVaccine}
                  onChange={handleInputChange}
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
                  name="manufacturerVaccine"
                  id="manufacturerVaccine"
                  className="form-control mb-2"
                  value={vaccineData.manufacturerVaccine}
                  onChange={handleInputChange}
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
                  name="batchVaccine"
                  id="batchVaccine"
                  className="form-control mb-2"
                  value={vaccineData.batchVaccine}
                  onChange={handleInputChange}
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
                  name="nextVaccine"
                  id="nextVaccine"
                  className="form-control mb-2"
                  value={vaccineData.nextVaccine}
                  onChange={handleInputChange}
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
                  name="vetNameVaccine"
                  id="vetNameVaccine"
                  className="form-control mb-2"
                  value={vaccineData.vetNameVaccine}
                  onChange={handleInputChange}
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
            <button variant="primary" onClick={handleVaccineSave}>
              Save Changes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LguPetProfile