import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";

const KidProfile = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 201, amount: "20$", class:"Class A", date: "20-8-2024" , service:"Travel"},
        { id: 2, name: "Ahmed hamed", paymentId: 204, amount: "20$", class:"Class B", date: "20-8-2024" , service:"Travel"}
    ];

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Kid Profile
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer FormContainer">
                <div className="row AddTeacherRow">
                    <div className="col-lg-12 Center">
                        <div className="CircleInPopUp Center">
                            <label htmlFor="Image">
                                <FontAwesomeIcon icon={faImage}/>
                                <input type="file" name="" id="Image" />
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidFirstNameInput" name="" id="KidFirstName" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidFirstName">Kid Name : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol ">
                        <input type="text" className="EmpInput KidIDCodeInput" name="" id="KidIDCode" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidIDCode">ID Code : </label>
                    </div>
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["Class A","Class B"]} DefaultValue={"Class: "}/>
                    </div>
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["El-Marg","Ain Shams"]} DefaultValue={"Branch: "}/>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidEmailInput" name="" id="KidEmail" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidEmail">Email : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol EmpMobFormCol">
                        <div className="EgEmpMob Center">
                            <span>EG+20</span>
                        </div>
                        <input type="number" className="EmpInput EmpMobInput" name="" id="EmpMob" />
                        <label className="EmpLabel EmpMobLabel" htmlFor="EmpMob">Mobile No. : </label>
                    </div>

                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidGenderInput" name="" id="KidGender" />
                        <label className="EmpLabel KidGenderLabel" htmlFor="KidGender">Gender : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidBirthDateInput" name="" id="BirthDate" />
                        <label className="EmpLabel KidGender" htmlFor="KidAddress">Birth Date : </label>
                    </div>

                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["El-Marg","Ain Shams"]} DefaultValue={"City: "}/>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidAddressInput" name="" id="KidAddress" />
                        <label className="EmpLabel KidAddressInput" htmlFor="KidAddress">Address : </label>
                    </div>
                    
                    

                    <div className="col-lg-12 ParentsInformationHeader">
                        <h5>Parents Information</h5>
                    </div>

                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput FathertNameInput" name="" id="FathertName" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertName">Father Name : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput FathertMobInput" name="" id="FathertMob" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertMob">Father Mobile : </label>
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput FathertJobInput" name="" id="FathertJob" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertJob">Father Job : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput MotherNameInput" name="" id="MotherName" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherName">Mother Name : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput MotherMobInput" name="" id="MotherMob" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherName">Mother Mobile : </label>
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput MotherJobInput" name="" id="MotherJob" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherName">Mother Job : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput EmergencyPhoneInput" name="" id="EmergencyPhone" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmergencyPhone">Emergency Phone : </label>
                    </div>
                    
                    <section className="SecondSliderSection ManageClassesCompnent">
             
                    <div className="col-lg-12 ParentsInformationHeader">
                        <h5>Payment History</h5>
                    </div>
             <div className="PaymentKidContainer">
                 
                 <div className="table-responsive TableContainer TableContainerHistoryPayment">
                     <table className="table">
                         <tbody>
                             {tableData.map((row) => (
                                 <tr key={row.id}>
                                    
                                     <td className="NamePayment" data-content={row.name}>{row.name}</td>
                                     <td className="NamePayment" data-content={row.paymentId} >{row.paymentId}</td>
                                     <td  className="NamePayment" data-content={row.class} >{row.class}</td>
                                     <td>{row.amount}</td>
                                     <td className="NamePayment" data-content={row.date}>{row.date}</td>
                                     <td className="NamePayment" data-content={row.service}>{row.service}</td>
                                     
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
             
         </section>
         <div className="col-lg-12 EmpFormCol HasMedicalCaseCol">
            <div className="InputSelectAll HasMedicalCase">
                <input
                    type="checkbox"
                    name=""
                    id="HasCase"
            
                />
                <label htmlFor="HasCase">Has Medical Case</label>
            </div>
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

export default KidProfile;
