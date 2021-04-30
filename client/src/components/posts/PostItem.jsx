import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import {addLike, removeLike,addDislike,removeDislike, deletePost} from "../../actions/post"

const PostItem = ({addLike,removeLike,deletePost,addDislike,removeDislike,auth,showActions,post: { text,_id, name, avatar, user,dislikes, likes, comments, date, picture }}) => {

  const liking = (action) => {
    const liked = likes.some(like => like.user === auth.user._id);
    const disliked = dislikes.some(dislike => dislike.user === auth.user._id);
    if(liked && action==="like" && !disliked) {
      removeLike(_id);
    } else if (!liked && action ==="like" && !disliked) {
      addLike(_id)
    } else if (action ==="dislike"&& disliked && !liked) {
      removeDislike(_id);
    } else if (!liked && action ==="dislike" && !disliked) {
      addDislike(_id);
    }
  }

   return (
      <div className="post bg-white p-1">
      <div className="post-header">
        <Link to={`/profile/${user}`}>
          <img className="avatar" src={avatar} alt=""  />
          </Link>
          <div className="post-info">
          <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
          </Link>
          <p className="post-date">Posted on {formatDate(date)}</p>
          </div>
          {!auth.loading && user === auth.user._id && (
              <button
               onClick={()=>deletePost(_id)}
                type="button"
                className="btn-danger delete-post"
                title="Delete your post"
              >
                <i className="fas fa-times" />
              </button>
            )}
      </div>
      <div>
        
         <div className="px-1 m-bottom"><p>{text}</p></div>
        
        <img src={picture} className="post-picture" alt=""/>
          <div className="reactions">
            
            <button
              onClick={() => liking("like")}
              type="button"
              className={`reaction-btn btn-${likes.some(like => like.user === auth.user._id) ? "dark": "light"}`}
            >
{likes.length > 0 && (<span>{likes.length}</span>)}
              <i className="fas fa-thumbs-up" />
          Like
            </button>
            
            
            <button
              onClick={() => liking("dislike")}
              type="button"
              className={`reaction-btn btn-${dislikes.some(dislike => dislike.user === auth.user._id) ? "dark": "light"}`}
            >
              {dislikes.length > 0 && (<span>{dislikes.length}</span>)}
              <i className="fas fa-thumbs-down" />
               Dislike
              </button>
            
      {showActions &&
         <Link to={`/posts/${_id}`} className="reaction-btn btn-primary">
         
         {comments.length > 0 && (
                <span > {comments.length}</span>
              )}
            <i className="fas fa-comments"></i>
            Comment 
              
            </Link>    
        }     
          </div>
        {
          comments.length > 0 && showActions && (
            <div>
            <div className="featured-comment">
            <div className="comment-header">
              <Link to={`/profile/${comments[comments.length-1].user}`}>
              <img className="comment-avatar" src={comments[comments.length-1].avatar} alt=""  />
              </Link>
              </div>
              <div className="comment-body">
              <Link to={`/profile/${comments[comments.length-1].user}`}>
                <h4 className="comment-name">{comments[comments.length-1].name}</h4> 
              </Link>
              <span className="post-date" >{formatDate(comments[comments.length-1].date)}</span>
              <p>{comments[comments.length-1].text}</p>
              
              </div>
             
            </div>
            {showActions &&
            <Link to={`/posts/${_id}`} className="add-comment">
            Add comment...
          </Link>}
             
           </div>
          )
        }
        
        
      </div>
    </div>
   )
}

PostItem.defaultProps = {
   showActions: true
 };
 

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   removeLike: PropTypes.func.isRequired,
   addLike: PropTypes.func.isRequired,
   removeDislike: PropTypes.func.isRequired,
   addDislike: PropTypes.func.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   auth: state.auth
 });
 
 export default connect(mapStateToProps, {addLike,removeLike, deletePost, addDislike,removeDislike})(PostItem);