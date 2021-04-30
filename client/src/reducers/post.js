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
} from '../actions/types';

const sorter = (a, b) => {
    if (a.upvotes.length > b.upvotes.length) {
        return -1;
    } else {
        return 1;
    }
}

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.id ? {...post, likes: payload.likes } : post
                ),
                post: {...state.post, likes: payload.likes },
                loading: false
            };
        case UPDATE_DISLIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.id ? {...post, dislikes: payload.dislikes } : post
                ),
                post: {...state.post, dislikes: payload.dislikes },
                loading: false
            };
        case UPDATE_UPVOTES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.postId ? {...post, comments: post.comments.map(comment => comment._id === payload.commentId ? {...comment, upvotes: payload.upvotes } : comment) } : post
                ).sort(sorter),
                post: {...state.post, comments: state.post.comments.map(comment => comment._id === payload.commentId ? {...comment, upvotes: payload.upvotes } : comment).sort(sorter) },
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: {...payload, comments: payload.comments.sort(sorter) },
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        (comment) => comment._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state
    }
}