import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Spinner from "../layout/Spinner"
import { getProfiles } from '../../actions/profile';
import {getCurrentProfile} from "../../actions/profile"
import ProfileItem from "./ProfileItem"
import Navbar from "../layout/Navbar"
import {withRouter,Link} from "react-router-dom"


const Profiles = ({profile:{profiles,loading,profile}, history, getProfiles, auth, getCurrentProfile, match}) => {
   useEffect(()=>{
   getCurrentProfile();
   
   
      getProfiles(history,match.params.search);
   
      
   },[getCurrentProfile,getProfiles, history,match.params.search])


 
   return (
    
         loading ?<Spinner/>:
         <div>
            <Navbar/>
            <div className="grid-3 py-3">
           <div className="column">
           <div className="card">
              {!auth.loading && profile ? (<Link to={`/profile/${auth.user._id}`} className="medailon">
            <img src={profile.avatar} className="avatar" alt="avatar"/>
            <div>
            <h4>{profile.name}</h4>
            <p>@{auth.user.name}</p>  
            </div>
         </Link> ) : (<Link to="/create-profile"><div className="no-profile"><h4>You have not created a profile yet</h4></div></Link>)
            
            }
            
         </div>
         </div>

         <div className="column"> 
         <h1 className="text-primary">Found Users</h1>
         {profiles.length>0? (profiles.map(profile=><ProfileItem key={profile._id} profile={profile}/>)): <h4>No profiles found</h4>}</div>
           
            <div className="column"></div>
            </div >
         </div>
   )
}

Profiles.propTypes = {
   getProfiles: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
   profile: state.profile,
   auth:state.auth
})

export default connect(mapStateToProps,{getProfiles, getCurrentProfile  })(withRouter(Profiles))
