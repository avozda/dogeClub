import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from "../layout/Spinner"
import PostItem from "./PostItem"
import PostForm from "./PostForm"
const Posts = ({ getPosts, post: { posts, loading }, filter, profile:{profile} }) => {
   useEffect(()=>{
      getPosts();
   }, [getPosts])

   const [form, toggleForm] = useState(false);
   return (
      loading?<Spinner/>:
      (<Fragment>
         {filter ?(
           <div className="text-right"><h1 className="text-primary">Users posts</h1></div> 
         ):(
            <div className="flex-between">
            <h1 className="text-primary">Newsfeed</h1>
            <button className="btn" onClick={e =>{
               if(!profile){
                  toggleForm(!form)
               }
            }}>Add post</button>
            </div>
         )
         
      }
         {form && (
            <PostForm/>
         )}
         <div className="posts">
            {filter?(
               posts.filter(post=> post.user === filter).map(post=><PostItem key={post._id} post={post}/>)
            ):(
               posts.map(post=><PostItem key={post._id} post={post}/>))}
         </div>
      </Fragment>)
      
   )
}

Posts.propTypes = {
   getPosts: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   post: state.post,
   profile: state.post,

 });
 
 export default connect(mapStateToProps, { getPosts })(Posts);
