import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Posts from "../posts/Posts"
import Navbar from "../layout/Navbar"
import { connect } from 'react-redux';
import {getCurrentProfile} from "../../actions/profile"
import { Link } from 'react-router-dom';
import Spinner from "../layout/Spinner"

const Main = ({auth,getCurrentProfile, profile:{profile}}) => {

   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile])
   return (
      auth.user ? (
         <div >
         <Navbar/>
         <div className="grid-3 py-3">
            <div className="column">
               {profile ? (<div className="card">
                  <Link to={`/profile/${auth.user._id}`} className="medailon">
                     <img src={profile.avatar} className="avatar" alt="avatar"/>
                     <div>
                     <h4>{profile.name}</h4>
                     <p>@{auth.user.name}</p>
                     
                     </div>
                  </Link>
                  
               </div>):(<Link to="/create-profile"><div className="no-profile"><h4>Create a profile</h4></div></Link>)}
            
            </div>
            <div className="column"><Posts profile={profile}/></div>
            <div className="column">
               
            </div>
            
         </div>
      </div> 
      )  : (<Spinner className="flex"/>) 
   )
}

Main.propTypes = {
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile
 });

export default connect(mapStateToProps, {getCurrentProfile})(Main)
