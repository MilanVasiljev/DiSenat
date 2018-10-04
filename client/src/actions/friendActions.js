import axios from 'axios';
import {ACCEPT_FRIEND, ADD_FRIEND, GET_ALL_FRIENDS, GET_ERRORS} from "./types";

// Add Friend
export const requestfriend = postData => dispatch => {
    axios
        .post('/api/friends/requestfriend', postData)
        .then(res =>
            dispatch({
                type: ADD_FRIEND,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );
};

// Accept Friend
export const acceptfriend = (user_id) => dispatch => {
    axios.post('api/friends/acceptfriend', {id:user_id})
        .then(res => {
            console.log(res.data);
            // this.props.history.push('/zahtevi');
            window.location.reload();
        })

    console.log(user_id);
};

// Get all Friend Requests
export const getAllFriendRequests = () => dispatch => {

    axios
        .get('/api/friends')
        .then(res =>
            dispatch({
                type: GET_ALL_FRIENDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_FRIENDS,
                payload: null
            })
        );
};