import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Form, Button, Input } from "antd";

import { registerUser, signInUser } from "../../redux/actions/userActions";
import { clearNotification } from "../../redux/actions";

const Auth = (props) => {
    const dispatch = useDispatch();

    const [tab, setTab] = useState(true);

    const notification = useSelector((state) => state.notificationReducer);
    const isAuth = useSelector((state) => state.userReducer.auth);

    const handleSumbit = (data) => {
        if (tab) {
            dispatch(registerUser(data));
        } else {
            dispatch(signInUser(data));
        }
    };

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
            dispatch(clearNotification());
        }
    }, [isAuth]);

    useEffect(() => {
        if (notification && notification.success) {
            setTab(false);
        }
        if (!tab && notification.error) {
            setTab(false);
        }
    }, [notification]);

    return (
        <div className="container container-auth">
            <Row className="auth">
                <Col
                    className="auth__inner"
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 12, offset: 6 }}
                    md={{ span: 10, offset: 7 }}
                    lg={{ span: 12, offset: 6 }}
                    xl={{ span: 8, offset: 8 }}
                    xxl={{ span: 6, offset: 9 }}
                >
                    <Col className="auth__logo">
                        <img src="./images/logo.svg" />
                    </Col>
                    <Col className="auth__title">
                        {tab ? "Регистрация" : "Вход"}
                    </Col>
                    <Col>
                        <div className="auth__notification">
                            {notification.error ? notification.msg : null}
                        </div>
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            className="form form__auth"
                            name="auth"
                            initialValues={{}}
                            onFinish={(values) => handleSumbit(values)}
                        >
                            <Form.Item
                                className="form__item"
                                name="email"
                                label="Логин"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Пожалуйста, введите ваш email",
                                    },
                                ]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Введите ваш email"
                                    className="from__input"
                                />
                            </Form.Item>

                            <Form.Item
                                className="form__item"
                                name="password"
                                label="Пароль"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Пожалуйста, введите ваш пароль",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Введите ваш пароль"
                                    className="auth-input"
                                />
                            </Form.Item>
                            <Row>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button
                                            className="form__button"
                                            size="large"
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            {tab
                                                ? "Зарегистрироваться"
                                                : "Войти"}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <span
                                    className="auth__toggle"
                                    onClick={() => {
                                        setTab(!tab);
                                        dispatch(clearNotification());
                                    }}
                                >
                                    {tab
                                        ? "Перейти на форму авторизации"
                                        : "Перейти на форму регистрации"}
                                </span>
                            </Form.Item>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default Auth;
