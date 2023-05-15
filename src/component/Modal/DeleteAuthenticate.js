import React, { useState } from 'react'
import { Modal, Row, Col, Container, Form, InputGroup, Button } from 'react-bootstrap'
//CSS
import '../../profile.css';
import '../../App.css';

//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function DeleteAuthenticate(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = props.data
    const handleSignIn = () => {
        // Sign in the user with their email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in successfully');
                // Delete the signed-in user's account
                const currentUser = firebase.auth().currentUser;
                currentUser.delete()
                    .then(() => {
                        console.log('User account deleted successfully');
                    })
                    .catch((error) => {
                        console.error('Error deleting user account:', error);
                    });

                // Delete the document from Firestore
                db.collection(props.collectionName)
                    .doc(data.email)
                    .delete()

                // Delete the image from Storage
                const photoRef = storage.ref().child(`${props.storageName}/${data.email}`);
                photoRef.delete()
                    .then(() => {
                        toast.success("Pet Profile Deleted Successfully!");
                        props.setShowDeleteModal(false);
                        setTimeout(() => {
                            navigate(props.navigate);
                        }, 2000);
                        console.log("success");
                    })
                    .catch((error) => {
                        toast.error("Error deleting pet to Firestore: ");
                        console.log(error)
                    });
            })
            .catch((error) => {
                toast.error('Error deleting the user:', error);
            });
    }
    return (
        <div>
            <ToastContainer />
            <Modal className='delete-modal-content' show={props.show} onHide={props.hide} centered>
                <Modal.Body className="delete-modal">
                    <div className='body-head no-scroll pt-4'>
                        <Container>
                            <Row>
                                <p className='center'><FontAwesomeIcon className='delete-icon mt-4' icon={faCircleExclamation} beatFade /></p>
                            </Row>

                            <Row className='pt-3'>
                                <p className='center delete-header'>To confirm please input the email and password of the user {props.name}?</p>
                            </Row>

                            <Row className='mx-4 mt-3'>
                                <Form.Label className='fw-bold fs-6'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Email'
                                    value={props.email?props.email:""}
                                    disabled
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Row>

                            <Row className='mx-4 mt-3'>
                                <Form.Label className='fw-bold fs-6'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Row>

                            <Row className='mx-5 mt-3'>
                                <Button className='mb-3' variant='danger' onClick={handleSignIn}>Delete</Button>
                            </Row>

                            {/* <div>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleSignIn}>Sign In and Delete User</button>
                        </div> */}

                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeleteAuthenticate