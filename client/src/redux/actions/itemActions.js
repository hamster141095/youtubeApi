import * as items from "./index";
import axios from "axios";

let API_KEY = "AIzaSyAy1fuze_cpwTwgJOGPLZT6KsoH3Zn7pUQ";
const getVideo = (data) => {
    if (typeof data === "string") {
        return axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=relevance&q=${data}&type=video&key=${API_KEY}`
        );
    } else if (typeof data === "object") {
        return axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${data[1]}&order=${data[2]}&q=${data[0]}&type=video&key=${API_KEY}`
        );
    }
};

export const getRating = (id) => {
    return async (dispatch, getState) => {
        try {
            let statistics = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${API_KEY}`
            );
            let data = statistics.data.items[0].statistics;
            let oldData = getState().itemReducer;

            let oldItem = oldData.data.items.filter((item) => {
                return item.id.videoId === id;
            });

            return (data = { ...oldItem[0], ...data });
        } catch (error) {
            dispatch(items.errorGlobal(error.response.data.message));
        }
    };
};

export const getYouTubeData = (data) => {
    return async (dispatch, getState) => {
        try {
            const isLoading = getState().itemReducer.isLoading;
            if (isLoading) {
                dispatch(items.setIsLoading(false));
            }
            const youtubeData = await getVideo(data);
            dispatch(items.getYouTubeData(youtubeData));
            dispatch(items.setIsLoading(true));
        } catch (error) {
            dispatch(items.errorGlobal(error.response.data.message));
        }
    };
};
