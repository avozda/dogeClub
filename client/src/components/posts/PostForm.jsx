import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import axios from "axios"

const PostForm = ({addPost}) => {
   const [text, setText] = useState('');
    const [picture, setPicture] = useState("")
   const onSubmit = e =>{

      e.preventDefault();
      
      addPost({text, picture});
      setText("")
      setPicture("")
   }
   

   return (
      <div className="post-form">
        <div className="bg-primary p">
          <h2>Create a post</h2>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Say Something..."
            maxlength="200"
            value={text}
            onChange={e=> setText(e.target.value)}
          
            required
          ></textarea>
          {picture && <img src={picture} alt='' className='img-preview' width="50" height="200" />}
          <div className="form-group">
          <div className="flex-between">
            {
              picture ? (
                <Fragment>
                  <button type="button" className="custom-file-upload" onClick={e=>{
                    setPicture(null)
                  }}>Delete Image</button>
                </Fragment>
              ):(
              <Fragment>
                <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-cloud-upload-alt"></i>
                Upload Image
                </label>

                <input id="file-upload" type="file"  onChange={async(e)=>{
              if(!picture) {
              const fileData = new FormData();
              fileData.append("file", e.target.files[0]);
              fileData.append("upload_preset", "pepkosos");

              const res = await axios.post("https://api.cloudinary.com/v1_1/pepehouse/image/upload", fileData);
              setPicture(res.data.secure_url);
            }
          }}
            />
              </Fragment>
                
              )
            }

        
          <button type="submit" className="btn">Post</button>
          </div>
          </div>
        </form>
      </div>
   )
}

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired
 };
 
 export default connect(null,{ addPost })(PostForm);


 