import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id},
    avatar,
    name,
    location
  }
}) => {
  return (
    <div className='profile-item'>
      <img src={avatar} alt='' className='avatar' />
      <div>
      <Link to={`/profile/${_id}`}>
        <h2>{name}</h2>
        </Link>
        <p className='my-1'>{location && <span>{location}</span>}</p> 
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;