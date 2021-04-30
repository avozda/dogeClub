import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileSocials from './ProfileSocials';
import { getProfileById } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import Posts from "../posts/Posts"
import Navbar from "../layout/Navbar"



const Profile = ({ getProfileById, profile: { profile, loading }, auth,post:{posts},getPosts, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getPosts();
  }, [getProfileById, match.params.id, getPosts]);

  return (
    profile === null && !profile ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar/>
        <div className="profile-container">
          <div>
            <ProfileTop profile={profile} />
          </div>
          <div className="grid-2 py-1">
          <div className="column about-user">
              <ProfileAbout profile={profile} />
              <ProfileSocials profile={profile}/>
              
              <div className="about-card">
                <h2>Experiences</h2>
              {profile.experience.length > 0 ? (
              profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))
            
          ):(<h4>No experiences</h4>)} 


{auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (<Link to="/add-experience" className="btn add-btn">Add Experience</Link>)
                  }    
             </div>
                  <div className="about-card">
                  <h2>Educations</h2>
              {profile.education.length > 0 ? (
               
                  profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))
                
              ) : (

                <h4>No educations</h4>
                
          
              )}
                {
                  auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && ( <Link to="/add-education" className="btn add-btn">Add Education</Link>)
                }
              </div>
              </div>
              <div className="column"><Posts filter={match.params.id}/></div>
          </div>    
        </div>
        </Fragment>
      )
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post:state.post
});

export default connect(mapStateToProps, { getProfileById, getPosts })(Profile);




