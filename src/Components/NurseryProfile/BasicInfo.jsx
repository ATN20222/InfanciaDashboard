import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHome, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";

const BasicInfo = () => {

  return (
    <div className="NurseryContainer NurseryGallery">
      {/* <div className="AddGallery">
        <span onClick={() => setIsOverlayOpen(true)}> <FontAwesomeIcon  icon={faPlus}/> Add</span>
      </div> */}
      

        <div className="">
          <div className="Container">
            <div className="ContactInfo">
                <div className="AddGallery HeaderInfo">
                    <span> Contact Information</span>
                </div>
                <ul className="list-unstyled">
                    <li className="list-group-item"> 
                        <FontAwesomeIcon icon={faHome}/> erz3 raz3 bate5a , Nacr City ,Ciro , Egypt
                    </li>
                    <li className="list-group-item"> 
                        <FontAwesomeIcon icon={faPhoneVolume}/> (+20)021218445448
                    </li>
                </ul>
            </div>
            <div className="InfoAbout">
                <div className="AddGallery HeaderInfo">
                    <span>About</span>
                </div>
                <div className="AboutInfoText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore vero asperiores obcaecati, veritatis officia quasi assumenda nesciunt tenetur praesentium sit molestias similique corporis aspernatur impedit maiores incidunt ex quia libero?
                </div>
            </div>
            <div className="StartFees">
            <div className="AddGallery HeaderInfo">
                    <span>Start Fees</span>
                </div>
                <div className="AboutInfoText">
                    700$
                </div>
            </div>
            <div className="ContactInfo ProvidedServices">
                <div className="AddGallery HeaderInfo">
                    <span>Provided Services</span>
                </div>
                <ul className="list-unstyled">
                    <li className="list-group-item"> 
                       <FontAwesomeIcon icon={faCircle}/> Bus
                    </li>
                    <li className="list-group-item"> 
                    <FontAwesomeIcon icon={faCircle}/> Language
                    </li>
                </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BasicInfo;
