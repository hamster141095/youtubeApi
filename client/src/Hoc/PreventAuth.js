import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PreventAuthRoute = (props) => {
    const user = useSelector((state) => state.userReducer);

    return <>{!user.auth ? <Redirect to="/auth" /> : props.children}</>;
};

export default PreventAuthRoute;
