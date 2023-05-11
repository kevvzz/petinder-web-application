import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { ToastContainer,toast } from 'react-toastify';

function AddLguPets(props) {
  const userData = JSON.parse(localStorage.getItem('lguData'));
  
  const ownerTarget = useRef(null);
  const [ownerShowTooltip, setOwnerShowTooltip] = useState(false);
  const nameTarget = useRef(null);
  const [nameShowTooltip, setNameShowTooltip] = useState(false);
  const speciesTarget = useRef(null);
  const [speciesShowTooltip, setSpeciesShowTooltip] = useState(false);
  const genderTarget = useRef(null);
  const [genderShowTooltip, setGenderShowTooltip] = useState(false);
  const colorTarget = useRef(null);
  const [colorShowTooltip, setColorShowTooltip] = useState(false);
  const ageTarget = useRef(null);
  const [ageShowTooltip, setAgeShowTooltip] = useState(false);
  const neutringTarget = useRef(null);
  const [neutringShowTooltip, setNeutringShowTooltip] = useState(false);
  const breedTarget = useRef(null);
  const [breedShowTooltip, setBreedShowTooltip] = useState(false);
  const statusTarget = useRef(null);
  const [statusShowTooltip, setStatusShowTooltip] = useState(false);
  const profileTarget = useRef(null);
  const [profileShowTooltip, setProfileShowTooltip] = useState(false);
  const typeTarget = useRef(null);
  const [typeShowTooltip, setTypeShowTooltip] = useState(false);

  const [profileCollection, setProfileCollection] = useState("PetLovers_Profile");
  const [selectedFile, setSelectedFile] = useState(null);
  const [owner, setOwner] = useState([]);
  const currentDate = new Date();
  const timestamp = firebase.firestore.Timestamp.fromDate(currentDate);

  const [petData, setPetData] = useState({
    id: Math.floor(10000000 + Math.random() * 90000000),
    petOwner: '',
    petName: '',
    petSpecies: '',
    petGender: '',
    petColor: '',
    petAge: '',
    petNeutering: '',
    petBreed: '',
    petStatus: '',
    petType: ''
  });

  useEffect(() => {

    if (petData.petStatus === "Adoption" || petData.petStatus === "Sale") {
      setProfileCollection("PetSellerorAdoption_Profile");
    }

    if (petData.petStatus === "Owned") {
      setProfileCollection("PetLovers_Profile");
    }
    const owner = db.collection(profileCollection);
    owner.get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOwner(documents);
      });

  }, [petData.petStatus, profileCollection]);

  function handleFileSelect(event) {
    setSelectedFile(event.target.files[0]);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSaveChanges = () => {
    if (petData.petOwner === "") {
      setOwnerShowTooltip(true);
    } else {
      setOwnerShowTooltip(false);
    }
    if (petData.petName === "") {
      setNameShowTooltip(true);
    } else {
      setNameShowTooltip(false);
    }

    if (petData.petSpecies === "") {
      setSpeciesShowTooltip(true);
    } else {
      setSpeciesShowTooltip(false);
    }

    if (petData.petGender === "") {
      setGenderShowTooltip(true);
    } else {
      setGenderShowTooltip(false);
    }

    if (petData.petColor === "") {
      setColorShowTooltip(true);
    } else {
      setColorShowTooltip(false);
    }

    if (petData.petAge === "") {
      setAgeShowTooltip(true);
    } else {
      setAgeShowTooltip(false);
    }

    if (petData.petNeutering === "") {
      setNeutringShowTooltip(true);
    } else {
      setNeutringShowTooltip(false);
    }

    if (petData.petStatus === "") {
      setStatusShowTooltip(true);
    } else {
      setStatusShowTooltip(false);
    }

    if (petData.petBreed === "") {
      setBreedShowTooltip(true);
    } else {
      setBreedShowTooltip(false);
    }

    if (petData.petType === "") {
      setTypeShowTooltip(true);
    } else {
      setTypeShowTooltip(false);
    }

    if (selectedFile === null) {
      setProfileShowTooltip(true);
    } else {
      setProfileShowTooltip(false);
    }



    if ((petData.petOwner !== "" && petData.petOwner !== null) &&
      (petData.petName !== "" && petData.petName !== null) &&
      (petData.petSpecies !== "" && petData.petSpecies !== null) &&
      (petData.petGender !== "" && petData.petGender !== null) &&
      (petData.petColor !== "" && petData.petColor !== null) &&
      (petData.petAge !== "" && petData.petAge !== null) &&
      (petData.petNeutering !== "" && petData.petNeutering !== null) &&
      (petData.petStatus !== "" && petData.petStatus !== null) &&
      (petData.petType !== "" && petData.petType !== null) &&
      (selectedFile !== null) &&
      (petData.petBreed !== "" && petData.petBreed !== null)) {

      const storageRef = storage.ref();
      const fileRef = storageRef.child(`Pet/${petData.id.toString()}`);
      fileRef.put(selectedFile).then(() => {
        console.log('File uploaded successfully');
      });
      
      if (petData.petStatus === "Owned") {
        const docRef = db.collection("PetLovers_Profile").doc(petData.petOwner);
        docRef.update({PL_OwnedPets: firebase.firestore.FieldValue.arrayUnion(petData.id.toString())});
      }

      if (petData.petStatus === "Sale" || petData.petStatus === "Adoption") {
        const docRef = db.collection("PetSellerorAdoption_Profile").doc(petData.petOwner);
        docRef.update({PSA_OwnedPets: firebase.firestore.FieldValue.arrayUnion(petData.id.toString())});
      }
      
      // Save the pet data to Firestore
      db.collection("Pets_Profile")
        .doc(petData.id.toString())
        .set({
          P_IDNumber: petData.id.toString(),
          P_PetOwner: petData.petOwner,
          P_Name: petData.petName,
          P_Species: petData.petSpecies,
          P_Gender: petData.petGender,
          P_Color: petData.petColor,
          P_Age: petData.petAge,
          P_Neutering: petData.petNeutering,
          P_Breed: petData.petBreed,
          P_Status: petData.petStatus,
          P_DateRegistered: timestamp,
          P_NumberofLikes: 0,
          P_RegisterType: petData.petType,
          P_LGUAccount: userData.LGU_UserName,
          P_RegisteredLocation: userData.LGU_BranchName
        })
        .then(() => {
          toast.success("Pet Profile Added Successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
          props.hidemodal1();
          console.log("success");
        })
        .catch((error) => {
          toast.error("Error adding pet to Firestore: ");
          console.log(error)
        });
    }


  };
  return (
    <div>
    <ToastContainer/>
      <Modal show={props.showmodal1} onHide={props.hidemodal1} centered className='modal-lg'>
        <Modal.Header className='headerBG' closeButton>
          <Modal.Title>ADD PETS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label ref={statusTarget} className="h6" htmlFor="name">Status<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petStatus"
                  id="petStatus"
                  value={petData.petStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Adoption">For Adoption</option>
                  <option value="Sale">For Sale</option>
                  <option value="Owned">For Ownership</option>
                </Form.Select>
                <Overlay target={statusTarget.current} show={statusShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label ref={ownerTarget} className="h6" htmlFor="name">Pet Owner<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petOwner"
                  id="petOwner"
                  value={petData.petOwner}
                  onChange={handleInputChange}
                >
                  <option value="">Select Owner</option>
                  {owner.map((doc) => (
                    <option key={doc.id} value={petData.petStatus === "Owned" ? doc.PL_UserEmail : doc.PSA_UserEmail}>
                      {petData.petStatus === "Owned" ? `${doc.PL_FirstName} ${doc.PL_LastName}` : `${doc.PSA_FirstName} ${doc.PSA_LastName}`}
                    </option>
                  ))}
                </Form.Select>
                <Overlay target={ownerTarget.current} show={ownerShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet owner
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label ref={nameTarget} className="h6" htmlFor="name">Pet Name<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  name="petName"
                  id="petName"
                  className="form-control mb-2"
                  value={petData.petName}
                  onChange={handleInputChange}
                />
                <Overlay target={nameTarget.current} show={nameShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label ref={genderTarget} className="h6" htmlFor="name">Gender<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petGender"
                  id="petGender"
                  value={petData.petGender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                <Overlay target={genderTarget.current} show={genderShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Gender
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label ref={speciesTarget} className="h6" htmlFor="name">Species<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petSpecies"
                  id="petSpecies"
                  value={petData.petSpecies}
                  onChange={handleInputChange}
                >
                  <option value="">Select Species</option>
                  <option value="Feline">Feline (Cat)</option>
                  <option value="Canine">Canine (Dog)</option>
                </Form.Select>
                <Overlay target={speciesTarget.current} show={speciesShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Species
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label ref={neutringTarget} className="h6" htmlFor="name">Is Pet already Neutered or Castrated?<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petNeutering"
                  id="petNeutering"
                  value={petData.petNeutering}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Neutered">Yes</option>
                  <option value="Not Neutered">No</option>
                </Form.Select>
                <Overlay target={neutringTarget.current} show={neutringShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Species
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label ref={breedTarget} className="h6" htmlFor="name">Breed<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  name="petBreed"
                  id="petBreed"
                  className="form-control mb-2"
                  value={petData.petBreed}
                  onChange={handleInputChange}
                />
                <Overlay target={breedTarget.current} show={breedShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Breed
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label ref={colorTarget} className="h6" htmlFor="name">Color<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  name="petColor"
                  id="petColor"
                  className="form-control mb-2"
                  value={petData.petColor}
                  onChange={handleInputChange}
                />
                <Overlay target={colorTarget.current} show={colorShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Color
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label ref={typeTarget} className="h6" htmlFor="name">Register Type<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label="Default select example"
                  name="petType"
                  id="petType"
                  value={petData.petType}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Perpetual">Perpetual</option>
                  <option value="Annual">Annual</option>
                </Form.Select>
                <Overlay target={typeTarget.current} show={typeShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Register Type
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label ref={ageTarget} className="h6" htmlFor="name">Age<span className='red'> *</span></Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="number"
                  name="petAge"
                  id="petAge"
                  placeholder=""
                  className="form-control mb-2"
                  value={petData.petAge}
                  onChange={handleInputChange}
                />
                <Overlay target={ageTarget.current} show={ageShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label ref={profileTarget} className="h6" htmlFor="notes">Profile Picture</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="file"
                  aria-label="file_name"
                  aria-describedby="file_name"
                  placeholder=""
                  accept="image/*"
                  onChange={handleFileSelect}
                  name="profile"
                  id='profile'
                />
                <Overlay target={profileTarget.current} show={profileShowTooltip} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty profile
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup>
            </Col>
          </Row>

          <div className='d-flex justify-content-end me-2 mt-4 button-wrapper'>
            <button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddLguPets