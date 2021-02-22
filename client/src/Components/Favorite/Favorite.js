import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { List } from "antd";
import {
    PlayCircleOutlined,
    EditOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

import {
    deleteRequest,
    setCurrentRequest,
} from "../../redux/actions/userActions";
import {
    clearYouTubeData,
    setCurrentRequestText,
    setOldtRequestText,
} from "../../redux/actions";
import PreventAuthRoute from "../../Hoc/PreventAuth";
import Modal from "../Common/Modal";
import { getYouTubeData } from "../../redux/actions/itemActions";

const Favorite = (props) => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.userReducer.data.requests);
    const user = useSelector((state) => state.userReducer);

    const [showModal, setShowModalBig] = useState(false);

    const editAction = (item) => {
        dispatch(setCurrentRequest(item.id));
        setShowModalBig(true);
    };

    const runSearchAction = (item) => {
        dispatch(clearYouTubeData());
        dispatch(setCurrentRequest(item.id));
        dispatch(setCurrentRequestText(item.title));
        dispatch(setOldtRequestText(item.title));
        props.history.push("/");
        dispatch(getYouTubeData([item.title, item.size, item.sort]));
    };

    return (
        <>
            <PreventAuthRoute>
                {showModal ? (
                    <Modal
                        currentRequest={user.currentRequest}
                        setShowModalBig={setShowModalBig}
                    />
                ) : (
                    <div className="main-content">
                        <div className="maim-content__inner">
                            {data && data.length ? (
                                <List
                                    size="large"
                                    header={
                                        <div className="list-header">
                                            Избранное
                                        </div>
                                    }
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <div className="list__buttons">
                                                <PlayCircleOutlined
                                                    style={{
                                                        fontSize: "1.8rem",
                                                    }}
                                                    onClick={() =>
                                                        runSearchAction(item)
                                                    }
                                                />
                                                <EditOutlined
                                                    onClick={() => {
                                                        editAction(item);
                                                    }}
                                                    style={{
                                                        fontSize: "1.8rem",
                                                    }}
                                                />
                                                <CloseCircleOutlined
                                                    onClick={() =>
                                                        dispatch(
                                                            deleteRequest(
                                                                user.data._id,
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                    style={{
                                                        fontSize: "1.8rem",
                                                    }}
                                                />
                                            </div>

                                            {item.title}
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <List
                                    size="large"
                                    header={
                                        <div className="list-header">
                                            Избранное
                                        </div>
                                    }
                                ></List>
                            )}
                        </div>
                    </div>
                )}
            </PreventAuthRoute>
        </>
    );
};

export default Favorite;
