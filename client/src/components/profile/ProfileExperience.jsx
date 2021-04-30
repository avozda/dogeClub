
import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import {deleteExperience} from "../../actions/profile"
import { connect } from 'react-redux';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description,_id },
  deleteExperience,
  auth,
  profile:{profile}
}) => (
  <div className="education">
    {auth.isAuthenticated &&
    auth.loading === false &&
    auth.user._id === profile.user._id &&(
    <button onClick={() => {
      window.location.reload(false);
      deleteExperience(_id);
    }} className="delete-education">
    <i className="fas fa-times" />
        </button>
  )}
    <h3 className="text-dark">{company}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, {deleteExperience})(ProfileExperience);