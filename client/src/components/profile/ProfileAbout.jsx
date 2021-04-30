import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{bio,name,location}}) => {
   return (
      <div className="about-card">
         
         <p><i className="fas fa-user"></i>{name}</p>
         {bio && location && (<Fragment>
         <p><i className="fas fa-map-marker-alt"></i>{location}</p>
          <p><i className="fas fa-question"></i>{bio}</p>
         </Fragment>)}
          
        </div>
   )
}

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileAbout
