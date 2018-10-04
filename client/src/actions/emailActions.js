import axios from 'axios';
import {GET_ALL_MAILS, SEND_EMAIL, GET_ERRORS} from "./types";


// Get all Friend Requests
export const getAllEmails = () => dispatch => {

    axios
        .get('/api/emails')
        .then(res =>
            dispatch({
                type: GET_ALL_MAILS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_MAILS,
                payload: null
            })
        );
};


// Send Message
export const sendMessage = postData => dispatch => {
    axios
        .post('/api/emails/', postData)
        .then(res =>
            dispatch({
                type: SEND_EMAIL,
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

// Add comment
export const addReply = (emailId, replyData) => dispatch => {
    axios
        .post(`/api/emails/reply/${emailId}`, replyData)
        .then(res =>
            dispatch({
                type: GET_ALL_MAILS,
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

// Get email by id
export const getReplies = (emailId) => dispatch => {
    axios
        .get(`/api/emails/email/${emailId}`)
        .then(res =>
            dispatch({
                type: GET_ALL_MAILS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_MAILS,
                payload: null
            })
        );
}