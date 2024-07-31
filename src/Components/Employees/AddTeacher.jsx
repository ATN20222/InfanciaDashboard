import { faBell, faCommentDollar, faImage, faPlus, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CustomDropdown2 from "../DrobDown/CustomDropdown2";



const AddTeacher = () => {

    const [selectedRows, setSelectedRows] = useState([]);



    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Add Teacher
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="SubjectsContainer FormContainer">
                <div className="row AddTeacherRow">
                    <div className="col-lg-12 Center">
                        <div className="CircleInPopUp  Center">
                            <label htmlFor="Image">
                                <FontAwesomeIcon icon={faImage}/>
                                <input type="file" name="" id="Image" />
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <input type="text" className="EmpInput EmpNameInput" name="" id="EmpNameForm" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmpName">Name : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <input type="text" className="EmpInput EmpJobTitleInput" name="" id="EmpJobTitleForm" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmpJobTitleForm">Job title : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <input type="text" className="EmpInput EmpEmailInput" name="" id="EmpEmailForm" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmpEmailForm">Email : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol EmpMobFormCol">
                        <div className="EgEmpMob Center">
                            <span>EG+20</span>
                        </div>
                        
                            <input type="number" className="EmpInput EmpMobInput" name="" id="EmpMob" />
                            <label className="EmpLabel EmpMobLabel" htmlFor="EmpMob">Mobile No. : </label>

                        
                        
                    </div>

                    <div className="col-lg-12 EmpFormCol">
                        <input type="text" className="EmpInput EmpAddressInput" name="" id="EmpAddressForm" />
                        <label className="EmpLabel EmpAddressLabel" htmlFor="EmpAddressForm">Address : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <div className="TeacherManagement">
                            Management
                        </div>
                        <CustomDropdown2 IsAddTeacher={true} Options={["All" ,"Class A" , "Class B" ,"Class C" , "Class D", "All" ,"Class A" , "Class B" ,"Class C" , "Class D"]} DefaultValue={"Class : "} />

                    </div>
                    <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                        <button className="RegisterBtn">
                            Save
                        </button>
                
                        <button className="CancelBtn">
                            Close
                        </button>
                     </div>

                </div>
            
            </div>
           
        </section>
    );
};

export default AddTeacher;
