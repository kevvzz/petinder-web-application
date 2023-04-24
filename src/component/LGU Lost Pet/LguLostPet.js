import React from 'react'
import chowa from '../../Assets/chowa.jpg';
import {LguNavbar} from '../Navbar/Navbar';
import {Row, Col, InputGroup, Form} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDog, faCat, faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';
function LguLostPet() {
  return (
    <div className='main-bg'>
        <LguNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                   Lost Pets
                </h1>
            </header>
            <div className="container">
            <Row className='bottomSpace'>
                    <Col xs={7}>
                        <Row>
                            <InputGroup className="search-employee">
                            <InputGroup.Text className='icon-part'><FontAwesomeIcon className='glass' icon={faMagnifyingGlass}/></InputGroup.Text>
                            <Form.Control
                                className="search-part me-3"
                                type="text"
                                autoComplete="off"
                                aria-label="term"
                                aria-describedby="term"
                                placeholder="Search Pets"
                                name="term"
                                id="term"
                                // onChange={(e) => searchFilter(e)}
                                />
                            </InputGroup>
                        </Row>
                    </Col>
                    <Col  xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper">
                                    <button type="button" className="add">
                                        <FontAwesomeIcon icon={faDog} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper">
                                    <button type="button" className="add">
                                        <FontAwesomeIcon icon={faCat} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Row>
                            <a>
                                <div className="pet-wrapper">
                                    <button type="button" className="add">
                                    <FontAwesomeIcon icon={faDog} bounce />
                                    <FontAwesomeIcon icon={faCat} bounce />
                                    </button>
                                </div>
                            </a>
                        </Row>
                    </Col>
                </Row>
                <div className="row">
                    <div className="pet-card">
                        <a>
                            <img src={chowa} alt="profile"/>
                            <div>
                                <h4><center><b>Chowa</b></center></h4> 
                            </div>
                        </a>
                    </div>
                </div>
            </div>	
        </div>
    </div>	
  )
}

export default LguLostPet