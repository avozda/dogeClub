import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"
import Navbar from "../layout/Navbar"
import { getPost } from '../../actions/post';
import {getCurrentProfile} from "../../actions/profile"


const Post = ({ getPost, getCurrentProfile, post: { post, loading }, match, profile:{profile}, auth }) => {
   useEffect(() => {
      getCurrentProfile();
      getPost(match.params.id);
      
    }, [getPost, getCurrentProfile,match.params.id]);
   return (
      post===null ? <Spinner className="flex"/>: (
         <div >
         <Navbar/>
         <div className="grid-3 py-3">
            <div className="column">
            {profile ? (<div className="card">
                  <Link to={`/profile/${auth.user._id}`} className="medailon">
                     <img src={profile.avatar} className="avatar" alt="avatar"/>
                     <div>
                     <h4>{profile.name}</h4>
                     <p>@{auth.user.name}</p>
                     
                     </div>
                  </Link>
                  
               </div>):(<Link to="/create-profile"><div className="no-profile"><h4>You have not created a profile yet</h4></div></Link>)}
            </div>
            <div className="column">
            <PostItem showActions={false} post={post}/>

               {profile ? (<CommentForm postId={post._id}/>):(
                  <Link to="/create-profile"><div className="no-profile"><h4>Create a profile to comment posts</h4></div></Link>
               )}
               
               
            <div className="comments">
               {post.comments.map(comment=> <CommentItem key={comment._id} comment={comment} postId={post._id}/>)}
            </div>
               </div>
            <div className="column">
               
            </div>
            
         </div>
      </div> 
      )
   )
   
}

Post.propTypes = {
   getPost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   getCurrentProfile: PropTypes.func.isRequired
 };
 
 const mapStateToProps = (state) => ({
   auth:state.auth,
   post: state.post,
   profile: state.profile
 });
 
 export default connect(mapStateToProps, { getPost,getCurrentProfile })(Post);