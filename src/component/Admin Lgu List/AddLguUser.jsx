import React, { useState, useRef, useEffect } from 'react';
import { Modal, Row, Col, Form, InputGroup, Button, Figure } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
//Firebase Firestore
import storage from '../../FirebaseStorage';
import db from '../../Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { toast } from 'react-toastify';


export default function AddLguUser(props) {
  const [imageUpload, setImageUpload] = useState('');

  const handClose = () => {
    props.hidemodal(false);
    setImageUpload('');
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
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

  return (
    <>
      <Modal
        show={props.showmodal}
        onHide={handClose}
        centered
        size='lg'
      >
        <Modal.Header
          className='headerBG'
          closeButton
        >
          <Modal.Title>ADD LGU USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <Row>
                <Form.Label
                  // ref={}
                  className='h6'
                >Username<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='userName'
                  id='userName'
                  className='mb-2'
                // value={}
                // onChange={}
                />
                <Overlay
                // target={nameTarget.current}
                // show={nameShowTooltip}
                // placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
              <Row>
                <Form.Label
                  // ref={}
                  className='h6'
                >Email<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="email"
                  name='email'
                  id='email'
                  className='mb-2'
                // value={}
                // onChange={}
                />
                <Overlay
                // target={nameTarget.current}
                // show={nameShowTooltip}
                // placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>

              <Row>
                <Form.Label
                  // ref={}
                  className='h6'
                >Branch Name<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='branch'
                  id='branch'
                  className='mb-2'
                // value={}
                // onChange={}
                />
                <Overlay
                // target={nameTarget.current}
                // show={nameShowTooltip}
                // placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>

              </Row>

              <Row>
                <Form.Label
                  // ref={}
                  className='h6'
                >Address<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='address'
                  id='address'
                  className='mb-2'
                // value={}
                // onChange={}
                />
                <Overlay
                // target={nameTarget.current}
                // show={nameShowTooltip}
                // placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>

              <Row>
                <Form.Label
                  // ref={}
                  className='h6'
                >Contact Number<span className='red'> *</span></Form.Label>
                <Form.Control
                  type="text"
                  name='contact'
                  id='contact'
                  className='mb-2'
                // value={}
                // onChange={}
                />
                <Overlay
                // target={nameTarget.current}
                // show={nameShowTooltip}
                // placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Empty Pet Name
                    </Tooltip>
                  )}
                </Overlay>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <Form.Label
                    // ref={}
                    className='h6'
                  >Upload Image<span className='red'> *</span></Form.Label>
                  <Form.Control
                    type="file"
                    name='profilePicture'
                    id='profilePicture'
                    className='mb-2'
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  // value={}
                  // onChange={}
                  />
                  <Overlay
                  // target={nameTarget.current}
                  // show={nameShowTooltip}
                  // placement="right"
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Empty Pet Name
                      </Tooltip>
                    )}
                  </Overlay>
                </Col>
              </Row>
              {imageUpload !== '' && (
                <>
                  <Row>
                    <Col>
                      <Figure>
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
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex button-wrapper'>
            <Button>
              Save Changes
            </Button>
          </div>
        </Modal.Footer>

      </Modal>
    </>
  )
}
