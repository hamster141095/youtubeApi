import * as users from "./index";
import axios from "axios";
import {
    getTokenCookie,
    removeTokenCookie,
    getAuthHeader,
} from "../../utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerUser = (data) => {
    return async (dispatch) => {
        try {
            const user = await axios.post("/api/users/register", {
                email: data.email,
                password: data.password,
            });
            dispatch(users.signInUser({ data: user.data, auth: false }));
            dispatch(users.successGlobal());
        } catch (error) {
            dispatch(users.errorGlobal(error.response.data.message));
        }
    };
};

export const signInUser = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/users/signin`, {
                email: values.email,
                password: values.password,
            });

            dispatch(users.signInUser({ data: user.data, auth: true }));
            dispatch(users.successGlobal("Welcome"));
        } catch (error) {
            dispatch(
                users.errorGlobal("Упс... Кажется вы ввели что-то не правильно")
            );
        }
    };
};

export const isAuthUser = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error();
            }

            const user = await axios.get(`/api/users/isauth`, getAuthHeader());
            dispatch(users.signInUser({ data: user.data, auth: true }));
        } catch (error) {
            dispatch(users.signInUser({ data: {}, auth: false }));
        }
    };
};

export const signOutUser = () => {
    return async (dispatch) => {
        removeTokenCookie();
        dispatch(users.signOutUser());
    };
};

export const addRequest = (data) => {
    return async (dispatch) => {
        try {
            const request = await axios.patch(
                "/api/users/addreq",
                {
                    data: data,
                },
                getAuthHeader()
            );

            dispatch(users.successGlobal("Request added"));
            dispatch(users.updateUserData(request));
        } catch (error) {
            users.errorGlobal("Упс... Кажется запрос не добавился");
        }
    };
};

export const editRequest = (data) => {
    return async (dispatch) => {
        try {
            const request = await axios.patch(
                "/api/users/editreq",

                { id: data.id, data: data },
                getAuthHeader()
            );

            dispatch(users.successGlobal("Request edit"));
            dispatch(users.updateUserData(request));
            dispatch(users.clearCurrentRequest());
            dispatch(users.clearNotification());
        } catch (error) {
            users.errorGlobal("Упс... Кажется запрос не изменился");
        }
    };
};

export const deleteRequest = (_id, id) => {
    return async (dispatch) => {
        try {
            const doc = await axios.patch(
                "/api/users/removereq",
                { _id: _id, id: id },
                getAuthHeader()
            );

            dispatch(users.updateUserData(doc));
            dispatch(users.successGlobal("Request deleted"));
            dispatch(users.clearNotification());
        } catch (error) {
            users.errorGlobal("Упс... Кажется запрос не удалился");
        }
    };
};

export const setCurrentRequest = (id) => {
    return (dispatch, getState) => {
        const requests = getState().userReducer.data.requests;

        const currentRequest = requests.filter((item) => item.id === id);
        const newState = {
            ...getState().userReducer.currentRequest,
            currentRequest,
        };

        dispatch(users.setCurrentRequest(newState));
    };
};
