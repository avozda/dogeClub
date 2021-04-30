import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment, profile:{profile} }) => {
  const [text, setText] = useState('');
   return (
      <div className='comment-form'>
      
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <img src={profile.avatar} className="comment-avatar" alt=""/>
        <textarea
          name='text'
          cols='30'
          rows='1'
          placeholder='Comment the post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit" className="comment-send">
        <i className="fas fa-paper-plane fa-lg"></i>
        </button>
      </form>
    </div>
   )
}


CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired
 };

const mapStateToProps = (state) => ({
  profile: state.profile
});
 
 export default connect(
   mapStateToProps,
   { addComment }
 )(CommentForm);
