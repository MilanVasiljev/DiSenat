import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registeruser = (userData, history) => dispatch => {

        // .then(this.props.closeModal)
        // .then(this.props.openThanksModal)

    axios.post('/api/users/register', userData)
        .then(res => history.push('/profile'))
        .catch(err =>
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = (userData) => dispatch => {

    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to local storage
            const { token } = res.data;
            // Set token to local storage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded)).then(window.location.reload());


        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log out user
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user to empty object {} and authenticated to false
    dispatch(setCurrentUser({}));
}