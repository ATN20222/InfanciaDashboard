import React, { useState, useEffect } from "react";
import './Register.css';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import { AuthService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import SelectCityAndCountry from "../../Components/DrobDown/SelectCityAndCountry";

const FakeForm = () => {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [formData, setFormData] = useState({
        nurseryName: "",
        email: "",
        mobileNo: "",
        country: "",
        province: "",
        city: "",
        address: "",
        branches: "",
        aboutNursery: "",
        accept: false
    });
    const [imageError, setImageError] = useState('');
    const [cities, setCities] = useState([]);
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

        setImage(file);
        setSelectedImage(URL.createObjectURL(file));
        setImageError("");
    };

    const [errors, setErrors] = useState({});

    useEffect(() => {
        GetData();
    }, []);

    async function GetData() {
        try {
            const response = await axios.post(
                'https://countriesnow.space/api/v0.1/countries/cities',
                { country: 'Egypt' }
            );
            setCities(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!image) {
            isValid = false;
            setImageError('Nursery image is required');
            return;
        }

        if (!formData.nurseryName) {
            tempErrors.nurseryName = "Nursery name is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.email) {
            tempErrors.email = "Email is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.mobileNo) {
            tempErrors.mobileNo = "Mobile No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.mobileNo)) {
            tempErrors.mobileNo = "Mobile No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.country) {
            tempErrors.country = "Country is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }
        if (!formData.city) {
            tempErrors.city = "City is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.address) {
            tempErrors.address = "Address is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.branches) {
            tempErrors.branches = "Branches No. is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        } else if (!/^\d+$/.test(formData.branches)) {
            tempErrors.branches = "Branches No. must be numeric";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

        if (!formData.aboutNursery) {
            tempErrors.aboutNursery = "About nursery is required";
            isValid = false;
            setErrors(tempErrors);
            return;
        }

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
                const response = await AuthService.GenerateNursery(
                    formData.nurseryName,
                    formData.email,
                    formData.mobileNo,
                    formData.country,
                    formData.city,
                    formData.address,
                    formData.aboutNursery,
                    formData.branches,
                    image,
                );
                toast.success('Nursery added successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } catch (error) {
                console.error("Registration failed", error);
                toast.error(`${error}`);
            }
        } else {
            console.log("Form validation failed");
        }
        setLoading(false);
    };

    const handleCountryChange = (selectedCountry) => {
        setFormData({ ...formData, country: selectedCountry });
        GetData();
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
            <div className="container">
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
                                                <img src={selectedImage} alt="" />
                                                <FontAwesomeIcon icon={faCamera} />
                                            </label>
                                            <input type="file" className="d-none" id="NurseryImage" onChange={handleImageChange} />
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
                                    <div className="col-lg-12 FormInputCol FormInputColReg">

                                        <SelectCityAndCountry Options={cities ? cities : []} DefaultValue={"City  "} onChange={handleCityChange} />
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

                                    {!loading ? <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                                        <button type="submit" className="RegisterBtn">
                                            Send
                                        </button>
                                        <Link to='/login' className="CancelBtn">
                                            Cancel
                                        </Link>
                                    </div>
                                        :
                                        <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div className="loader"></div></div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FakeForm;
