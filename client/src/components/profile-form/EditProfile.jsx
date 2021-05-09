import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createProfile, getCurrentProfile} from "../../actions/profile"
import {withRouter} from "react-router-dom"
import axios from "axios"
import Navbar from "../layout/Navbar"
import Spinner from "../layout/Spinner"


const EditProfile = ({profile:{profile,loading},createProfile, history, getCurrentProfile}) => {

const [formData, setFormData] = useState({
  name:"",
  avatar:"",
  website: "",
  location: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: ""
})


const [displaySocialInputs, toggleSocialInputs] = useState(false);

useEffect(()=> {

  if (!profile) getCurrentProfile();

   setFormData({
      name: loading || !profile.name ? "" : profile.name,
      avatar: loading || !profile.avatar ? "" : profile.avatar,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      githubusername: loading || !profile.social ? "" : profile.social.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
   })
   

}, [getCurrentProfile, loading, profile])

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

 const onChange = e =>{
   setFormData({...formData, [e.target.name]: e.target.value})
 }

 const onSubmit = (e) => {
   e.preventDefault();
  createProfile(formData, history, true);
 }

   return (
     loading && !profile ? (
      <Spinner/>
     ): (  <Fragment>
      <Navbar/>
      <div className="create-container">
        <div className="create-form">
        <h1 className="large text-primary">
      Edit Your Profile
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Let's change some information to make your
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
              Upload profile picture
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
        <input type="text" maxlength="30"  placeholder="Name" name="name" value={name} onChange={onChange} />
       
      </div>
      <div className="form-group">
      <i className="fas create-icon fa-map-marker-alt"></i>
      <i className="fas create-icon fa-globe"></i>
        <input type="text" placeholder="Website" maxlength="80" name="website" value={website} onChange={onChange} />
       
      </div>
      <div className="form-group">
      <i className="fas create-icon fa-map-marker-alt"></i>
        <input type="text" placeholder="Location" name="location" maxlength="30" value={location} onChange={onChange}/>
       
      </div>
      <div className="form-group">
      <i className="fas create-icon fa-question"></i>
        <textarea maxlength="100"  placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
      
      </div>

      <div className="my-2">
        <button  type="button"  onClick={()=> toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
          Add Social Network Links
        </button>
      </div>

          {displaySocialInputs && <Fragment>
             <div className="form-group social-input">
        <i className="fab create-icon fa-twitter"></i>
        <input type="text" placeholder="Twitter URL" maxlength="100" name="twitter" value={twitter} onChange={onChange} />
      </div>

      <div className="form-group social-input">
        <i className="fab create-icon fa-facebook"></i>
        <input type="text" placeholder="Facebook URL" maxlength="100" name="facebook" value={facebook} onChange={onChange}/>
      </div>

      <div className="form-group social-input">
        <i className="fab create-icon fa-youtube"></i>
        <input type="text" placeholder="YouTube URL" maxlength="100" name="youtube" value={youtube} onChange={onChange} />
      </div>

      <div className="form-group social-input">
        <i className="fab create-icon fa-linkedin"></i>
        <input type="text" placeholder="Linkedin URL" maxlength="100" name="linkedin" value={linkedin} onChange={onChange} />
      </div>

      <div className="form-group social-input">
        <i className="fab create-icon fa-instagram"></i>
        <input type="text" placeholder="Instagram URL" maxlength="100" name="instagram" value={instagram} onChange={onChange}/>
      </div>
      <div className="form-group social-input">
        <i className="fab create-icon create-icon fa-github "></i>
        <input type="text" placeholder="Github URL" maxlength="100" name="githubusername" value={githubusername} onChange={onChange}/>
      </div>
            
             </Fragment>}
      
      <input type="submit" className="btn btn-primary my-1" value="Edit Profile"  />
    </form>
    </div>
    </div>
    </Fragment>)
     
   ) 
}

EditProfile.propTypes = {
 createProfile: PropTypes.func.isRequired,
 getCurrentProfile: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
   profile: state.profile,

})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
