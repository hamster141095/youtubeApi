import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";

import { Col, Layout, Menu, Row } from "antd";

import { signOutUser } from "../../redux/actions/userActions";
import { changeTitle } from "../../utils/tools";
import { clearYouTubeData, setCurrentRequestText } from "../../redux/actions";

const { Header } = Layout;

const HeaderComponent = (props) => {
    const apiPath = props.location.pathname.split("/");

    const dispatch = useDispatch();

    const signOutAction = () => {
        dispatch(signOutUser());
        dispatch(clearYouTubeData());
        dispatch(setCurrentRequestText(""));
    };

    useEffect(() => {
        document.title = changeTitle(apiPath[1]);
    }, [apiPath[1]]);

    return (
        <>
            <div
                id="header"
                className="header-wrapper"
                style={{
                    display: `${
                        props.location.pathname.split("/")[1] === "auth"
                            ? "none"
                            : ""
                    }`,
                }}
            >
                <Header
                    style={{ position: "sticky", top: "0", zIndex: "1" }}
                    className="local-container"
                >
                    <Row>
                        <Col flex={1}></Col>
                        <Col flex={0.5}>
                            <NavLink to="/">
                                <img
                                    className="logo logo-search"
                                    src="./images/logo.svg"
                                    alt="logo_sibdev"
                                />
                            </NavLink>
                        </Col>
                        <Col flex={0.5}>
                            <NavLink
                                className={"menu__link"}
                                activeClassName={
                                    apiPath[1] === ""
                                        ? "menu__link menu__link_active"
                                        : ""
                                }
                                to="/"
                            >
                                Поиск
                            </NavLink>
                        </Col>
                        <Col flex={10}>
                            <NavLink
                                className={"menu__link"}
                                to="/favorites"
                                activeClassName={
                                    apiPath[1] === "favorites"
                                        ? "menu__link menu__link_active"
                                        : ""
                                }
                            >
                                Избранное
                            </NavLink>
                        </Col>
                        <Col flex={2}>
                            <NavLink
                                className="menu__link"
                                to="/auth"
                                onClick={signOutAction}
                            >
                                Выйти
                            </NavLink>
                        </Col>
                    </Row>
                </Header>
            </div>
        </>
    );
};

export default withRouter(HeaderComponent);
