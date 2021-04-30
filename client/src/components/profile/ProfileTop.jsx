import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {deleteAccount} from "../../actions/profile"
const ProfileTop = ({
   profile: {
     location,
     website,
     social,
     name,
     user,
     avatar
   },
   auth,
   deleteAccount
 }) => {
  
  
   return (
         <div className="profile-header">
          <img
            className={"profile-avatar"}
            src={avatar}
            alt=""
          />
          <h1 className="large">{name}</h1>
   <p>{location&&<span>{location}</span>}</p>
   {auth.isAuthenticated &&
  auth.loading === false &&
  auth.user._id === user._id && (
    <div className="edit-btn">
    <Link to="/edit-profile" className="btn" >Edit profile</Link>
    <button className="btn" onClick={deleteAccount}>Delete profile</button>
    </div>
   
  )}
          </div>
   )
}

ProfileTop.propTypes = {
 profile: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps, {deleteAccount})(ProfileTop)



