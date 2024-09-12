import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEnvelope, faHome, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { NurseryProfileService } from "../../Service/Api";

const BasicInfo = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    GetData();
  }, []);

  async function GetData() {
    try {
      const response = await NurseryProfileService.ListInfo();
      setInfo(response.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  return (
        <div className="NurseryContainer NurseryGallery">
            <div className="">
                <div className="Container">
                    <div className="ContactInfo">
                        <div className="AddGallery HeaderInfo">
                            <span>Contact Information</span>
                        </div>
                        <ul className="list-unstyled">
                        <li className="list-group-item">
                            <FontAwesomeIcon icon={faHome} /> {info.address}, {info.province}, {info.city}, {info.country}
                        </li>
                        <li className="list-group-item">
                            <FontAwesomeIcon icon={faPhoneVolume} /> {info.phone}
                        </li>
                        <li className="list-group-item">
                            <FontAwesomeIcon icon={faEnvelope} /> {info.email}
                        </li>
                        </ul>
                    </div>
                    <div className="InfoAbout">
                        <div className="AddGallery HeaderInfo">
                            <span>About</span>
                        </div>
                        <div className="AboutInfoText">{info.about}</div>
                    </div>
                    <div className="StartFees">
                        <div className="AddGallery HeaderInfo">
                            <span>Start Fees</span>
                        </div>
                        <div className="AboutInfoText">
                            {info.start_fees ? info.start_fees : 0} EGP
                        </div>
                    </div>
                    <div className="ContactInfo ProvidedServices">
                        <div className="AddGallery HeaderInfo">
                            <span>Provided Services</span>
                        </div>
                        <ul className="list-unstyled">
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faCircle} /> {info.services}
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default BasicInfo;
