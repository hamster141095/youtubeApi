import {
    GET_YOUTUBE_DATA,
    CLEAR_YOUTUBE_DATA,
    SET_IS_LOADING,
    UPDATE_YOUTUBE_DATA,
    SET_REQUEST_TEXT,
    SET_OLD_REQUEST_TEXT,
} from "../types";
let initialValues = {
    data: {},
    isLoading: null,
    requestText: "",
    oldRequestText: "",
};

export default function itemReducer(state = initialValues, action) {
    switch (action.type) {
        case GET_YOUTUBE_DATA:
            return {
                ...state,
                data: { ...state.data, ...action.payload.data },
            };

        case UPDATE_YOUTUBE_DATA:
            return {
                ...state,
                data: { ...state.data.items, ...action.payload.data },
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_REQUEST_TEXT:
            return {
                ...state,
                requestText: action.payload,
            };

        case SET_OLD_REQUEST_TEXT:
            return {
                ...state,
                oldRequestText: action.payload,
            };

        case CLEAR_YOUTUBE_DATA:
            return { ...state, data: {} };

        default:
            return state;
    }
}
