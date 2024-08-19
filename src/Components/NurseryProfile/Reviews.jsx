import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { NurseryProfileService } from "../../Service/Api";

const Reviews = () => {
  const [reviews , setReviews] = useState([]);
  useEffect(()=>{
      GetData();
  },[]);
  async function GetData() {
      try {

          const response = await NurseryProfileService.ListReviews();
          setReviews(response.content);
          
      } catch (error) {
          console.log(error)

      }
  }
  return (
    <div className="NurseryContainer NurseryGallery ">
      {/* <div className="AddGallery">
        <span onClick={() => setIsOverlayOpen(true)}> <FontAwesomeIcon  icon={faPlus}/> Add</span>
      </div> */}

        <div className="ReviewsContainer">
          <div className="Container">

              {reviews.length>0?reviews.map((review)=>(
                <ReviewItem
                  key={review.id}
                  name={review.user_name}
                  text={review.review}
                  rate={review.rate}
                />
              )):
              <div className="Center">

                <span>No reviews added yet</span>
              </div>
              }
              
            
          </div>
        </div>
      
    </div>
  );
};

export default Reviews;
