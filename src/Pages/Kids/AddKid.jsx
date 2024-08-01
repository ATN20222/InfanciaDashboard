import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";

const AddKid = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const yearInputRef = useRef();
    const monthInputRef = useRef();
    const dayInputRef = useRef();

    const handleYearChange = (event) => {
        const { value } = event.target;
        if (value.length > 4) {
            event.target.value = value.slice(0, 4);
        }
    };

    const handleMonthChange = (event) => {
        const { value } = event.target;
        if (parseInt(value, 10) > 12) {
            event.target.value = 12;
        }
    };

    const handleDayChange = (event) => {
        const { value } = event.target;
        if (parseInt(value, 10) > 31) {
            event.target.value = 31;
        }
    };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Add Kid
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
                        <input type="text" className="EmpInput KidLastNameInput" name="" id="KidLastName" />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidLastName">Parent Name : </label>
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
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["El-Marg","Ain Shams"]} DefaultValue={"City: "}/>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidAddressInput" name="" id="KidAddress" />
                        <label className="EmpLabel KidAddressInput" htmlFor="KidAddress">Address : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <div className="TopInputTitle">
                            Gender
                        </div>
                        <div className="GenderContainer">
                            <div className="container">
                                <div className="row Center">
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div className={`Boy ${selectedGender==true?"SelectedGender":""}`} onClick={()=>setSelectedGender(true)}>
                                            BOY
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div className={`Girl ${selectedGender==false?"SelectedGender":""}`} onClick={()=>setSelectedGender(false)}>
                                            GIRL
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <div className="TopInputTitle">
                            Birth Date
                        </div>
                        <div className="BirthDateContainer">
                            <div className="year">
                                <input
                                    className="year"
                                    type="number"
                                    placeholder="YEAR"
                                    ref={yearInputRef}
                                    onChange={handleYearChange}
                                />
                            </div>
                            <div className="Month">
                                <input
                                    className="Month"
                                    type="number"
                                    placeholder="MONTH"
                                    ref={monthInputRef}
                                    onChange={handleMonthChange}
                                    max="12"
                                />
                            </div>
                            <div className="Day">
                                <input
                                    className="Day"
                                    type="number"
                                    placeholder="DAY"
                                    ref={dayInputRef}
                                    onChange={handleDayChange}
                                    max="30"
                                />
                            </div>
                        </div>



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

export default AddKid;
