import {
    SIGN_OUT,
    SIGN_IN,
    UPDATE_USER_DATA,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    GET_YOUTUBE_DATA,
    CLEAR_YOUTUBE_DATA,
    UPDATE_YOUTUBE_DATA,
    SET_IS_LOADING,
    SET_REQUEST_TEXT,
    SET_OLD_REQUEST_TEXT,
    CLEAR_CURRENT_REQUEST,
    ADD_REQUEST,
    SET_CURRENT_REQUEST,
    UPDATE_USER_REQUESTS,
} from "../types";

/// user ///

export const signInUser = (data) => ({
    type: SIGN_IN,
    payload: data,
});

export const signOutUser = () => ({
    type: SIGN_OUT,
});

export const updateUserData = (data) => ({
    type: UPDATE_USER_DATA,
    payload: data,
});

export const updateUserRequests = (data) => ({
    type: UPDATE_USER_REQUESTS,
    payload: data,
});

/// notification ///

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg,
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg,
});

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION,
        });
    };
};

/// items ///

export const getYouTubeData = (data) => ({
    type: GET_YOUTUBE_DATA,
    payload: data,
});

export const clearYouTubeData = () => ({
    type: CLEAR_YOUTUBE_DATA,
});

export const setIsLoading = (isLoading) => ({
    type: SET_IS_LOADING,
    payload: isLoading,
});

export const updateYoutubeData = (data) => ({
    type: UPDATE_YOUTUBE_DATA,
    payload: data,
});

export const setCurrentRequestText = (text) => ({
    type: SET_REQUEST_TEXT,
    payload: text,
});
export const setOldtRequestText = (text) => ({
    type: SET_OLD_REQUEST_TEXT,
    payload: text,
});

/// request ///

export const clearCurrentRequest = () => ({
    type: CLEAR_CURRENT_REQUEST,
});

export const addRequest = (data) => ({
    type: ADD_REQUEST,
    payload: data,
});

export const deleteRequest = (id) => ({
    type: ADD_REQUEST,
    payload: id,
});

export const setCurrentRequest = (data) => ({
    type: SET_CURRENT_REQUEST,
    payload: data,
});
