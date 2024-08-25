import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nurseries = () => {
    const tableData = [
        { id: 15458, name: "KiddyCorner", Plan: "Premium", },
        { id: 25458, name: "KiddyCorner", Plan: "Premium", }
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);



    return (
        <section className="SecondSliderSection ManageClassesCompnent">

            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                        Nurseries
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                                <div className="container">
                                    <div className="row">
                                    {tableData.map((row) => (
                                        <Link to={`/Nurseries/${row.id}`} className="col-lg-12 RecordEmpTable linkNursery">
                                            <div className="row">
                                                <div className="col-lg-5 col-md-5 col-sm-5 col-5 Center">
                                                    {row.name}
                                                    
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                                    <span className="BranchTableSpan" data-content={row.id}>

                                                        {row.id}
                                                    </span>
                                                    
                                                    </div>


                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.Plan}>

                                                        {row.Plan}
                                                    </span>
                                                    
                                                    </div>
                                                
                                       
                                    </div>
                                    </Link>
                                    ))}
                                    </div>
                                </div>
                                    
                            
                       
                </div>
            </div>
           
        </section>
    );
};

export default Nurseries;
