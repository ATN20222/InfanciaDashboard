import React, { useState } from "react";
import './Register.css';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import { AuthService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
    const [loading , setLoading] = useState(false);
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
        accept: false
    });
    const [imageError, setImageError] = useState('');
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Validate image size (max 8 MB)
        if (file.size > 8 * 1024 * 1024) {
          setImageError("Image size should not exceed 8 MB");
          setImage(null);
          return;
        }
      
        // Validate image format
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedFormats.includes(file.type)) {
          setImageError("Only .jpeg, .jpg, .png, and .gif formats are allowed");
          setImage(null);
          return;
        }
      
        // Set image if valid
        setImage(file);
        setImageError("");
      };

    const [errors, setErrors] = useState({});
    


    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!image) {
            isValid = false;
            setImageError('Nursery image is required');
            return;
        }
        
        if (!formData.nurseryName) {
            console.log("Nursery name is required");
            tempErrors.nurseryName = "Nursery name is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.email) {
            console.log("Email is required");
            tempErrors.email = "Email is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            console.log("Email is invalid");
            tempErrors.email = "Email is invalid";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.mobileNo) {
            console.log("Mobile No. is required");
            tempErrors.mobileNo = "Mobile No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.mobileNo)) {
            console.log("Mobile No. must be numeric");
            tempErrors.mobileNo = "Mobile No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if(!formData.country){
            tempErrors.country = "Country is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
        if(!formData.city){
            tempErrors.city = "City is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.address) {
            console.log("Address is required");
            tempErrors.address = "Address is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.branches) {
            console.log("Branches No. is required");
            tempErrors.branches = "Branches No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.branches)) {
            console.log("Branches No. must be numeric");
            tempErrors.branches = "Branches No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.startFees) {
            console.log("Start Fees is required");
            tempErrors.startFees = "Start Fees is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.startFees)) {
            console.log("Start Fees must be numeric");
            tempErrors.startFees = "Start Fees must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.classesNo) {
            console.log("Classes No. is required");
            tempErrors.classesNo = "Classes No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.classesNo)) {
            console.log("Classes No. must be numeric");
            tempErrors.classesNo = "Classes No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.childrenNo) {
            console.log("Children No. is required");
            tempErrors.childrenNo = "Children No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.childrenNo)) {
            console.log("Children No. must be numeric");
            tempErrors.childrenNo = "Children No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.employeeNo) {
            console.log("Employee No. is required");
            tempErrors.employeeNo = "Employee No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.employeeNo)) {
            console.log("Employee No. must be numeric");
            tempErrors.employeeNo = "Employee No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.providedServices) {
            console.log("Provided Services is required");
            tempErrors.providedServices = "Provided Services is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.aboutNursery) {
            console.log("About nursery is required");
            tempErrors.aboutNursery = "About nursery is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        if (!formData.accept) {
            console.log("You must accept the terms");
            tempErrors.accept = "You must accept the terms";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
    
        // setErrors(tempErrors);
        console.log("Validation successful");
        return true;
    };
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setErrors({});
        setImageError('');
        if (validate()) {
            try {
                const response = await AuthService.RegisterApi(
                    formData.nurseryName,
                    formData.email,
                    formData.mobileNo,
                    "InfanciaNursery2024", 
                    // "formData.province",
                    formData.city,
                    formData.country,
                    formData.address,
                    formData.branches,
                    formData.classesNo,
                    formData.childrenNo,
                    formData.employeeNo,
                    formData.startFees,
                    formData.aboutNursery,
                    formData.providedServices,
                );
                // console.log("Form data submitted successfully", response);
                toast.success('Your Application has been sent');
                
            } catch (error) {
                console.error("Registration failed", error);
                toast.error('Failed to send your Application');

            }
        } else {
            console.log("Form validation failed");
        }
        setLoading(false);
    };
    
    const egyptianCities = [
        "Cairo",
        "Alexandria",
        "Giza",
        "Port Said",
        "Suez",
        "Luxor",
        "Asyut",
        "Ismailia",
        "Aswan",
        "Mansoura",
        "Tanta",
        "Faiyum",
        "Zagazig",
        "Damietta",
        "Minya",
        "Beni Suef",
        "Qena",
        "Sohag",
        "Hurghada",
        "Shibin El Kom",
        "Banha",
        "Arish",
        "Mallawi",
        "10th of Ramadan City",
        "Sadat City",
        "Obour City",
        "6th of October City",
        "New Cairo"
    ];
    
    const handleCountryChange = (selectedCountry) => {
        setFormData({ ...formData, country: selectedCountry });
    };

    const handleCityChange = (selectedCity) => {
        setFormData({ ...formData, city: selectedCity });
    };
    return (
        <div className="RegisterMain">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
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
                            <form className="row Center RegisterForm" onSubmit={handleSubmit}>
                                <div className="col-lg-12 Center UploadRegisterImageCol mb-3">
                                    <div className="UploadRegisterImage Center">
                                        <label htmlFor="NurseryImage" className="icon-label text-center">
                                            <FontAwesomeIcon icon={faCamera} />
                                        </label>

                                        <input type="file"  className="d-none" id="NurseryImage" onChange={handleImageChange} />

                                    </div>
                                        {imageError && <span className="text-danger FormError">{imageError}</span>}
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryName">
                                    <input
                                        type="text"
                                        className="FormInput FormInputReg nurseryNameInput"
                                        name="nurseryName"
                                        value={formData.nurseryName}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="NurseryName">Nursery name : </label>
                                    {errors.nurseryName && <span className="text-danger FormError">{errors.nurseryName}</span>}
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg EmailRegisterCol">
                                    <input
                                        type="text"
                                        className="FormInput FormInputReg EmailRegisterInput"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Email">Email : </label>
                                    {errors.email && <span className="text-danger FormError">{errors.email}</span>}
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg MobCol NurseryNumberRegister">
                                    <div className="MobExt Center">
                                        <span>EG+20</span>
                                    </div>
                                    <div className="FormInputCol FormInputColReg ">
                                        <input
                                            type="number"
                                            className="FormInput FormInputReg"
                                            name="mobileNo"
                                            value={formData.mobileNo}
                                            onChange={handleChange}
                                        />
                                        <label className="FormLabel FormLabelReg MobileNoLabel" htmlFor="MobileNo">Mobile No. : </label>
                                        {errors.mobileNo && <span className="text-danger FormError">{errors.mobileNo}</span>}
                                    </div>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <CustomDropdown Options={["Egypt"]} DefaultValue={"Country  "} onChange={handleCountryChange} />
                                    {errors.country && <span className="text-danger FormError">{errors.country}</span>}

                                </div>
                                {/* <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <CustomDropdown Options={["Cairo"]} DefaultValue={"Province : "} />
                                </div> */}
                                <div className="col-lg-5 FormInputCol FormInputColReg">
                                    <CustomDropdown Options={egyptianCities} DefaultValue={"City  "} onChange={handleCityChange}/>
                                    {errors.city && <span className="text-danger FormError">{errors.city}</span>}
                                    
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg AddressCol">
                                    <input
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Address">Address : </label>
                                    {errors.address && <span className="text-danger FormError">{errors.address}</span>}
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg text-start NurseryDetails NurseryDetailsCol">
                                    <h5>Nursery Details</h5>
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol BranchesCol">
                                    <input
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="branches"
                                        value={formData.branches}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="Branches">Branches No. : </label>
                                    {errors.branches && <span className="text-danger FormError">{errors.branches}</span>}
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol StartFeesCol">
                                    <input
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="startFees"
                                        value={formData.startFees}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="StartFees">Start Fees : </label>
                                    {errors.startFees && <span className="text-danger FormError">{errors.startFees}</span>}
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ClassesNoCol">
                                    <input
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="classesNo"
                                        value={formData.classesNo}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ClassesNo">Classes No. : </label>
                                    {errors.classesNo && <span className="text-danger FormError">{errors.classesNo}</span>}
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol ChildrenNoCol">
                                    <input
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="childrenNo"
                                        value={formData.childrenNo}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ChildrenNo">Children No. : </label>
                                    {errors.childrenNo && <span className="text-danger FormError">{errors.childrenNo}</span>}
                                </div>
                                <div className="col-lg-5 FormInputCol FormInputColReg NurseryDetailsCol EmployeeNumbers">
                                    <input
                                        type="number"
                                        className="FormInput FormInputReg"
                                        name="employeeNo"
                                        value={formData.employeeNo}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="EmployeeNo">Employee No. : </label>
                                    {errors.employeeNo && <span className="text-danger FormError">{errors.employeeNo}</span>}
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol ProvidedServicesCol">
                                    <input
                                        type="text"
                                        className="FormInput FormInputReg"
                                        name="providedServices"
                                        value={formData.providedServices}
                                        onChange={handleChange}
                                    />
                                    <label className="FormLabel FormLabelReg" htmlFor="ProvidedServices">Provided Services : </label>
                                    {errors.providedServices && <span className="text-danger FormError">{errors.providedServices}</span>}
                                </div>
                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol AboutNurseryCol ">
                                    
                                <input
                                    type="text"
                                    className="FormInput FormInputReg"
                                    name="aboutNursery"
                                    id="AboutNursery"
                                    value={formData.aboutNursery}
                                    onChange={handleChange}
                                />
                                    <label className="FormLabel FormLabelReg" htmlFor="AboutNursery">About nursery : </label>
                                    {errors.aboutNursery && <span className="text-danger FormError">{errors.aboutNursery}</span>}
                                
                                </div>

                                <div className="col-lg-12 FormInputCol FormInputColReg NurseryDetailsCol RememberCol AcceptCol">
                                    <input 
                                        className="Remember" 
                                        type="checkbox"
                                                name="accept"
                                                id="Accept"
                                                checked={formData.accept}
                                                onChange={handleChange}
                                            />
                                            
                                            {/* <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="accept"
                                                id="Accept"
                                                checked={formData.accept}
                                                onChange={handleChange}
                                            /> */}

                                    <label className="" htmlFor="Accept">Accept All</label>
                                    {errors.accept && <span className="text-danger FormError">{errors.accept}</span>}

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

                               {!loading? <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                                        <button type="submit" className="RegisterBtn">
                                            Send
                                        </button>
                                        <Link to='/login' className="CancelBtn">
                                            Cancel
                                        </Link>
                                        
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

export default Register;
