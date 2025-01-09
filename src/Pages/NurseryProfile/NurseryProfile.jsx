import { faBell, faCommentDollar, faPen, faPlus, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './NurseryProfile.css';
import UserImage from '../../Assets/images/HeaderLogo.png';
import Gallery from "../../Components/NurseryProfile/Gallery";
import Reviews from "../../Components/NurseryProfile/Reviews";
import BasicInfo from "../../Components/NurseryProfile/BasicInfo";
import PaymentNurseryProfile from "../../Components/NurseryProfile/PaymentNurseryProfile";
import EditProfilePopup from "../../Components/NurseryProfile/EditProfilePopup";
import { NurseryProfileService } from "../../Service/Api";

const NurseryProfile = () => {
    const [activeTab, setActiveTab] = useState('basicInfo');
    const [showPopup, setShowPopup] = useState(false);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [name , setName] = useState('');
    useEffect(()=>{
        GetData();
    },[])

    async function GetData() {
        try {
            const response = await NurseryProfileService.ListInfo();
            setImage(response.content.media.length>0?response.content.media[response.content.media.length-1].original_url:null);
            setRating(response.content.rates);
            setName(response.content.name);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container">
                <div className="NurseryProfileTopPart">
                    <span className="EditNurseryProfileBtn" onClick={() => setShowPopup(true)}>
                        <FontAwesomeIcon icon={faPen} />
                    </span>
                    <EditProfilePopup show={showPopup} onClose={() => setShowPopup(false)} />
                    <div className="row">
                        <div className="col-lg-12 NurseryProfileTopPartCol Center">
                            <div className="NurseryProfileImage">
                                <img src={image?image:UserImage} width="100%" alt="" />
                            </div>
                            <span className="NurseryProfileTitle">{name?name:'Nursery Profile'}</span>
                        </div>
                        <div className="col-lg-12 RatingNurseryCol">
                            <div className="NurseryProfileRatingCol">
                                <div className="NurseryProfileLine"></div>
                            </div>
                            <div className="NurseryRatingText">
                                <span className="NurseryRating">
                                    <FontAwesomeIcon icon={faStar} /> <span className="RatingNumber">  {rating} | Rating</span>
                                </span>
                            </div>
                            <div className="NurseryProfileRatingCol">
                                <div className="NurseryProfileLine"></div>
                            </div>
                        </div>
                        <div className="col-lg-12 NuseryProfileTabbing">
                            <div className="container">
                                <div className="row Center">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span
                                            className={activeTab === 'basicInfo' ? 'ProfileActive' : ''}
                                            onClick={() => handleTabClick('basicInfo')}
                                        >
                                            Info
                                        </span>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span
                                            className={activeTab === 'gallery' ? 'ProfileActive' : ''}
                                            onClick={() => handleTabClick('gallery')}
                                        >
                                            Gallery
                                        </span>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span
                                            className={activeTab === 'reviews' ? 'ProfileActive' : ''}
                                            onClick={() => handleTabClick('reviews')}
                                        >
                                            Reviews
                                        </span>
                                    </div>
                                    {/* <div className="col-lg-3 col-md-3 col-sm-3 col-3 NuseryProfileTabbingCol">
                                        <span 
                                            className={activeTab === 'payment' ? 'ProfileActive' : ''}
                                            onClick={() => handleTabClick('payment')}
                                        >
                                            Payment
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {activeTab === 'basicInfo' && <BasicInfo />}
            {activeTab === 'gallery' && <Gallery />}
            {activeTab === 'reviews' && <Reviews />}
            {/* {activeTab === 'payment' && <PaymentNurseryProfile />} */}
        </section>
    );
};

export default NurseryProfile;
