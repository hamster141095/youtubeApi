import {
    SIGN_OUT,
    SIGN_IN,
    UPDATE_USER_DATA,
    ADD_REQUEST,
    CLEAR_CURRENT_REQUEST,
    SET_CURRENT_REQUEST,
} from "../types";

let initialValues = {
    data: {
        email: null,
        requests: [],
    },
    auth: null,
    currentRequest: {},
};

export default function userReducer(state = initialValues, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                data: { ...state.data, ...action.payload.data },
                auth: action.payload.auth,
            };

        case SIGN_OUT:
            return { ...state, data: { ...initialValues.data }, auth: false };

        case UPDATE_USER_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload.data,
                },
            };

        case UPDATE_USER_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload.data,
                },
            };

        case SET_CURRENT_REQUEST:
            return {
                ...state,
                currentRequest: action.payload.currentRequest[0],
            };

        case CLEAR_CURRENT_REQUEST:
            return {
                ...state,
                currentRequest: {},
            };

        default:
            return state;
    }
}
