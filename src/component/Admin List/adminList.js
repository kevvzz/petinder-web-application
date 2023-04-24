import React from 'react'
import lou from '../../Assets/lou.png';
import cesar from '../../Assets/cesar_olaer.png';
import kevin from '../../Assets/kevin.png';
import kim from '../../Assets/kim.png';
import {AdminNavbar} from '../Navbar/Navbar';
// import 'bootstrap/dist/css/bootstrap.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//CSS
import '../../profile.css';
import '../../App.css';

function adminList() {
  return (
    <div className='main-bg'>
        <AdminNavbar/>
        <div className="main-content">
            
            <header>
                <h1>
                    The Admin of Petinder Application
                </h1>
            </header>
            <div className="container">
                <div className="row rowCard">
                    <div className="pet-card">
                        <a>
                            <img src={lou} alt="profile"/>
                            <div>
                                <h4><center><b>Joerge Ryan Lou</b></center></h4> 
                            </div>
                        </a>
                    </div>
                    <div className="pet-card">
                        <a>
                            <img src={cesar} alt="profile"/>
                            <div>
                                <h4><center><b>Cesar Olaer</b></center></h4> 
                            </div>
                        </a>
                    </div>
                    <div className="pet-card">
                        <a>
                            <img src={kevin} alt="profile"/>
                            <div>
                                <h4><center><b>Kevin Cristian Salut</b></center></h4> 
                            </div>
                        </a>
                    </div>
                    <div className="pet-card">
                        <a>
                            <img src={kim} alt="profile"/>
                            <div>
                                <h4><center><b>Kim Mart Codera</b></center></h4> 
                            </div>
                        </a>
                    </div>
                </div>
            </div>	
        </div>
    </div>	
  )
}

export default adminList