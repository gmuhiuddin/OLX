import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if you im
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import UserLoggedOrNo from '../UserLoggedOrNo';
import UserInfoCart from '../UserInfoCart';

const Navbar = () => {
  const [userInfoCartView, setUserInfoCartView] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  
  return (
    <div>
      <nav className="navbar">
        <img className='logo' alt='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1AqNs6Rez3QHmfXdLLVj8mVpPOfvPqs3Ak0wo2_0Nm4BZk-yc' />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', width: '81vw' }}>
            <div className='select-container'>
              <FontAwesomeIcon style={{ fontSize: 23, cursor: 'pointer' }} icon={faMagnifyingGlass} />
              <select className='select'>
                <option>Pakistan</option>
                <option disabled>CHOOSE REGION</option>
                <option>Azad Kashmir, Pakistan</option>
                <option>Balochistan, Pakistan</option>
                <option>Islamabad, Pakistan</option>
                <option>Khybar Pakhtunkhaw, Pakistan</option>
                <option>Northern Areas, Pakistan</option>
                <option>Punjab, Pakistan</option>
                <option>Sindh, Pakistan</option>
              </select>
            </div>
            <input className='input' placeholder='Find Cars, Mobiles Phone and more...' />
            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
            <UserLoggedOrNo setUserEmail={setUserEmail} setUserInfoCartView={setUserInfoCartView} userInfoCartView={userInfoCartView} />
          </div>
        </div>
        <br />
      </nav>
      {userInfoCartView?<span>
        <UserInfoCart setUserInfoCartView={setUserInfoCartView} userEmail={userEmail} />
      <br />
      <br />
      <br />
      <br />
      <br />

      </span>
      :''}
    </div>
    
  );
};

export default Navbar;
