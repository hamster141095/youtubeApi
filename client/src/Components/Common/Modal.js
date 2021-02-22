import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuid_v4 } from "uuid";
import {
    Form,
    Input,
    Button,
    InputNumber,
    Slider,
    Select,
    Row,
    Col,
} from "antd";

import { addRequest, editRequest } from "../../redux/actions/userActions";
import { clearCurrentRequest } from "../../redux/actions";

const Modal = ({ setShowModalBig, requestTextState, currentRequest }) => {
    const dispatch = useDispatch();

    const [sizeValue, setSizeValue] = useState(
        currentRequest ? currentRequest.size : 12
    );

    const onFinishAction = (values) => {
        if (currentRequest) {
            setShowModalBig(false);
            dispatch(
                editRequest({
                    ...values,
                    size: sizeValue,
                    id: currentRequest.id,
                })
            );
        } else {
            dispatch(addRequest({ ...values, size: sizeValue, id: uuid_v4() }));
            setShowModalBig(false);
        }
    };

    useEffect(() => {
        document.getElementById("header").style.display = "none";
        return () => {
            document.getElementById("header").style.display = "block";
        };
    }, []);

    return (
        <Row className="modal">
            <Col
                className="modal__inner"
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 12, offset: 6 }}
                xl={{ span: 10, offset: 7 }}
                xxl={{ span: 10, offset: 7 }}
            >
                <Row>
                    <Col offset={1} span={22}>
                        <h3 className="modal__title">
                            {currentRequest
                                ? "Изменить запрос"
                                : "Сохранить запрос"}
                        </h3>
                    </Col>
                </Row>
                <Form
                    className="modal__form"
                    name="saverequest"
                    initialValues={{
                        title: currentRequest
                            ? currentRequest.title
                            : requestTextState,
                        name: currentRequest ? currentRequest.name : "",
                        sort: currentRequest
                            ? currentRequest.sort
                            : "relevance",
                        size: currentRequest ? currentRequest.size : "12",
                    }}
                    onFinish={(values) => onFinishAction(values)}
                >
                    <Form.Item
                        className="modal__item"
                        label="Запрос"
                        name="title"
                    >
                        <Input
                            className="modal__input"
                            disabled={currentRequest ? false : true}
                        />
                    </Form.Item>

                    <Form.Item
                        className="modal__item"
                        label="Название"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите название запроса",
                            },
                        ]}
                    >
                        <Input
                            className="modal__input"
                            placeholder="Укажите название"
                        />
                    </Form.Item>

                    <Form.Item
                        className="modal__item"
                        label="Сортировать по"
                        name="sort"
                    >
                        <Select className="modal__select">
                            <Select.Option value="relevance">
                                Без сортировки
                            </Select.Option>
                            <Select.Option value="date">По дате</Select.Option>
                            <Select.Option value="rating">
                                По рейтингу
                            </Select.Option>
                            <Select.Option value="title">
                                По названию
                            </Select.Option>
                            <Select.Option value="videoCount">
                                По количеству видео
                            </Select.Option>
                            <Select.Option value="viewCount">
                                По количеству просмотров
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="modal__item"
                        label="Максимальное количество"
                        name="size"
                    >
                        <Row>
                            <Col span={18}>
                                <Slider
                                    name="size"
                                    className="modal__slider"
                                    min={1}
                                    max={50}
                                    onChange={(value) => setSizeValue(value)}
                                    value={
                                        typeof sizeValue === "number"
                                            ? sizeValue
                                            : 0
                                    }
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    name="size"
                                    className="modal__number"
                                    min={1}
                                    max={50}
                                    value={sizeValue}
                                    onChange={(value) => setSizeValue(value)}
                                />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item className="modal__button">
                        <Row>
                            <Col span={10} offset={1}>
                                <Button
                                    onClick={() => {
                                        setShowModalBig(false);
                                        dispatch(clearCurrentRequest());
                                    }}
                                    className="button__back"
                                >
                                    Назад
                                </Button>
                            </Col>

                            <Col span={10} offset={1}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="button__send"
                                >
                                    Сохранить
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Modal;
