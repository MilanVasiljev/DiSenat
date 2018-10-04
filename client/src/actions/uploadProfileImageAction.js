// import axios from 'axios';
//
// import {UPLOAD_IMAGE, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAIL, GET_ERRORS} from "../actions/types";
//
//
// export const uploadProfileImage = fd => dispatch => {
//     axios.post('/api/users/uploadavatar', fd)
//         .then(res =>
//             dispatch({
//                 type: UPLOAD_IMAGE,
//                 payload: res.data
//
//             }))
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: null
//             }));
//
// }