import React from "react";
import { useSelector } from "react-redux";

import { CSSTransition } from "react-transition-group";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

import ItemCard from "../Common/ItemCard";

const Content = ({
    youtubeData,
    setItemView,
    itemView,
    oldRequestTextState,
}) => {
    return (
        <>
            {youtubeData.data.pageInfo ? (
                <div className="main-content__bottom">
                    <div className="content__inner">
                        <div className="content__header">
                            <div className="content__info">
                                <p>Видео по запросу «{oldRequestTextState}»</p>
                                <span>
                                    {youtubeData.data.pageInfo
                                        ? youtubeData.data.pageInfo.totalResults
                                        : null}
                                </span>
                            </div>
                            <div className="content__view">
                                <BarsOutlined
                                    onClick={() => setItemView("list")}
                                    style={{
                                        fontSize: "2.4rem",
                                        marginRight: "2rem",
                                        opacity: `${
                                            itemView === "list" ? 1 : 0.3
                                        }`,
                                    }}
                                />
                                <AppstoreOutlined
                                    onClick={() => setItemView("grid")}
                                    style={{
                                        fontSize: "2.4rem",
                                        opacity: `${
                                            itemView === "grid" ? 1 : 0.3
                                        }`,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="content__main">
                            {youtubeData.data.items &&
                            youtubeData.data.items.length ? (
                                youtubeData.data.items.map((item, _index) => (
                                    <CSSTransition
                                        key={item.id.videoId}
                                        in={true}
                                        appear={true}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <ItemCard
                                            key={
                                                item.snippet.description +
                                                _index
                                            }
                                            itemView={itemView}
                                            item={item}
                                        />
                                    </CSSTransition>
                                ))
                            ) : (
                                <>
                                    <CSSTransition
                                        in={true}
                                        appear={true}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <div className="not-found">
                                            <p>
                                                Упс... <br />
                                                <span>
                                                    {" "}
                                                    ничего не найдено
                                                </span>{" "}
                                                <br />
                                            </p>
                                        </div>
                                    </CSSTransition>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Content;
