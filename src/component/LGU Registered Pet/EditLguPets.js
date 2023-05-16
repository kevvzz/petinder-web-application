import React, { useState,useRef,useEffect } from 'react';
import {Modal, Row, Col, Form, InputGroup, Figure } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { ToastContainer,toast } from 'react-toastify';

function EditLguPets(props) {
    const editPetProfile = props.editPetProfile;
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUpload, setImageUpload] = useState('');
    const [owner, setOwner] = useState([]);
    const [lguAccount, setLguAccount] = useState([]);
  
  
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
    const profileTarget = useRef(null);
    const [profileShowTooltip, setProfileShowTooltip] = useState(false);
    const lguTarget = useRef(null);
    const [lguShowTooltip, setLguShowTooltip] = useState(false);
    const typeTarget = useRef(null);
    const [typeShowTooltip, setTypeShowTooltip] = useState(false);
    const registerTarget = useRef(null);
    const [registerShowTooltip, setRegisterShowTooltip] = useState(false);
  
    useEffect(() => {
      let profileCollection = "";
      if (editPetProfile.status === "Adoption" || editPetProfile.status === "Sale") {
        profileCollection = "PetSellerorAdoption_Profile";
      } else if (editPetProfile.status === "Owned") {
        profileCollection = "PetLovers_Profile";
      }
    
      if (profileCollection) {
        const owner = db.collection(profileCollection);
        const lguAccount = db.collection("LGU_Profile");
    
        owner.get().then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setOwner(documents);
        });
        lguAccount.get().then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setLguAccount(documents);
        });
      }
    }, [editPetProfile]);
    
    function handleEdit(e) {
      let editedPetProfile = { ...editPetProfile };
      editedPetProfile[e.target.id] = e.target.value;
      props.setEditPetProfile(editedPetProfile);
    }

    const uploadImage = async (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      const base64 = await convertBase64(file);
      setImageUpload(base64);
    };
  
    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    const handleSaveChanges = () => {
  
      if(editPetProfile.name === "" || editPetProfile.name === null){
        setNameShowTooltip(true);
      }else{
        setNameShowTooltip(false);
      }
  
      if(editPetProfile.species === "" || editPetProfile.species === null){
        setSpeciesShowTooltip(true);
      }else{
        setSpeciesShowTooltip(false);
      }
  
      if(editPetProfile.gender === "" || editPetProfile.gender === null){
        setGenderShowTooltip(true);
      }else{
        setGenderShowTooltip(false);
      }
  
      if(editPetProfile.color === "" || editPetProfile.color === null){
        setColorShowTooltip(true);
      }else{
        setColorShowTooltip(false);
      }
  
      if(editPetProfile.age === "" || editPetProfile.age === null){
        setAgeShowTooltip(true);
      }else{
        setAgeShowTooltip(false);
      }
  
      if(editPetProfile.neutering === "" || editPetProfile.neutering === null){
        setNeutringShowTooltip(true);
      }else{
        setNeutringShowTooltip(false);
      }
     
      if(editPetProfile.breed === "" || editPetProfile.breed === null){
        setBreedShowTooltip(true);
      }else{
        setBreedShowTooltip(false);
      }
  
      if(editPetProfile.lguAccount === "" || editPetProfile.lguAccount === null){
        setLguShowTooltip(true);
      }else{
        setLguShowTooltip(false);
      }
  
      if(editPetProfile.registerType === "" || editPetProfile.registerType === null){
        setTypeShowTooltip(true);
      }else{
        setTypeShowTooltip(false);
      }
  
      if(editPetProfile.registerLocation === "" || editPetProfile.registerLocation === null){
        setRegisterShowTooltip(true);
      }else{
        setRegisterShowTooltip(false);
      }
  
  
      
      
      if((editPetProfile.name !== "" && editPetProfile.name !== null) && 
      (editPetProfile.species !== "" && editPetProfile.species !== null) &&
      (editPetProfile.gender !== "" && editPetProfile.gender !== null) &&
      (editPetProfile.color !== "" && editPetProfile.color !== null) &&
      (editPetProfile.age !== "" && editPetProfile.age !== null) &&
      (editPetProfile.neutering !== "" && editPetProfile.neutering !== null) &&
      (editPetProfile.lguAccount !== "" && editPetProfile.lguAccount !== null) &&
      (editPetProfile.registerType !== "" && editPetProfile.registerType !== null) &&
      (editPetProfile.registerLocation !== "" && editPetProfile.registerLocation !== null) &&
      (editPetProfile.breed !== "" && editPetProfile.breed !== null)){
      
          // Update the pet data to Firestore
          db.collection("Pets_Profile")
          .doc(editPetProfile.id)
          .update({
            // P_PetOwner: editPetProfile.owner,
            P_Name: editPetProfile.name,
            P_Species: editPetProfile.species,
            P_Gender: editPetProfile.gender,
            P_Color: editPetProfile.color ,
            P_Age: editPetProfile.age,
            P_Neutering: editPetProfile.neutering,
            P_Breed: editPetProfile.breed,
            // P_Status: editPetProfile.status,
            P_RegisterType: editPetProfile.registerType,
            P_LGUAccount: editPetProfile.lguAccount,
            P_RegisteredLocation: editPetProfile.registerLocation
          })
          .then(() => {
            toast.success("Pet Profile Added Successfully!");
            props.hidemodal1();
            console.log("success");
          })
          .catch((error) => {
            toast.error("Error adding pet to Firestore: ");
            console.log(error)
          });
       
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`Pet/${editPetProfile.id}`);
          if(selectedFile !== null){
            fileRef.put(selectedFile).then(() => {
              console.log('File uploaded successfully');
              setTimeout(() => {
                window.location.reload();
              }, 1000); 
            });
          }
      }
    
    };
    return (
      <div>
          <ToastContainer/> 
         <Modal show={props.showmodal1} onHide={props.hidemodal1} centered className='modal-lg' backdrop="static">
            <Modal.Header className='headerBG' closeButton>
              <Modal.Title>UPDATE PETS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {/* <Col>
                    <Form.Label ref={statusTarget} className="h6">Status<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example" 
                        name="status" 
                        id="status" 
                        defaultValue={props.editPetProfile?props.editPetProfile.status:""} 
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={ownerTarget} className="h6">Pet Owner<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example"
                        name="owner" 
                        id="owner" 
                        defaultValue={props.editPetProfile?props.editPetProfile.owner:""} 
                        onChange={(e) => handleEdit(e)}
                        disabled={!props.editPetProfile.status}
                      >
                        <option value="">Select Owner</option>
                        {owner.map((doc) => (
                          <option key={doc.id} value={props.editPetProfile.status === "Owned" ? doc.PL_UserEmail : doc.PSA_UserEmail}>
                            {props.editPetProfile.status === "Owned" ? `${doc.PL_FirstName} ${doc.PL_LastName}` : `${doc.PSA_FirstName} ${doc.PSA_LastName}`}
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
                  </Col> */}
              </Row>
              <Row>
                  <Col>
                    <Form.Label ref={nameTarget} className="h6">Pet Name<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="name"
                        id="name"
                        className="form-control mb-2"
                        value={props.editPetProfile?props.editPetProfile.name:""}
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={genderTarget} className="h6">Gender<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example" 
                        name="gender" 
                        id="gender" 
                        defaultValue={props.editPetProfile?props.editPetProfile.gender:""} 
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={speciesTarget} className="h6">Species<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example" 
                        name="species" 
                        id="species" 
                        defaultValue={props.editPetProfile?props.editPetProfile.species:""} 
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={neutringTarget} className="h6">Is Pet already Neutered or Castrated?<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example" 
                        name="neutering" 
                        id="neutering" 
                        defaultValue={props.editPetProfile?props.editPetProfile.neutering:""} 
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={breedTarget} className="h6">Breed<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="breed"
                        id="breed"
                        className="form-control mb-2"
                        defaultValue={props.editPetProfile?props.editPetProfile.breed:""}
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={colorTarget} className="h6">Color<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type="text" 
                        name="color"
                        id="color"
                        className="form-control mb-2"
                        defaultValue={props.editPetProfile?props.editPetProfile.color:""}
                        onChange={(e) => handleEdit(e)}
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
                    <Form.Label ref={ageTarget} className="h6">Age<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type="number" 
                        name="age"
                        id="age"
                        placeholder=""
                        className="form-control mb-2"
                        defaultValue={props.editPetProfile?props.editPetProfile.age:""}
                        onChange={(e) => handleEdit(e)}
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
                  <Col>
                    <Form.Label ref={typeTarget} className="h6">Register Type<span className='red'> *</span></Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Select 
                        aria-label="Default select example" 
                        name="registerType" 
                        id="registerType" 
                        defaultValue={props.editPetProfile?props.editPetProfile.registerType:""} 
                        onChange={(e) => handleEdit(e)}
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
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Form.Label
                      className='h6'
                    >Upload Image<span className='red' ref={profileTarget}> *</span></Form.Label>
                    <Form.Control
                      type="file"
                      name='profilePicture'
                      id='profilePicture'
                      className='mb-2'
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                    <Overlay
                      target={profileTarget.current}
                      show={profileShowTooltip}
                      placement="right"
                    >
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          Empty Profile Picture
                        </Tooltip>
                      )}
                    </Overlay>
                  </Row>
                {imageUpload !== '' && (
                  <>
                    <Row>
                      <Col>
                        <Figure className='borderLine center'>
                          <Figure.Image
                            width={200}
                            height={200}
                            src={imageUpload}
                          />
                        </Figure>
                      </Col>
                    </Row>
                  </>
                )}
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

export default EditLguPets