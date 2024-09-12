import React, { useEffect, useState } from "react";
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import { AuthService, NurseryServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const NurseryDetails = () => {
    const [loading , setLoading] = useState(false);
    const {id} = useParams();
    const [formData, setFormData] = useState({
        nurseryName: "",
        email: "",
        mobileNo: "",
        country: "",
        province: "",
        city: "",
        address: "",
        branches: "",
        startFees: "",
        classesNo: "",
        childrenNo: "",
        employeeNo: "",
        providedServices: "",
        aboutNursery: "",
        StartDate:'',
        EndDate:'',
        PackName:'',
        accept: false
    });
    const [image, setImage] = useState(null);
    useEffect(()=>{
        GetData();
    },[]);

    async function GetData() {
        try {
            const response = await NurseryServices.ListById(id);
            console.log(response);
            setFormData({
                nurseryName: response.content.name,
                email: response.content.email,
                mobileNo: response.content.phone,
                country: response.content.country,
                province: response.content.province,
                city: response.content.city,
                address: response.content.address,
                branches: response.content.branches_number,
                startFees: response.content.start_fees,
                classesNo: response.content.classes_Number,
                childrenNo: response.content.children_number,
                employeeNo: response.content.employees_number,
                providedServices: response.content.services,
                aboutNursery: response.content.about,
                StartDate:formatDate(response.content.created_at),
                EndDate:formatDate(response.content.updated_at),
                PackName:'Premium',
            })
        } catch (error) {
            
        }
    }
    
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    }
    return (
        <div className="container">

            <div className="RegisterMain">
        </div>
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="container RegisterForm">
                <div className="row">
                    <div className="col-lg-12 RegisterHeaderCol">
                        <div className="RegisterHeader">
                            <span>Nursery details</span>
                        </div>

                        <div className="col-lg-12">
                            <form className="row Center RegisterForm">
                                <div className="col-lg-12 Center UploadRegisterImageCol mb-3">
                                    <div className="UploadRegisterImage Center">
                                        <label htmlFor="NurseryImage" className="icon-label text-center">
                                            {/* <FontAwesomeIcon icon={faCamera} /> */}
                                            <img src={image} alt="" />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryName">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg nurseryNameInput"
                                        name="nurseryName"
                                        value={formData.nurseryName}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="NurseryName">Nursery name : </label>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg EmailRegisterCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg EmailRegisterInput"
                                        name="email"
                                        value={formData.email}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Email">Email : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg MobCol NurseryNumberRegister">
                                    <div className="MobExt Center">
                                        <span>EG+20</span>
                                    </div>
                                    <div className="FormInputCol FormInputColReg ">
                                        <input  disabled
                                            type="number"
                                            className="FormInput FormInputReg"
                                            name="mobileNo"
                                            value={formData.mobileNo}
                                        />
                                        <label className="FormLabel FormLabelReg MobileNoLabel" htmlFor="MobileNo">Mobile No. : </label>
                                    
                                    </div>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg AddressCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="address"
                                        value={formData.country}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Address">country : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg CityProfile">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="address"
                                        value={formData.city}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Address">city : </label>
                                </div>
                                {/* <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <CustomDropdown Options={["Cairo"]} DefaultValue={"Province : "} />
                                </div> */}
                                {/* <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <CustomDropdown Options={egyptianCities} DefaultValue={"City  "} onChange={handleCityChange}/>
                                    
                                </div> */}
                                <div className="col-lg-12 FormInputCol FormInputColReg AddressCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="address"
                                        value={formData.address}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Address">Address : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg text-start NurseryDetails NurseryDetailsCol">
                                    <h5>Nursery Details</h5>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol BranchesCol">
                                    <input  disabled
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="branches"
                                        value={formData.branches}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Branches">Branches No. : </label>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol StartFeesCol">
                                    <input  disabled
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="startFees"
                                        value={formData.startFees}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="StartFees">Start Fees : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ClassesNoCol">
                                    <input  disabled
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="classesNo"
                                        value={formData.classesNo}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ClassesNo">Classes No. : </label>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ChildrenNoCol">
                                    <input  disabled
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="childrenNo"
                                        value={formData.childrenNo}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ChildrenNo">Children No. : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol EmployeeNumbers">
                                    <input  disabled
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="employeeNo"
                                        value={formData.employeeNo}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="EmployeeNo">Employee No. : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol ProvidedServicesCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="providedServices"
                                        value={formData.providedServices}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ProvidedServices">Provided Services : </label>
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol AboutNurseryCol ">
                                    
                                <input  disabled
                                    type="text"
                                    className="FormInput FormInputReg"
                                    name="aboutNursery"
                                    id="AboutNursery"
                                    value={formData.aboutNursery}
                                />
                                    <label className="FormLabel FormLabelReg" htmlFor="AboutNursery">About nursery : </label>
                                
                                </div>

                                <div className="col-lg-12 FormInputCol FormInputColReg text-start NurseryDetails NurseryDetailsCol">
                                    <h5>Packege Details</h5>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ProvidedServicesCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="providedServices"
                                        value={formData.PackName}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ProvidedServices">Packege Name : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol StartFeesCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="startFees"
                                        value={formData.StartDate}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="StartFees">Start Date : </label>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol StartFeesCol">
                                    <input  disabled
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="startFees"
                                        value={formData.EndDate}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="StartFees">End Date : </label>
                                </div>
                                {!loading? <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                                        {/* <button type="button" className="RegisterBtn">
                                            Block
                                        </button> */}
                                        {/* <Link to='/login' className="CancelBtn">
                                            Reject
                                        </Link> */}
                                        
                                </div>
                                :
                    
                                <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>
                                }    
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseryDetails;
