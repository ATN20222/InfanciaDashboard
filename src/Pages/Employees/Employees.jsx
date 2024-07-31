import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Employees.css';
import { Link } from "react-router-dom";


const Employees = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", JobTitle: "Miss", class:"Class A-C",},
        { id: 2, name: "Ahmed hamed", JobTitle: "Miss", class:"Class B-D",}
    ];


    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Teachers
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus">
                                <Link to="/addteacher" className="text-decoration-none text-white"><FontAwesomeIcon icon={faPlus} /></Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees">
                    
                                <div className="container">
                                    <div className="row">
                                    {tableData.map((row) => (
                                        <div className="col-lg-12 RecordEmpTable">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <div className="avatar"></div>
                                                    {row.name}
                                                    
                                                    </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">{row.JobTitle}</div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">{row.class}</div>
                                            </div>
                                       
                                    </div>
                                    ))}
                                    </div>
                                </div>
                                    
                            
                       
                </div>
            </div>
           
        </section>
    );
};

export default Employees;
