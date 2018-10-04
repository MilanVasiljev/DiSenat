import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import blogReducer from './blogReducer';
import uploadProfileImageReducer from './uploadProfileImageReducer'
import friendRequestReducer from './friendRequestReducer';
import emailReducer from './emailReducer';


export default combineReducers({

    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    blog: blogReducer,
    uploadProfileImage: uploadProfileImageReducer,
    friend: friendRequestReducer,
    email: emailReducer

});