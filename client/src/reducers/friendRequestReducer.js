import {ACCEPT_FRIEND, ADD_FRIEND, GET_ALL_FRIENDS} from "../actions/types";

const initialState = {
    friends: {},
    friend: [],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_ALL_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case ADD_FRIEND:
            return {
                ...state,
                friends: [action.payload, ...state.friends]
            };
        case ACCEPT_FRIEND:
            return{
                ...state,
                friends: [action.payload, ...state.friends]
            }
        default:
            return state;
    }

}