import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEnvelope, faHome, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { NurseryProfileService } from "../../Service/Api";

const BasicInfo = () => {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        GetData();
    }, []);

    async function GetData() {
        try {
            const response = await NurseryProfileService.ListInfo();
            // console.log(response);

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
                                <FontAwesomeIcon icon={faHome} /> {info.address}
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
                            <span>Branches</span>
                        </div>
                        <div className="AboutInfoText">
                            {info.branches_number ? info.branches_number : 0} Branch
                        </div>
                    </div>
                    <div className="ContactInfo ProvidedServices">
                        <div className="AddGallery HeaderInfo">
                            <span>Provided Services</span>
                        </div>
                        <ul className="list-unstyled">
                            {info.services.length>0&&info.services.map((serv)=>(
                                <li className="list-group-item">
                                    <span>
                                        - {serv.content}
                                    </span>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInfo;
