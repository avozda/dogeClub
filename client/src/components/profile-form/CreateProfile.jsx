import React, {useState, useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createProfile} from "../../actions/profile"
import {withRouter, Redirect} from "react-router-dom"
import axios from "axios"
import Navbar from "../layout/Navbar"
import {getCurrentProfile} from "../../actions/profile"


const CreateProfile = ({createProfile, history, profile:{profile}, getCurrentProfile}) => {

useEffect(() => {
    getCurrentProfile();
 }, [getCurrentProfile])



const [formData, setFormData] = useState({
  name: "",
  avatar: "",
  website: '',
  location: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
})

const [displaySocialInputs, toggleSocialInputs] = useState(false);

const {
    name,
    avatar,
   website,
   location,
   githubusername,
   bio,
   twitter,
   facebook,
   linkedin,
   youtube,
   instagram
 } = formData;

 if(profile) {
  return <Redirect to="/" />;
}

 const onChange = e =>{
   setFormData({...formData, [e.target.name]: e.target.value})
 }

 const onSubmit = async e => {
  e.preventDefault();
  
  createProfile(formData, history);
 }

   return (
      <Fragment>
        <Navbar/>
        <div className="create-container">
          <div className="create-form">
          <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={onSubmit}>
      <div className="form-group">
        {avatar ? (
           <Fragment>
             <img src={avatar} alt="" className="profile-avatar"/>
           <button type="button" className="custom-file-upload" onClick={e=>{
             setFormData({...formData, avatar:""})
           }}>Delete profile picture</button>
           
          </Fragment>
        ) : (
          <Fragment>
            <label htmlFor="file-upload"  className="custom-file-upload">
                <i className="fas fa-cloud-upload-alt"></i>
                Upload profile image
                </label>
          <input type="file" id="file-upload" placeholder="" name="avatar" onChange={async(e)=>{
            const fileData = new FormData();
            fileData.append("file", e.target.files[0]);
            fileData.append("upload_preset", "pepkosos");
          
            const res = await axios.post("https://api.cloudinary.com/v1_1/pepehouse/image/upload", fileData);
            setFormData({...formData, avatar: res.data.secure_url})
            }}/>
            
            </Fragment>
            )}
      
          
        </div>
      <div className="form-group">
      <i className="fas create-icon fa-user"></i>
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        </div>
  
        
        <div className="form-group">
        <i className="fas create-icon fa-map-marker-alt"></i>
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
          
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-globe"></i>
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-question"></i>
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
        </div>

        <div className="my-2">
          <button  type="button"  onClick={()=> toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
            Add Social Network Links
          </button>
        </div>

            {displaySocialInputs && <Fragment>
               <div className="form-group social-input">
          <i className="fab create-icon fa-twitter "></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab create-icon fa-facebook "></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab create-icon fa-youtube "></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab create-icon fa-linkedin "></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab create-icon fa-instagram "></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
        </div>
        <div className="form-group social-input">
          <i className="fab create-icon fa-github "></i>
          <input type="text" placeholder="Github URL" name="githubusername" value={githubusername} onChange={onChange}/>
        </div>
              
               </Fragment>}
        
        <input type="submit" className="btn btn-primary my-1" value="Create Profile" />
      </form>
      </div>
      </div>
      </Fragment>
   )
}

CreateProfile.propTypes = {
 createProfile: PropTypes.func.isRequired,
 profile:PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));
