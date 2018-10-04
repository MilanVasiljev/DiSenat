import {GET_ALL_MAILS, SEND_EMAIL, GET_MAIL_BY_ID} from "../actions/types";

const initialState = {
    emails: {},
    email: [],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_ALL_MAILS:
            return {
                ...state,
                emails: action.payload
            };
        case SEND_EMAIL:
            return {
                ...state,
                emails: [action.payload, ...state.friends]
            };
        case GET_MAIL_BY_ID:
            return {
                ...state,
                emails: action.payload
            }
        default:
            return state;
    }

}