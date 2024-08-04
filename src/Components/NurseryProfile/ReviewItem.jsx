import React from "react";
import UserImage from '../../Assets/images/User.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ()=>{
    return(
        <div className="ReviewItem">
            <div className="ReviewImageAndHeader">
                <div className="NurseryReviewImage">
                    <img src={UserImage} width="100%" alt="" />
                </div>
                <div className="ReviewText">
                    <div className="ReviewTitle">
                        <span className="">Holiday Nursery</span>

                    </div>
                    <div className="ReviewBody">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. At culpa odio praesentium amet aliquam perspiciatis harum optio maiores, illo ab, voluptatibus assumenda doloremque autem quo consequatur. Exercitationem neque incidunt quod.</span>
                    </div>
                </div>

            </div>
            <div className="ReviewStars Center">
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
            </div>
        </div>
    );
}
export default ReviewItem;