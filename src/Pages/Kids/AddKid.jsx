import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import { KidsServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const AddKid = () => {
    const [selectedGender, setSelectedGender] = useState(true);
    const [kidName, setKidName] = useState('');
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
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
    const [DateError, setDateError] = useState('');
    const [ImageError, setImageError] = useState('');
    const [ImageFile, setImageFile] = useState('');
    const [loading , setLoading] = useState(false);
    const Cities=["El-Marg", "Ain Shams"];
    const yearInputRef = useRef();
    const monthInputRef = useRef();
    const dayInputRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const classId = searchParams.get('classId');
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

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        let valid = true;

        if (!ImageFile) {
            setImageError("Kid image is required");
            valid = false;
            setLoading(false);
            return;

        } else {
            setImageError('');
        }
        if (kidName === '') {
            setKidNameError("Kid name is required");
            valid = false;
            setLoading(false);
            return;

        } else {
            setKidNameError('');
        }
        
        if (parentName === '') {
            setParentNameError("Parent name is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            setParentNameError('');
        }

        if (email === '') {
            setEmailError("Email is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            setEmailError('');
        }

        if (mobile === '') {
            setMobileError("Mobile number is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            setMobileError('');
        }

        if (city === '') {
            setCityError("City is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            setCityError('');
        }

        if (address === '') {
            setAddressError("Address is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setAddressError('');
        }
        if(yearInputRef.current.value==''||dayInputRef.current.value==''||monthInputRef.current.value==''){
            setDateError("Day , Month and Year are required");
            setLoading(false);
            valid=false;
            return;
        }
        else{
            setDateError("")

        }

        if (fatherName === '') {
            setFatherNameError("Father name is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setFatherNameError('');
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

        if (motherName === '') {
            setMotherNameError("Mother name is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setMotherNameError('');
        }

        if (motherMobile === '') {
            setLoading(false);
            setMotherMobileError("Mother mobile number is required");
            valid = false;
            return;

        } else {
            setMotherMobileError('');
        }

        if (motherJob === '') {
            setLoading(false);
            setMotherJobError("Mother job is required");
            valid = false;
            return;

        } else {
            setMotherJobError('');
        }

        if (emergencyPhone === '') {
            setEmergencyPhoneError("Emergency phone is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setEmergencyPhoneError('');
        }

        if (valid) {
            

            try {
                const Birthdate = `${yearInputRef.current.value}-${monthInputRef.current.value}-${dayInputRef.current.value}`
                console.log( kidName ,parentName ,
                    email ,mobile , 
                   selectedGender?"boy":"girl",
                   Birthdate,city,
                   address ,classId,
                   fatherName,fatherMobile,fatherJob,
                   motherName,motherMobile,
                   motherJob,hasMedicalCase?'1':'0');
                const response = 
                await KidsServices.Add(
                    kidName ,parentName ,
                     email ,mobile , 
                    selectedGender?"boy":"girl",
                    Birthdate ,Cities[city],
                    address ,classId,
                    fatherName,fatherMobile,fatherJob,
                    motherName,motherMobile,
                    motherJob,hasMedicalCase?'1':'0',
                    emergencyPhone,
                    ImageFile
                    );
                console.log(response);
                toast.success('Kid added successfully');
                setLoading(false);
                setTimeout(() => {
                    navigate('/manageclasses');
                }, 2000);
                
                
                
              } catch (error) {
                  console.log(error)
                  toast.error('Failed to add kid');
                  setLoading(false);
          
              }


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
        } else {
            setImageError('No file selected.');
        }
    };
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
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
                            Add Kid
                        </div>
                    </div>
                </div>
            </div>
            <form className="SubjectsContainer FormContainer" onSubmit={handleSubmit}>
                <div className="row AddTeacherRow">
                    <div className="col-lg-12 Center KidImageColForm">
                        <div className="CircleInPopUp Center">
                            <label htmlFor="Image">
                                <FontAwesomeIcon icon={faImage} />
                                <input type="file" id="Image" accept="image/*"
                                    onChange={handleFileChange}/>
                            </label>
                        </div>
                        {ImageError && <span className="text-danger FormError">{ImageError}</span>}

                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidFirstNameInput" value={kidName} onChange={(e) => setKidName(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidFirstName">Kid Name : </label>
                        {kidNameError && <span className="text-danger FormError">{kidNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidLastNameInput" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidLastName">User Name : </label>
                        {parentNameError && <span className="text-danger FormError">{parentNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="email" className="EmpInput KidEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidEmail">Email : </label>
                        {emailError && <span className="text-danger FormError">{emailError}</span>}
                    </div>
                    <div className="col-lg-5">
                    <div className="col-lg-12 EmpFormCol EmpMobFormCol">
                        <div className="EgEmpMob Center">
                            <span>EG+20</span>
                        </div>
                        <input type="number" className="EmpInput EmpMobInput" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <label className="EmpLabel EmpMobLabel" htmlFor="EmpMob">Mobile No. : </label>
                        
                    </div>
                    {mobileError &&
                        <div className="FormError">
                            <span className="text-danger ">{mobileError}</span>

                        </div>
                        }
                    </div>
                    
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={Cities} DefaultValue={"City: "} onChange={setCity} />
                        {cityError && <span className="text-danger FormError">{cityError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidAddressInput" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label className="EmpLabel KidAddressInput" htmlFor="KidAddress">Address : </label>
                        {addressError && <span className="text-danger FormError">{addressError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol">
                        <div className="TopInputTitle">Gender</div>
                        <div className="GenderContainer">
                            <div className="container">
                            <div className="row Center">
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div className={`Boy ${selectedGender === true ? "SelectedGender" : ""}`} onClick={() => setSelectedGender(true)}>
                                            BOY
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <div className={`Girl ${selectedGender === false ? "SelectedGender" : ""}`} onClick={() => setSelectedGender(false)}>
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
                                    max="31"
                                />
                            </div>

                        </div>
                            {DateError && <span className="text-danger FormError">{DateError}</span>}
                    </div>


                    <div className="col-lg-12 ParentsInformationHeader">
                        <h5>Parents Information</h5>
                    </div>


                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput FathertNameInput" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertName">Father Name : </label>
                        {fatherNameError && <span className="text-danger FormError">{fatherNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput FathertMobInput" value={fatherMobile} onChange={(e) => setFatherMobile(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertMob">Father Mobile : </label>
                        {fatherMobileError && <span className="text-danger FormError">{fatherMobileError}</span>}
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput FathertJobInput" value={fatherJob} onChange={(e) => setFatherJob(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertJob">Father Job : </label>
                        {fatherJobError && <span className="text-danger FormError">{fatherJobError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput MotherNameInput" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherName">Mother Name : </label>
                        {motherNameError && <span className="text-danger FormError">{motherNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput MotherMobInput" value={motherMobile} onChange={(e) => setMotherMobile(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherMob">Mother Mobile : </label>
                        {motherMobileError && <span className="text-danger FormError">{motherMobileError}</span>}
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput MotherJobInput" value={motherJob} onChange={(e) => setMotherJob(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="MotherJob">Mother Job : </label>
                        {motherJobError && <span className="text-danger FormError">{motherJobError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput EmergencyPhoneInput" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmergencyPhone">Emergency Phone : </label>
                        {emergencyPhoneError && <span className="text-danger FormError">{emergencyPhoneError}</span>}
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
                    {!loading?
                    <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                        <button type="submit" className="RegisterBtn">Save</button>
                        <button type="button" className="CancelBtn">Close</button>
                    </div>
                    :
                    
                    <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>
                                        
                    }
                    
                </div>
            </form>
        </section>
    );
};

export default AddKid;

