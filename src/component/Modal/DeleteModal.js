import { Modal, Row, Col, Container, Form, InputGroup } from 'react-bootstrap'
//CSS
import '../../profile.css';
import '../../App.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';

function DeleteModal(props) {
    return (
        <div>
            <Modal className='delete-modal-content' show={props.show} onHide={props.hide} centered>
                <Modal.Body className="delete-modal">
                    <div className='body-head no-scroll pt-4'>
                        <Container>
                            <Row>
                                <p className='center'><FontAwesomeIcon className='delete-icon mt-4' icon={faCircleExclamation} beatFade /></p>
                            </Row>
                            
                            <Row className='pt-3'>
                                <p className='center delete-header'>ARE YOU SURE YOU WANT TO DELETE THIS {props.name}?</p>
                            </Row>

                            <div className='btn d-flex justify-content-end me-2 mt-4'>
                                <button type="" className='delete-button me-2' onClick={props.hide}>Cancel</button>
                                <button type="submit" className='delete-button' onClick={props.remover}>Delete</button>
                            </div>
    
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeleteModal