import {ADD_BLOG, BLOG_LOADING, GET_BLOGS} from "../actions/types";

const initialState = {
    blogs: [],
    blog: {},
    loading: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case BLOG_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
                loading: false
            };
        case ADD_BLOG:
            return {
                ...state,
                blogs: [action.payload, ...state.blogs]
            }
        default:
            return state;
    }

}