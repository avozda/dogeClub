import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    UPDATE_DISLIKES,
    UPDATE_UPVOTES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

//Najít přispěvky
export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

//smazat přísěvek
export const deletePost = id => async dispatch => {
    try {
        await api.delete(`/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//přidate příspěvek
export const addPost = formData => async dispatch => {
    try {
        const res = await api.post('/posts', formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// najít přispěvek podle id
export const getPost = id => async dispatch => {
    try {
        const res = await api.get(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// komentář
export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat komentář
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// upvote
export const addUpvote = (postId, commentId) => async dispatch => {

    try {
        const res = await api.put(`/posts/comment/upvote/${postId}/${commentId}`);

        dispatch({
            type: UPDATE_UPVOTES,
            payload: { commentId, postId, upvotes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};
// unUpvote
export const deleteUpvote = (postId, commentId) => async dispatch => {

    try {
        const res = await api.put(`/posts/comment/unupvote/${postId}/${commentId}`);

        dispatch({
            type: UPDATE_UPVOTES,
            payload: { commentId, postId, upvotes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// like
export const addLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat like
export const removeLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};
// přidat dislike
export const addDislike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/dislike/${id}`);

        dispatch({
            type: UPDATE_DISLIKES,
            payload: { id, dislikes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat dislike
export const removeDislike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/undislike/${id}`);

        dispatch({
            type: UPDATE_DISLIKES,
            payload: { id, dislikes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};