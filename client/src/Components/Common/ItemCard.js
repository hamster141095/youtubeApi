import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import classNames from "classnames";
import Moment from "react-moment";

import { sliceCount, sliceTitle } from "../../utils/tools";
import { getRating } from "../../redux/actions/itemActions";

const ItemCard = ({ itemView, item }) => {
    const [views, setViews] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (item) {
            dispatch(getRating(item.id.videoId)).then((data) =>
                setViews(data.viewCount)
            );
        }
    }, []);

    const [showIframe, setShowIframe] = useState(false);
    const { snippet } = item;
    const { thumbnails, description, channelTitle, publishedAt } = snippet;
    return (
        <>
            <Card
                onClick={() => setShowIframe(!showIframe)}
                className={classNames("", {
                    card_big: itemView === "list",
                })}
                hoverable
                style={{
                    width: 245,
                    height: 226,
                    marginBottom: "2rem",
                    backgroundColor: "#fafafa",
                }}
                cover={
                    showIframe ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${item.id.videoId}`}
                            frameBorder="0"
                            title="video"
                        />
                    ) : (
                        <img alt="example" src={thumbnails.medium.url} />
                    )
                }
            >
                {itemView === "list" ? null : (
                    <div className="itemcard__pretitle">
                        {sliceTitle(description)}
                    </div>
                )}

                <Card.Meta
                    title={itemView === "list" ? description : ""}
                    description={
                        itemView === "list"
                            ? channelTitle
                            : sliceTitle(channelTitle)
                    }
                />
                <div className="itemcard__info">
                    <Moment format="D MMM YYYY" withTitle>
                        {publishedAt}
                    </Moment>

                    <span className="itemcard__views">
                        {sliceCount(views)} просмотров
                    </span>
                </div>
            </Card>
        </>
    );
};

export default ItemCard;
