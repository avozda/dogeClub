import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getProfiles } from '../../actions/profile';

import logo from "../../img/dogeLogo.svg"
const Navbar = ({ logout, getProfiles, history, auth, profile }) => {

  const [search, setSearch] = useState('');
  

  return (
    <div>
    <nav className="navbar bg-dark">
        <Link to="/" className="text-logo" >
          <img src={logo} alt="" className="logo"/>
          <h1 className="logo-text">DogeClub</h1>
        </Link>
        
        <form className="form-group" onSubmit={e=>{
          e.preventDefault();
          getProfiles(history,search)
          
        }}
          >
          
        <i className="fa fa-search form-icon"></i>

          <input type="search" placeholder="Search users"  id="search" name="search" onChange={e=>setSearch(e.target.value)} required/>
        </form>
       
      <ul>  
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt fa-2x" />{' '}
        </a>
      </li>
    </ul>
    </nav>
    <nav className="navbar navbar-phone bg-dark">
        <Link to="/" className="text-logo" >
          <img src={logo} alt="" className="logo"/>
         
        </Link>
        
        <form className="form-group" onSubmit={e=>{
          e.preventDefault();
          getProfiles(history,search)
          
        }}
          >
          
        <i className="fa fa-search form-icon"></i>

          <input type="search" placeholder="Search users"  id="search" name="search" onChange={e=>setSearch(e.target.value)} required/>
        </form>
    </nav>

    <nav className="bottom-nav">
    <ul className="bottom-menu py-1">  

    <Link to={`${profile.profile ? (`/profile/${auth.user._id}`) : ("/create-profile")}`}>
    <li>
        <i className="fas fa-user fa-2x"></i> 
      </li>
      </Link>
      <a onClick={logout} href="#!">
      <li>
        
        
          <i className="fas fa-sign-out-alt fa-2x" />{' '}
       
      </li>
      </a>
    </ul>
    </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logout, getProfiles })(withRouter(Navbar));
