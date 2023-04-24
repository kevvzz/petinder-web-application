import './main.css';
import React from 'react';
import logo from '../../Assets/petinder_logo.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate()
  return (
    <div className="main">
      <img class="petinderLogo" src={logo}/>
      <div className='buttons'>
		    <button onClick={()=>navigate("/lgu-login")} className='button-page'>Local Government Unit</button>
        <button onClick={()=>navigate("/admin-login")} className='button-page'>Admin Side</button>    
      </div>
    </div>
  );
}

export default Main;