import cookie from "react-cookies";

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeTokenCookie = () =>
    cookie.remove("x-access-token", { path: "/" });
export const getAuthHeader = () => {
    return { headers: { "x-access-token": getTokenCookie() } };
};

export const sliceTitle = (title) => {
    if (title.length > 50) {
        return title.slice(0, 30) + "...";
    } else {
        return title;
    }
};

export const sliceCount = (count = 0) => {
    if (count.length < 4) {
        return Math.ceil(count);
    } else if (count.length >= 4 && count.length <= 6) {
        return Math.ceil(count / 1000) + " тыс ";
    } else if (count.length > 6) {
        return Math.ceil(count / 1000000) + " млн ";
    }
};
