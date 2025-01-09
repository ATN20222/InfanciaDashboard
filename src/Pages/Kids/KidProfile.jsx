import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import toast, { Toaster } from "react-hot-toast";
import { ClassService, KidsServices } from "../../Service/Api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KidProfileDropdown from "../../Components/DrobDown/KidProfileDropdown";
import DemoImage from '../../Assets/images/INFANCIA_LOGO.png'
import DeleteSubjectModal from '../../Components/ManageClasses/DeleteSubjectModal'
const KidProfile = () => {
    const [birthdate, setBirthdate] = useState('');
    const [selectedGender, setSelectedGender] = useState(true);
    const [kidName, setKidName] = useState('');
    const [kId, setKId] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [classId, setClassId] = useState('');
    const [address, setAddress] = useState('');
    const [kidImage, setKidImage] = useState(null);
    const [fatherName, setFatherName] = useState('');
    const [fatherMobile, setFatherMobile] = useState('');
    const [fatherJob, setFatherJob] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherMobile, setMotherMobile] = useState('');
    const [motherJob, setMotherJob] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');
    const [hasMedicalCase, setHasMedicalCase] = useState(false);
    const [kidNameError, setKidNameError] = useState('');
    const [parentNameError, setParentNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [cityError, setCityError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [fatherNameError, setFatherNameError] = useState('');
    const [fatherMobileError, setFatherMobileError] = useState('');
    const [fatherJobError, setFatherJobError] = useState('');
    const [motherNameError, setMotherNameError] = useState('');
    const [motherMobileError, setMotherMobileError] = useState('');
    const [motherJobError, setMotherJobError] = useState('');
    const [emergencyPhoneError, setEmergencyPhoneError] = useState('');
    const [dateError, setDateError] = useState('');
    const [ImageError, setImageError] = useState('');
    const [ImageFile, setImageFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [kidCurrentImage, setKidCurrentImage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const kidId = searchParams.get('kidId');
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

    const [kidLastName, setKidLastName] = useState('');
    const [kidLastNameError, setKidLastNameError] = useState('');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');


    useEffect(() => {
        GetData();
        GetClasses();
    }, [])

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    const handleSubmit = async (event) => {

        setLoading(true);
        event.preventDefault();
        let valid = true;
        if (fatherName === '') {
            setFatherNameError("Father name is required");
            setLoading(false);
            valid = false;
            return;
        } else {
            setFatherNameError('');
        }

        if (email === '') {
            setEmailError("Email is required");
            valid = false;
            setLoading(false);

        } else {
            if (validateEmail(email)) {
                setEmailError('');
            } else
                setEmailError('email is invalid');
        }
        if (fatherMobile === '') {
            setFatherMobileError("Father mobile number is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setFatherMobileError('');
        }
        if (fatherJob === '') {
            setFatherJobError("Father job is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setFatherJobError('');
        }
        if (emergencyPhone === '') {
            setEmergencyPhoneError("Emergency phone is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setEmergencyPhoneError('');
        }
        if (kidName === '') {
            setKidNameError("Kid first name is required");
            valid = false;
            setLoading(false);
        } else {
            setKidNameError('');
        }
        if (kidLastName === '') {
            setKidLastNameError("Kid last name is required");
            valid = false;
            setLoading(false);
            return;
        } else {
            setKidLastNameError('');
        }
        if (!year || !month || !day) {
            setDateError ('All birth date fields are required');
            valid = false;
            setLoading(false);
            return;
        }else {
            setDateError('');
        }
        



        try {
            const BirthDate = `${year}-${month}-${day}`;
            const response =
                await KidsServices.Edit(
                    kidId,
                    kidName,
                    kidLastName,
                    BirthDate,
                    hasMedicalCase?1:0,
                    'no',
                    selectedClass,
                    selectedGender?'boy':'girl',
                    ImageFile
                );
            console.log(response);
            toast.success('Kid edited successfully');
            setLoading(false);
            setTimeout(() => {
                navigate('/manageclasses');
            }, 2000);

        } catch (error) {
            console.log(error)
            toast.error('Failed to edit kid');
            setLoading(false);

        }

    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 8 * 1024 * 1024) {
                setImageError('File size must not exceed 8 MB.');
                setImageFile(null);
                return;
            }
            if (!file.type.startsWith('image/')) {
                setImageError('Please select a valid image file.');
                setImageFile(null);
                return;
            }
            setImageError('');
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setKidCurrentImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImageError('No file selected.');
        }
    };

    async function GetClasses() {
        try {

            const response = await ClassService.List();
            setClasses(response.content);


        } catch (error) {
            console.log(error)

        }
    }

    const GetData = async () => {

        try {

            const response = await KidsServices.profile(kidId);
            // parent data 
            setFatherName(response.content.parent.user.name);
            setEmail(response.content.parent.user.email);
            setFatherJob(response.content.parent.job);
            setFatherMobile(response.content.parent.user.phone);
            setEmergencyPhone(response.content.parent.emergency_phone);


            // kid data 
            setKId(response.content.id);
            setKidName(response.content.first_name);
            setKidLastName(response.content.last_name);
            setSelectedClass(response.content.class_room_id);

            var birth_date = response.content.birth_date.split('-');
            setYear(birth_date[0]);
            setMonth(birth_date[1]);
            setDay(birth_date[2]);
            setSelectedGender(response.content.gender === 'boy' ? true : false);
            setHasMedicalCase(response.content.has_medical_case);
            setKidCurrentImage(response.content?.media ? response.content?.media[0]?.original_url : '');

        } catch (error) {
            console.log(error);
            toast.error(`${error}`);


        }
    }

    const handleSelectedClassChange = (classId) => {
        setSelectedClass(classId);
        console.log(classId)
    };

    const handleConfirmDelete = async () => {
        // console.log("del")
        try {
            console.log(kidId);
            const response = await KidsServices.Delete(kidId);
            toast.success('kid deleted successfully');
            console.log(response);
            // GetData();
            setTimeout(() => {
                navigate('/manageclasses');
            }, 2000);

        } catch (error) {
            toast.error('Failed to delete kid');

        }
    }


    const handleBirthChange = (type, value) => {
        if (type === 'birthYear') {
            setYear(value);
        }
        if (type === 'birthMonth') {
            setMonth(value);
        }
        if (type === 'birthDay') {
            setDay(value);

        }
    }


    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <DeleteSubjectModal
                id={kId}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleConfirmDelete}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Kid Profile
                        </div>
                    </div>
                </div>
            </div>
            <form className="SubjectsContainer FormContainer" onSubmit={handleSubmit}>
                <div className="row AddTeacherRow">


                    <div className="col-lg-12 KidInformationHeader">
                        <h5>Kid Information</h5>
                    </div>
                    <div className="col-lg-12 Center KidImageColForm mb-3">
                        <div className="CircleInPopUp Center KidImage">
                            {/* <img src={kidImage} alt="" /> */}

                            <label htmlFor="Image" className="upload-label Center">
                                <div className="Cam">
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                                <img
                                    src={kidCurrentImage}
                                    alt=""
                                    className="ProfilePreview"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        background: '#009fe3',
                                        objectFit: "cover",
                                        padding: '0',

                                    }}
                                />

                                {/* <FontAwesomeIcon icon={faImage} className="upload-icon" /> */}
                                <input
                                    type="file"
                                    id="Image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // Hide the input element
                                />

                                {kidImage && <img src={kidImage} alt="Kid" width="100%" />}
                            </label>


                        </div>
                        {ImageError && <span className="text-danger FormError">{ImageError}</span>}

                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol ">
                        <input disabled type="text" className="EmpInput KidIDCodeInput" name="" id="KidIDCode" value={kId} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidIDCode">ID Code : </label>
                    </div>

                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input
                            type="text"
                            className="EmpInput KidFirstNameInput"
                            value={kidName}
                            onChange={(e) => setKidName(e.target.value)}
                        />
                        <label className="EmpLabel KidFirstNameLable" htmlFor={`KidFirstName`}>
                            First Name :
                        </label>
                        {kidNameError && <span className="text-danger FormError">{kidNameError}</span>}
                    </div>

                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input
                            type="text"
                            className="EmpInput KidLastNameInput"
                            value={kidLastName}
                            onChange={(e) => setKidLastName(e.target.value)}
                        />
                        <label className="EmpLabel EmpNameLabel" htmlFor={`KidLastName`}>
                            Last Name :
                        </label>
                        {kidLastNameError && <span className="text-danger FormError">{kidLastNameError}</span>}
                    </div>

                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <KidProfileDropdown onChange={handleSelectedClassChange} Options={classes} DefaultValue={selectedClass} />
                    </div>

                    <div className="col-lg-5 EmpFormCol">
                        <div className="TopInputTitle">Gender</div>
                        <div className="GenderContainer">
                            <div className="container">
                                <div className="row Center">
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div
                                            className={`Boy ${selectedGender === true ? 'SelectedGender' : ''}`}
                                            onClick={() => setSelectedGender(true)}
                                        >
                                            BOY
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div
                                            className={`Girl ${selectedGender === false ? 'SelectedGender' : ''}`}
                                            onClick={() => setSelectedGender(false)}
                                        >
                                            GIRL
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 EmpFormCol">
                        <div className="TopInputTitle">Birth Date</div>
                        <div className="BirthDateContainer">
                            <div className="year">
                                <input
                                    value={year}
                                    className="year"
                                    type="number"
                                    placeholder="YYYY"
                                    onChange={(e) => handleBirthChange('birthYear', e.target.value)}
                                />
                            </div>
                            <div className="Month">
                                <input
                                    value={month}
                                    className="Month"
                                    type="number"
                                    placeholder="MM"
                                    max="12"
                                    onChange={(e) => handleBirthChange('birthMonth', e.target.value)}
                                />
                            </div>
                            <div className="Day">
                                <input
                                    value={day}
                                    className="Day"
                                    type="number"
                                    placeholder="DD"
                                    max="31"
                                    onChange={(e) => handleBirthChange('birthDay', e.target.value)}
                                />
                            </div>
                        </div>
                        {dateError && <span className="text-danger FormError">{dateError}</span>}
                    </div>

                    <div className="col-lg-12 EmpFormCol HasMedicalCaseCol">
                        <div className="InputSelectAll HasMedicalCase">
                            <input
                                type="checkbox"
                                id="HasCase"
                                checked={hasMedicalCase}
                                onChange={() => setHasMedicalCase(!hasMedicalCase)}
                            />
                            <label htmlFor="HasCase">Has Medical Case</label>
                        </div>
                    </div>


                    <div className="col-lg-12 ParentsInformationHeader mt-4">
                        <h5>Parent Information</h5>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input disabled type="text" className="EmpInput FathertNameInput" value={fatherName}
                        // onChange={(e) => setFatherName(e.target.value)} 

                        />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertName">Parent Name : </label>
                        {fatherNameError && <span className="text-danger FormError">{fatherNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input disabled type="email" className="EmpInput KidEmailInput" value={email}
                        // onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label className="EmpLabel EmpNameLabel KidEmailLable" htmlFor="KidEmail">Email : </label>
                        {emailError && <span className="text-danger FormError">{emailError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input disabled type="number" className="EmpInput FathertMobInput" value={fatherMobile}
                        // onChange={(e) => setFatherMobile(e.target.value)} 
                        />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertMob">Parent Mobile : </label>
                        {fatherMobileError && <span className="text-danger FormError">{fatherMobileError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input disabled type="number" className="EmpInput EmergencyPhoneInput" value={emergencyPhone}
                        // onChange={(e) => setEmergencyPhone(e.target.value)}
                        />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmergencyPhone">Emergency Phone : </label>
                        {emergencyPhoneError && <span className="text-danger FormError">{emergencyPhoneError}</span>}
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input disabled type="text" className="EmpInput FathertJobInput" value={fatherJob}
                        // onChange={(e) => setFatherJob(e.target.value)}
                        />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertJob">Parent Job : </label>
                        {fatherJobError && <span className="text-danger FormError">{fatherJobError}</span>}
                    </div>



                    {!loading ?
                        <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                            <button type="submit" className="RegisterBtn">Save</button>
                            <button type="button" className="CancelBtn" onClick={() => setIsDeleteOverlayOpen(true)} >Delete</button>
                        </div>
                        :

                        <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>
                    }
                </div>
            </form>
        </section>
    );
};

export default KidProfile;
