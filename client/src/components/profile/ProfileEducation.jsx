import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import {deleteEducation} from "../../actions/profile"
import { connect } from 'react-redux';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description, _id },
  deleteEducation,
  auth,
  profile:{profile}
}) => (
  <div className="education">
    {auth.isAuthenticated &&
    auth.loading === false &&
    auth.user._id === profile.user._id &&(
    <button onClick={() => {
      window.location.reload(false);
      deleteEducation(_id)
    }} className="delete-education">
    <i className="fas fa-times" />
        </button>
  )}
    <h3 className="text-dark">{school}</h3>

    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
    
    
    
       
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {deleteEducation})(ProfileEducation);