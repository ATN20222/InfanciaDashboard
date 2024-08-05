import React from "react";
import './Register.css'
import TopImage from '../../Assets/images/HeaderLogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
const Register = ()=>{
    return(
        <div className="RegisterMain">
            <div className="TopImage">
                <img src={TopImage} width="200px" alt="" />
            </div>

            <div className="container RegisterForm">
                <div className="row">
                    <div className="col-lg-12 RegisterHeaderCol">
                        <div className="RegisterHeader">
                            <span>Application Form</span>
                        </div>

                        <div className="col-lg-12">
                            <form className="row Center">
                                <div className="col-lg-12 Center UploadRegisterImageCol">
                                    <div className="UploadRegisterImage Center">
                                        
                                    <label htmlFor="NurseryImage" className="icon-label text-center">
                                        <FontAwesomeIcon icon={faCamera} />
                                    </label>
                                    <input type="file" className="d-none" id="NurseryImage" />
                                    </div>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryName">
                                    <input type="email" className="FormInput FormInputReg" name="" id="NurseryName" />
                                    <label className="FormLabel FormLabelReg" htmlFor="NurseryName">Nursery name : </label>
                                </div>
                                <div className="col-lg-1">

                                </div>
                                
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <input type="email" className="FormInput FormInputReg" name="" id="Email" />
                                    <label className="FormLabel FormLabelReg" htmlFor="Email">Email : </label>
                                </div>


                                <div className="col-lg-5 FormInputCol FormInputColReg MobCol">
                                    <div className="MobExt Center">
                                        <span>EG+20</span>
                                    </div>
                                    <div className="FormInputCol FormInputColReg">
                                        <input type="number" className="FormInput FormInputReg" name="" id="MobileNo" />
                                        <label className="FormLabel FormLabelReg" htmlFor="MobileNo">Mobile No. : </label>

                                    </div>
                                    
                                </div>
                                
                                
                                <div className="col-lg-1">

                                </div>
                                                                
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    
                                    <CustomDropdown Options={["Egypt"]} DefaultValue={"Country : "}/>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    
                                    <CustomDropdown Options={["Cairo"]} DefaultValue={"Province : "}/>
                                </div>
                                <div className="col-lg-1"></div>                          
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    
                                    <CustomDropdown Options={["El-Marg"]} DefaultValue={"City : "}/>
                                </div>


                                <div className="col-lg-12 FormInputCol FormInputColReg AddressCol">
                                    <input type="text" className="FormInput FormInputReg" name="" id="Address" />
                                    <label className="FormLabel FormLabelReg" htmlFor="Address">Address : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg text-start NurseryDetails NurseryDetailsCol">
                                    <h5>Nursery Details</h5>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol BranchesCol">
                                    <input type="number" className="FormInput FormInputReg" name="" id="Branches" />
                                    <label className="FormLabel FormLabelReg" htmlFor="Branches">Branches No. : </label>
                                </div>
                                <div className="col-lg-1">

                                </div>
                                
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol StartFeesCol">
                                    <input type="number" className="FormInput FormInputReg" name="" id="StartFees" />
                                    <label className="FormLabel FormLabelReg" htmlFor="StartFees">Start Fees : </label>
                                </div>

                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ClassesNoCol">
                                    <input type="number" className="FormInput FormInputReg" name="" id="ClassesNo" />
                                    <label className="FormLabel FormLabelReg" htmlFor="ClassesNo">Classes No. : </label>
                                </div>
                                <div className="col-lg-1">

                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ChildrenNoCol">
                                    <input type="number" className="FormInput FormInputReg" name="" id="ChildrenNo" />
                                    <label className="FormLabel FormLabelReg" htmlFor="ChildrenNo">Children No. : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ChildrenNoCol">
                                    <input type="number" className="FormInput FormInputReg" name="" id="EmployeeNo" />
                                    <label className="FormLabel FormLabelReg" htmlFor="EmployeeNo">Employee No. : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol AddressCol ">
                                    <input type="text" className="FormInput FormInputReg" name="" id="ProvidedServices" />
                                    <label className="FormLabel FormLabelReg" htmlFor="ProvidedServices">Provided Services : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol AddressCol ">
                                    <input type="text" className="FormInput FormInputReg" name="" id="AboutNursery" />
                                    <label className="FormLabel FormLabelReg" htmlFor="AboutNursery">About nursery : </label>
                                </div>

                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol RememberCol AcceptCol">
                                    <input type="checkbox" className="Remember" name="" id="Accept" />
                                    <label className="" htmlFor="Accept">Accept All</label>
                                </div>

                                <div className="col-lg-12 FormInputCol FormInputColReg ">
                                        <h5 className="Note">Note</h5>
                                        <div className="NoteText">
                                            <span>
                                            We appreciate your interest and look forward to meeting your needs.
                                            Once your request is accepted, we will send a confirmation email to the address you provided. <br />Please check your email to complete your login.
                                            </span>
                                        </div>
                                </div>

                                <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                                        <button className="RegisterBtn">
                                            Send
                                        </button>
                                
                                        <button className="CancelBtn">
                                            Cancel
                                        </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;