import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./Routes";

import "./styles/main.css";
import "antd/dist/antd.css";
import "./styles/index.scss";

import ReduxStore from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ReduxStore()}>
            <Routes />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
