import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment, addUpvote, deleteUpvote } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, upvotes },
  auth,
  deleteComment,
  addUpvote,
  deleteUpvote
}) => {

  return(
    <div>
  <div className="featured-comment border-none">
    <div className="comment-header">
      <Link to={`/profile/${user}`}>
        <img className="comment-avatar" src={avatar} alt="" />
        
      </Link>
    </div>
    <div className="comment-body  ">
    <Link to={`/profile/${user}`}>
    <h4 className="comment-name">{name}</h4>
    </Link>
    <span className="post-date">Commented on {formatDate(date)}</span>
      <p>{text}</p>
      
      <Fragment>
      <button onClick={()=>{
          const upvoted = upvotes.some(upvote => upvote.user === auth.user._id);
          if(!upvoted) {
            addUpvote(postId, _id)
          } else {
            deleteUpvote(postId, _id)
          }
      }} type="button" className={`upvote-button btn-${upvotes.some(upvote => upvote.user === auth.user._id) ? "dark":"light"}`}>
      
                <i className="fas fa-hand-point-up fa-lg"></i>{' '}
              <span>{upvotes.length > 0 && <span>{upvotes.length}</span>}</span>
              </button>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn-danger delete-post"
        >
          <i className="fas fa-times" />
        </button>
      )}
      </Fragment>
      
    </div>
  </div>
  </div>
);
      }
CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addUpvote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment,addUpvote, deleteUpvote})(CommentItem);