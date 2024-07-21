import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import KidTable from "../Table/KidTable";
const Kids = ()=>{
    const cids = [
        { name: 'Kid name', id: '10245', date: 'Date' },
        { name: 'Kid name', id: '10245', date: 'Date' },
        { name: 'Kid name', id: '10245', date: 'Date' },
        { name: 'Kid name', id: '10245', date: 'Date' }
    ];
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Kids
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
                <div className="SubjectsContainer">
                    <KidTable kids={cids} />


                </div>
        </section>
    );
}
export default Kids;