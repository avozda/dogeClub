import React from 'react'
import PropTypes from 'prop-types'

const ProfileSocials = ({
   profile: {
     website,
     social
   }
 }) => {
   return (
         
          <div className="about-card profile-header">
             {
                website&& ( <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i>
              </a>)
             }
             {
                social && social.twitter && (<a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>)
             }
              {
                social && social.facebook && (<a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>)
             }
              {
                social && social.linkedin && (<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>)
             }
              {
                social && social.youtube && (<a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>)
             }
   
              {
                social && social.instagram && (<a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>)
             }
              {
                social && social.githubusername && (<a href={social.githubusername} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>)
             }
          </div>
   )
}

ProfileSocials.propTypes = {
 profile: PropTypes.object.isRequired,
}

export default ProfileSocials
