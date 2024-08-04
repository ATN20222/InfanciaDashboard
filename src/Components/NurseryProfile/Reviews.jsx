import React, { useState } from "react";
import ReviewItem from "./ReviewItem";

const Reviews = () => {

  return (
    <div className="NurseryContainer NurseryGallery">
      {/* <div className="AddGallery">
        <span onClick={() => setIsOverlayOpen(true)}> <FontAwesomeIcon  icon={faPlus}/> Add</span>
      </div> */}

        <div className="ReviewsContainer">
          <div className="Container">
            
              
              <ReviewItem/>
              <ReviewItem/>
              <ReviewItem/>
            
          </div>
        </div>
      
    </div>
  );
};

export default Reviews;
