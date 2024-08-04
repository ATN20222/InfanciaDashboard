import { faBell, faCommentDollar, faPlus, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './NurseryProfile.css';
import UserImage from '../../Assets/images/User.jpg'
import Gallery from "../../Components/NurseryProfile/Gallery";
import Reviews from "../../Components/NurseryProfile/Reviews";
import BasicInfo from "../../Components/NurseryProfile/BasicInfo";
import PaymentNurseryProfile from "../../Components/NurseryProfile/PaymentNurseryProfile";


const NurseryProfile = () => {


    

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className=" Container ">
                <div className="NurseryProfileTopPart">
                    <div className="row">
                        <div className="col-lg-12 NurseryProfileTopPartCol Center">
                            <div className="NurseryProfileImage">
                                <img src={UserImage} width="100%" alt="" />
                            </div>
                            <span className="NurseryProfileTitle">Nursery Profile</span>
                        </div>
                        <div className="col-lg-12 RatingNurseryCol">
                            
                                <div className="NurseryProfileRatingCol">
                                    <div className="NurseryProfileLine"></div>
                                </div>
                                <div className="NurseryRatingText">
                                    <span className="NurseryRating">
                                        <FontAwesomeIcon icon={faStar}/> <span className="RatingNumber">  5.00 | Rating</span>
                                    </span>
                                </div>
                                <div className="NurseryProfileRatingCol">
                                    <div className="NurseryProfileLine"></div>

                                </div>
                            
                        </div>

                        <div className="col-lg-12 NuseryProfileTabbing">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span>Basic Info</span>
                                        
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span>Gallery</span>
                                        
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3  NuseryProfileTabbingCol">
                                        <span>Reviews</span>
                                        
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span>Payment</span>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div> 
            </div>
            
           {/* <Gallery/> */}
           {/* <Reviews/> */}
           {/* <BasicInfo/> */}
           <PaymentNurseryProfile/>
        </section>
    );
};

export default NurseryProfile;
