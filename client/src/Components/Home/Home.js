import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import { Layout, Row, Col, Form, Input, Button } from "antd";
import {
    HeartTwoTone,
    HeartOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

import Modal from "../Common/Modal";
import PreventAuthRoute from "../../Hoc/PreventAuth";
import { getYouTubeData } from "../../redux/actions/itemActions";
import Content from "./Content";
import {
    clearCurrentRequest,
    clearYouTubeData,
    setCurrentRequestText,
    setOldtRequestText,
} from "../../redux/actions";
import Loader from "../Common/Loader";

const Home = () => {
    const [activeClass, setActiveClass] = useState(false);
    let [requestText, setRequestText] = useState(null);
    const [favoriteReq, setFavoriteReq] = useState(false);
    const [showModalBig, setShowModalBig] = useState(false);
    const [itemView, setItemView] = useState("list");

    const youtubeData = useSelector((state) => state.itemReducer);
    const notification = useSelector((state) => state.notificationReducer);

    const dispatch = useDispatch();

    let currentRequest = useSelector(
        (state) => state.userReducer.currentRequest
    );
    const isLoading = useSelector((state) => state.itemReducer.isLoading);
    const requestTextState = useSelector(
        (state) => state.itemReducer.requestText
    );
    const oldRequestTextState = useSelector(
        (state) => state.itemReducer.oldRequestText
    );

    const modalRef = useRef();
    const action = () => {
        setShowModalBig(true);
    };

    const searchAction = () => {
        if (requestTextState) {
            dispatch(clearYouTubeData());
            dispatch(getYouTubeData(requestTextState));
            dispatch(setCurrentRequestText(requestTextState));
            dispatch(setOldtRequestText(requestTextState));
            if (!activeClass) {
                setActiveClass(!activeClass);
            }
            dispatch(clearCurrentRequest());
        }
    };

    const handleOutsideClick = (event) => {
        let path = event.path || (event.composedPath && event.composedPath());
        if (path) {
            if (!path.includes(modalRef.current)) {
                setFavoriteReq(false);
            }
        }
    };

    const setActualRequestText = (e) => {
        if (e) {
            dispatch(setCurrentRequestText(e.target.value));
        } else {
            dispatch(setCurrentRequestText(""));
        }
    };

    useEffect(() => {
        if (notification.msg === "Request added") {
            setShowModalBig(false);
            setFavoriteReq(true);
        }
    }, [notification]);

    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
    }, []);

    return (
        <>
            <PreventAuthRoute>
                {showModalBig ? (
                    <Modal
                        setShowModalBig={setShowModalBig}
                        requestTextState={requestTextState}
                    />
                ) : (
                    <Row>
                        <Col span={24}>
                            <Layout className="layout">
                                <div className="container">
                                    <Layout.Content>
                                        <div className="main-content">
                                            <div
                                                className={classNames(
                                                    "main-content__top",
                                                    {
                                                        main_content__top_active:
                                                            activeClass ||
                                                            currentRequest.name ||
                                                            youtubeData.data
                                                                .kind,
                                                    }
                                                )}
                                            >
                                                <h2
                                                    className={classNames(
                                                        "title",
                                                        {
                                                            title_active:
                                                                activeClass ||
                                                                currentRequest.name ||
                                                                youtubeData.data
                                                                    .kind,
                                                        }
                                                    )}
                                                >
                                                    Поиск видео
                                                </h2>
                                                <Form
                                                    className={classNames(
                                                        "search-form",
                                                        {
                                                            search_form_active:
                                                                activeClass ||
                                                                currentRequest.name ||
                                                                youtubeData.data
                                                                    .kind,
                                                        }
                                                    )}
                                                    onFinish={searchAction}
                                                    initialValues={{
                                                        title: requestTextState,
                                                    }}
                                                >
                                                    <Form.Item
                                                        className={classNames(
                                                            "search-form__item",
                                                            {
                                                                search_form__item_active:
                                                                    activeClass ||
                                                                    currentRequest.name ||
                                                                    youtubeData
                                                                        .data
                                                                        .kind,
                                                            }
                                                        )}
                                                    >
                                                        {requestTextState ? (
                                                            <CloseCircleOutlined
                                                                onClick={() =>
                                                                    setActualRequestText(
                                                                        ""
                                                                    )
                                                                }
                                                                className="search-form__action-close"
                                                            />
                                                        ) : null}

                                                        <Input
                                                            name="title"
                                                            value={
                                                                requestTextState
                                                            }
                                                            onChange={(e) =>
                                                                setActualRequestText(
                                                                    e
                                                                )
                                                            }
                                                            className={classNames(
                                                                "search-form__input",
                                                                {
                                                                    search_form__input_active:
                                                                        activeClass ||
                                                                        currentRequest.name ||
                                                                        youtubeData
                                                                            .data
                                                                            .kind,
                                                                }
                                                            )}
                                                        />
                                                        {requestTextState &&
                                                        !favoriteReq ? (
                                                            <HeartOutlined
                                                                onClick={action}
                                                                className="search-form__action"
                                                            />
                                                        ) : null}
                                                        {requestTextState &&
                                                        favoriteReq ? (
                                                            <>
                                                                <HeartTwoTone
                                                                    onClick={
                                                                        action
                                                                    }
                                                                    className="search-form__action"
                                                                />
                                                                <div
                                                                    ref={
                                                                        modalRef
                                                                    }
                                                                    className="search-form__modal"
                                                                >
                                                                    <span>
                                                                        Поиск
                                                                        сохранён
                                                                        в
                                                                        разделе
                                                                        «Избранное»
                                                                    </span>
                                                                    <NavLink
                                                                        to="/favorites"
                                                                        className="search-form__link"
                                                                    >
                                                                        Перейти
                                                                        в
                                                                        избранное
                                                                    </NavLink>
                                                                </div>
                                                            </>
                                                        ) : null}

                                                        <Button
                                                            className={classNames(
                                                                "search-form__button",
                                                                {
                                                                    search_form__button_active:
                                                                        activeClass ||
                                                                        currentRequest.name ||
                                                                        youtubeData
                                                                            .data
                                                                            .kind,
                                                                }
                                                            )}
                                                            type="primary"
                                                            htmlType="submit"
                                                        >
                                                            Найти
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                            {(!isLoading && activeClass) ||
                                            (!isLoading &&
                                                currentRequest.name) ? (
                                                <Loader />
                                            ) : (
                                                <Content
                                                    oldRequestTextState={
                                                        oldRequestTextState
                                                    }
                                                    youtubeData={youtubeData}
                                                    setItemView={setItemView}
                                                    itemView={itemView}
                                                />
                                            )}
                                        </div>
                                    </Layout.Content>
                                </div>
                            </Layout>
                        </Col>
                    </Row>
                )}
            </PreventAuthRoute>
        </>
    );
};

export default Home;
