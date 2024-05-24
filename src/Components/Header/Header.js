import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../Store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth} from 'firebase/auth';

function Header() {

  const {user} = useContext(AuthContext)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleLoginClick = () => {
    if (!user) {
      navigate('/login');
    }
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=> navigate("/")}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span 
            className='text-primary' 
            style={{ cursor: 'pointer' }}
            onClick={handleLoginClick}
          >
            {user ? `Welcome ${user.displayName}` : 'Login'}
          </span>
          <hr />
        </div>
          <span style={{ cursor:'pointer'}} className='text-primary' onClick={()=>{
            auth.signOut();
            navigate("/login")

          }} >{user?'Logout':""}</span>

        <div className="sellMenu" onClick={()=> navigate("/create")}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
