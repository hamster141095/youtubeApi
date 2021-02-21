import * as items from "./index";
import axios from "axios";
import { responsiveMap } from "antd/lib/_util/responsiveObserve";

// let KEY = "AIzaSyC239kkjsmeCk7yBDEkxBy_QFG2rLrMkOk";
let API_KEY = "AIzaSyCWk1di-Zdep2-ikvtqvMKY9dGj25TyWW4";
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
        // console.log(id);
        try {
            let statistics = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${API_KEY}`
            );
            // console.log(statistics);
            let data = statistics.data.items[0].statistics;
            let oldData = getState().itemReducer;
            // console.log(data);

            // console.log(oldData);

            // let newState = Object.entries(oldData)[0][1].items.map((item) => {
            //     if (item.id.videoId === id) {
            //         return { ...item, ...data };
            //     }
            // });

            // let item = oldData.data.items.filter(
            //     (item) => item.id.videoId === id
            // );

            // let newItem = { item, ...data };

            // let newState = oldData.data.items.map((item) => {
            //     if (item.id.videoId === newItem.item[0].id.videoId) {
            //         return newItem;
            //     } else return item;
            // });

            // let newItem = { item, ...data };

            let oldItem = oldData.data.items.filter((item) => {
                return item.id.videoId === id;
            });

            // console.log(newItem);
            // console.log({ ...oldItem[0], ...data });

            return (data = { ...oldItem[0], ...data });

            // dispatch(items.updateYoutubeData(newState));
            // console.log(data);
        } catch (error) {
            console.log(error);
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

//  https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=bcBfjugpWI0&key=[YOUR_API_KEY]
