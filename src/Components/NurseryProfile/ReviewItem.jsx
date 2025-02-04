import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const ReviewItem = ({ name, text, rate, userImage }) => {
    const renderStars = (rate) => {
        console.log(rate);
        const stars = [];
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rate);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
        }

        if (halfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} />);
        }

        return stars;
    };

    return (
        <div className="ReviewItem">
            <div className="ReviewImageAndHeader">
                <div className="ReviewText">
                    <div className="ReviewTitle d-flex align-items-center">
                        <div className="PublisherImageContainer" >
                            <img src={userImage} alt={userImage} />
                        </div>
                        <span className="p-3">{name}</span>
                    </div>
                    <div className="ReviewBody mt-4">
                        <span>{text}</span>
                    </div>
                </div>
            </div>
            <div className="ReviewStars Center">
                {renderStars(rate)}
            </div>
        </div>
    );
};

export default ReviewItem;
