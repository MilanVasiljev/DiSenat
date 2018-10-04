import axios from 'axios';

import {
    ADD_BLOG, BLOG_LOADING, GET_BLOGS,
    GET_ERRORS
} from "./types";

// Add Post
export const addBlog = blogData => dispatch => {
    axios
        .post('/api/blog', blogData)
        .then(res =>
            dispatch({
                type: ADD_BLOG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Get all Blogs
export const getBlogs = () => dispatch => {

    dispatch(setBlogLoading());

    axios
        .get('/api/blog')
        .then(res =>
            dispatch({
                type: GET_BLOGS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_BLOGS,
                payload: null
            })
        );
};


// Set loading state
export const  setBlogLoading = () => {
    return {
        type: BLOG_LOADING
    }
}