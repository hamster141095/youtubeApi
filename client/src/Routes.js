import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";

import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";

import { isAuthUser } from "./redux/actions/userActions";
import Favorite from "./Components/Favorite/Favorite";
import HeaderComponent from "./Components/Header/Header";

import { clearYouTubeData } from "./redux/actions";

// all

// const runSearchAction = (item = null, requestText = null, activeClass = null) {
//     dispatch(clearYouTubeData())
//     if (requestText) {
//         dispatch(getYouTubeData(requestText));
//     }

// }

// //favorites
// const runSearchAction = (item) => {
//     dispatch(clearYouTubeData());
//     dispatch(setCurrentRequest(item.id));
//     props.history.push("/");
//     dispatch(getYouTubeData([item.title, item.size, item.sort]));
// };

// // home
// const searchAction = () => {
//     if (requestText) {
//         dispatch(clearYouTubeData());
//         dispatch(getYouTubeData(requestText));
//         if (!activeClass) {
//             setActiveClass(!activeClass);
//         }
//     }
// };

const Routes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuthUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="wrapper">
                <HeaderComponent />

                <Switch>
                    <Route path="/auth" component={Auth}></Route>
                    <Route path="/favorites" component={Favorite} />

                    <Route path="/" component={Home} />
                </Switch>
            </div>

            <GoogleFontLoader
                fonts={[{ font: "Roboto", weights: [400, 500] }]}
            />
        </BrowserRouter>
    );
};

export default Routes;
