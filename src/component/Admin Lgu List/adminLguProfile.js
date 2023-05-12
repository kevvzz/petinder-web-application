import React, { useState,useEffect } from 'react'
import {AdminNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'

//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import DeleteModal from '../Modal/DeleteModal';
import EditAdminLgu from './EditAdminLgu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
import { toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';
function AdminLguProfile() {
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state.doc;
    console.log(data);

    const [lguProfile, setLguProfile] = useState({
      user: '',
      branch: '',
      address:'',
      contact: '',
      dateRegister: '',
      email: ''
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    
    function onClickEditOwner() {
        setShowAddModal(true);
    }
    function onClickDeletePet() {
      setShowDeleteModal(true);
    }

    useEffect(() => {
      const docRef = db.collection("LGU_Profile").doc(data.user);
      docRef.get()
        .then((doc) => {
          console.log(doc);
          if (doc.exists) {
            const lgu = doc.data()
            const { LGU_UserName,
              LGU_BranchName,
              LGU_Address,
              LGU_ContactNumber,
              LGU_DateRegistered,
              LGU_Email} = lgu;
  
            setLguProfile({ 
              user: LGU_UserName,
              branch: LGU_BranchName,
              address:LGU_Address,
              contact: LGU_ContactNumber,
              dateRegister: LGU_DateRegistered,
              email: LGU_Email
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, []);

    function handleRemove(e) {
      // Delete the document from Firestore
      db.collection('LGU_Profile')
      .doc(data.user)
      .delete()
  
      // Delete the image from Storage
      const photoRef = storage.ref().child(`LGU_DVMF/${data.user}`);
      photoRef.delete()
      .then(() => {
        toast.success("LGU Profile Deleted Successfully!");
        setShowDeleteModal(false);
        setTimeout(() => {
          navigate("/admin-lgu-list");
        }, 1000); 
      })
      .catch((error) => {
        toast.error("Error deleting pet to Firestore: ");
        console.log(error)
      });
    }
    
    const register = new Date(lguProfile.dateRegister.seconds * 1000 + lguProfile.dateRegister.nanoseconds / 1000000);
    const registerString = register.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
  return (
    <div className='main-bg'>
      <AdminNavbar/>
      <div className="main-content">
        <header>
            <h1>
                Admin LGU Profile
            </h1>
        </header>
        <div className='container paddingBottom'>
          <Row>
            <Col>
              <Row className='orange'>
                <Col xs="auto"></Col>
                  <img className='picture' src={data.url} alt="picture"/>
                <Col>
                  <Row><Col className='center'><div className='petName'>{lguProfile.user}</div></Col></Row>
                </Col>
              </Row>
              <Row>
                <Col className='marginTop' xs={3}>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" onClick={onClickEditOwner} className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>UPDATE</button></Col>
                  </Row>
                  <Row className="button-wrapper">
                    <Col className='center'><button type="button" onClick={onClickDeletePet} className="add"><FontAwesomeIcon icon={faFileCirclePlus}/><span> </span>DELETE</button></Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Address:</Col>
                    <Col xs={6}>{lguProfile.address}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Branch Name:</Col>
                    <Col xs={6}>{lguProfile.branch}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Contact Number:</Col>
                    <Col xs={6}>{lguProfile.contact}</Col>
                  </Row>
                </Col>
                <Col className='mt-4'>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Email Address:</Col>
                    <Col xs={6}>{lguProfile.email}</Col>
                  </Row>
                  <Row className="button-wrapper mb-2">
                    <Col className='bold' xs={4}>Date Registered:</Col>
                    <Col xs={6}>{registerString}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          
        </div>
        <DeleteModal
              name = "LGU PROFILE"
              show = {showDeleteModal}
              hide = {() => setShowDeleteModal(false)}
              remover = {handleRemove}
          />
          <EditAdminLgu
            showmodal = {showAddModal}
            hidemodal = {setShowAddModal}
            showmodalhandler = {onClickEditOwner}
            lguProfile = {lguProfile}
            setLguProfile = {setLguProfile}
        />
        
      </div>
    </div>
  
  )
}

export default AdminLguProfile