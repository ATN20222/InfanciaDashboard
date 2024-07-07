import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Slider from "../Slider/Slider";
const Subject = ()=>{
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Subject
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                    <div className="col-lg-1">Hello</div>
                </div>
        </section>
    );
}
export default Subject;