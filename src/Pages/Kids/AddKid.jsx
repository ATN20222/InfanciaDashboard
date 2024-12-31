import { faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import { KidsServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getBranchId, getNurseryId } from "../../Service/AxiosApi";

const AddKid = () => {
    const [selectedGender, setSelectedGender] = useState(true);
    const [kidName, setKidName] = useState('');
    const [KidLastName, setKidLastName] = useState('');
    const [email, setEmail] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherMobile, setFatherMobile] = useState('');
    const [fatherJob, setFatherJob] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');
    const [hasMedicalCase, setHasMedicalCase] = useState(false);
    const [kidNameError, setKidNameError] = useState('');
    const [KidLastNameError, setKidLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fatherNameError, setFatherNameError] = useState('');
    const [fatherMobileError, setFatherMobileError] = useState('');
    const [fatherJobError, setFatherJobError] = useState('');
    const [emergencyPhoneError, setEmergencyPhoneError] = useState('');
    const [DateError, setDateError] = useState('');
    const [ImageError, setImageError] = useState('');
    const [ImageFile, setImageFile] = useState('');

    const [kidsData, setKidsData] = useState([
        {
            selectedGender: true,
            kidName: '',
            kidLastName: '',
            email: '',
            fatherName: '',
            fatherMobile: '',
            fatherJob: '',
            emergencyPhone: '',
            hasMedicalCase: false,
            kidNameError: '',
            kidLastNameError: '',
            emailError: '',
            fatherNameError: '',
            fatherMobileError: '',
            fatherJobError: '',
            emergencyPhoneError: '',
            dateError: '',
            imageError: '',
            imageFile: '',
        },
    ]);


    const [loading, setLoading] = useState(false);
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


    const handleFieldChange = (index, field, value) => {
        const updatedKidsData = [...kidsData];
        updatedKidsData[index][field] = value;
        setKidsData(updatedKidsData);
    };
    const handleGenderChange = (index, gender) => {
        const updatedKidsData = [...kidsData];
        updatedKidsData[index].selectedGender = gender;
        setKidsData(updatedKidsData);
    };
    const handleMedicalCaseChange = (index) => {
        const updatedKidsData = [...kidsData];
        updatedKidsData[index].hasMedicalCase = !updatedKidsData[index].hasMedicalCase;
        setKidsData(updatedKidsData);
    };

    const validateFields = (index) => {
        const updatedKidsData = [...kidsData];
        const kid = updatedKidsData[index];
        let valid = true;
        if (!kid.kidName) {
            updatedKidsData[index].kidNameError = 'First name is required';
            valid = false;
        } else {
            updatedKidsData[index].kidNameError = '';
        }
        if (!kid.kidLastName) {
            updatedKidsData[index].kidLastNameError = 'Last name is required';
            valid = false;

        } else {
            updatedKidsData[index].kidLastNameError = '';
        }
        if (!kid.birthYear || !kid.birthMonth || !kid.birthDay) {
            updatedKidsData[index].dateError = 'All birth date fields are required';
            valid = false;

        } else {
            updatedKidsData[index].dateError = '';
        }

        setKidsData(updatedKidsData);
        return valid;
    };




    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        let valid = true;

        if (fatherName === '') {
            setFatherNameError("Parent name is required");
            setLoading(false);
            valid = false;

        } else {
            setFatherNameError('');
        }

        if (fatherMobile === '') {
            setFatherMobileError("Parent mobile number is required");
            setLoading(false);
            valid = false;

        } else {
            setFatherMobileError('');
        }

        if (fatherJob === '') {
            setFatherJobError("Parent job is required");
            setLoading(false);
            valid = false;
        } else {
            setFatherJobError('');
        }


        if (emergencyPhone === '') {
            setEmergencyPhoneError("Emergency phone is required");
            setLoading(false);
            valid = false;

        } else {
            setEmergencyPhoneError('');
        }
        let validKid = true;
        kidsData.forEach((_, index) => {
            validKid = validateFields(index);
            if (validKid == false){
                setLoading(false)
                return;
            }
        });

        if (valid && validKid) {

            
            const formattedData = kidsData.map((kid) => {
                const birthDate = `${kid.birthYear}-${kid.birthMonth}-${kid.birthDay}`;
                var formData = new FormData();
                formData.append('media', kid.imageFile);
                return {
                    first_name: kid.kidName,
                    last_name: kid.kidLastName,
                    birth_date: birthDate,
                    gender: kid.selectedGender ? "boy" : "girl",
                    has_medical_case: kid.hasMedicalCase ? 1 : 0,
                    description_medical_case: kid.descriptionMedicalCase || "no",
                    branch_id: getBranchId(),
                    nursery_id: getNurseryId(),
                    class_room_id: parseInt(classId),
                    media: formData.get('media')
                };
            });



            try {
                
                console.log("all data",fatherName, 
                    email,
                    fatherMobile,
                    fatherJob,
                    emergencyPhone,
                    formattedData);
                
                const response  = await KidsServices.Add(
                    fatherName, 
                    email,
                    fatherMobile,
                    fatherJob,
                    emergencyPhone,
                    formattedData
                )

                toast.success('Kid added successfully');
                setLoading(false);
                setTimeout(() => {
                    navigate('/manageclasses');
                }, 2000);



            } catch (error) {
                toast.error('Failed to add kid');
                setLoading(false);

            }


        }
    };
    
    const handleFileChange = (index, e) => {
        const updatedKidsData = [...kidsData];
        updatedKidsData[index].imageFile = e.target.files[0];
        setKidsData(updatedKidsData);
    };

    
    const removeKid = (index) => {
        const updatedKidsData = kidsData.filter((_, i) => i !== index);
        setKidsData(updatedKidsData);
    };

    const addNewKid = (e) => {
        e.preventDefault();
        
        setKidsData([
            ...kidsData,
            {
                selectedGender: true,
                kidName: '',
                kidLastName: '',
                email: '',
                fatherName: '',
                fatherMobile: '',
                fatherJob: '',
                emergencyPhone: '',
                hasMedicalCase: false,
                kidNameError: '',
                kidLastNameError: '',
                emailError: '',
                fatherNameError: '',
                fatherMobileError: '',
                fatherJobError: '',
                emergencyPhoneError: '',
                dateError: '',
                imageError: '',
                imageFile: '',
            },
        ]);
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

                    <div className="col-lg-12 ParentsInformationHeader">
                        <h5>Parents Information</h5>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput FathertNameInput" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertName">Parent Name : </label>
                        {fatherNameError && <span className="text-danger FormError">{fatherNameError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="email" className="EmpInput KidEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel KidEmailLable" htmlFor="KidEmail">Email : </label>
                        {emailError && <span className="text-danger FormError">{emailError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput FathertMobInput" value={fatherMobile} onChange={(e) => setFatherMobile(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertMob">Parent Mobile : </label>
                        {fatherMobileError && <span className="text-danger FormError">{fatherMobileError}</span>}
                    </div>
                    <div className="col-lg-5 EmpFormCol KidParentData">
                        <input type="number" className="EmpInput EmergencyPhoneInput" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="EmergencyPhone">Emergency Phone : </label>
                        {emergencyPhoneError && <span className="text-danger FormError">{emergencyPhoneError}</span>}
                    </div>
                    <div className="col-lg-12 EmpFormCol KidParentData">
                        <input type="text" className="EmpInput FathertJobInput" value={fatherJob} onChange={(e) => setFatherJob(e.target.value)} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="FathertJob">Parent Job : </label>
                        {fatherJobError && <span className="text-danger FormError">{fatherJobError}</span>}
                    </div>



                    {/* <div className="KidData row justify-content-between">

                        <div className="col-lg-12 Center KidImageColForm">
                            <div className="CircleInPopUp Center">
                                <label htmlFor="Image">
                                    <FontAwesomeIcon icon={faImage} />
                                    <input type="file" id="Image" accept="image/*"
                                        onChange={handleFileChange} />
                                </label>
                            </div>
                            {ImageError && <span className="text-danger FormError">{ImageError}</span>}
                        </div>
                        <div className="col-lg-5 EmpFormCol KidDataCol">
                            <input type="text" className="EmpInput KidFirstNameInput" value={kidName} onChange={(e) => setKidName(e.target.value)} />
                            <label className="EmpLabel KidFirstNameLable" htmlFor="KidFirstName">First Name : </label>
                            {kidNameError && <span className="text-danger FormError">{kidNameError}</span>}
                        </div>
                        <div className="col-lg-5 EmpFormCol KidDataCol">
                            <input type="text" className="EmpInput KidLastNameInput" value={KidLastName} onChange={(e) => setKidLastName(e.target.value)} />
                            <label className="EmpLabel EmpNameLabel" htmlFor="KidLastName">Last Name : </label>
                            {KidLastNameError && <span className="text-danger FormError">{KidLastNameError}</span>}
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
                    </div> */}
                    {kidsData.map((kid, index) => (
                        <div key={index} className="KidData row justify-content-between mt-2">
                            {kidsData.length > 1 &&
                                <div className="col-lg-12 EmpFormCol d-flex justify-content-end">
                                    <button className="btn btn-danger" onClick={() => removeKid(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            }
                            <div className="col-lg-12 Center KidImageColForm">
                                {/* <div className="CircleInPopUp Center">
                                    <label htmlFor={`Image-${index}`}>
                                        <FontAwesomeIcon icon={faImage} />
                                        <input
                                            type="file"
                                            id={`Image-${index}`}
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, e)}
                                        />
                                    </label>
                                </div>
                                {kid.imageError && (
                                    <span className="text-danger FormError">{kid.imageError}</span>
                                )}                             */}
                                
                                </div>

                            <div className="col-lg-5 EmpFormCol KidDataCol">
                                <input
                                    type="text"
                                    className="EmpInput KidFirstNameInput"
                                    value={kid.kidName}
                                    onChange={(e) => handleFieldChange(index, 'kidName', e.target.value)}
                                />
                                <label className="EmpLabel KidFirstNameLable" htmlFor={`KidFirstName-${index}`}>
                                    First Name :
                                </label>
                                {kid.kidNameError && <span className="text-danger FormError">{kid.kidNameError}</span>}
                            </div>

                            <div className="col-lg-5 EmpFormCol KidDataCol">
                                <input
                                    type="text"
                                    className="EmpInput KidLastNameInput"
                                    value={kid.kidLastName}
                                    onChange={(e) => handleFieldChange(index, 'kidLastName', e.target.value)}
                                />
                                <label className="EmpLabel EmpNameLabel" htmlFor={`KidLastName-${index}`}>
                                    Last Name :
                                </label>
                                {kid.kidLastNameError && <span className="text-danger FormError">{kid.kidLastNameError}</span>}
                            </div>

                            <div className="col-lg-5 EmpFormCol">
                                <div className="TopInputTitle">Gender</div>
                                <div className="GenderContainer">
                                    <div className="container">
                                        <div className="row Center">
                                            <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                                <div
                                                    className={`Boy ${kid.selectedGender === true ? 'SelectedGender' : ''}`}
                                                    onClick={() => handleGenderChange(index, true)}
                                                >
                                                    BOY
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                                <div
                                                    className={`Girl ${kid.selectedGender === false ? 'SelectedGender' : ''}`}
                                                    onClick={() => handleGenderChange(index, false)}
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
                                            className="year"
                                            type="number"
                                            placeholder="YYYY"
                                            onChange={(e) => handleFieldChange(index, 'birthYear', e.target.value)}
                                        />
                                    </div>
                                    <div className="Month">
                                        <input
                                            className="Month"
                                            type="number"
                                            placeholder="MM"
                                            max="12"
                                            onChange={(e) => handleFieldChange(index, 'birthMonth', e.target.value)}
                                        />
                                    </div>
                                    <div className="Day">
                                        <input
                                            className="Day"
                                            type="number"
                                            placeholder="DD"
                                            max="31"
                                            onChange={(e) => handleFieldChange(index, 'birthDay', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {kid.dateError && <span className="text-danger FormError">{kid.dateError}</span>}
                            </div>

                            <div className="col-lg-12 EmpFormCol HasMedicalCaseCol">
                                <div className="InputSelectAll HasMedicalCase">
                                    <input
                                        type="checkbox"
                                        id={`HasCase-${index}`}
                                        checked={kid.hasMedicalCase}
                                        onChange={() => handleMedicalCaseChange(index)}
                                    />
                                    <label htmlFor={`HasCase-${index}`}>Has Medical Case</label>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className="col-lg-12 d-flex justify-content-center">
                        <button className="btn btn-success text-white" onClick={addNewKid}>
                            <FontAwesomeIcon icon={faPlus}/> 
                            <span className="p-2">
                                Add Another Kid

                            </span>
                        </button>
                    </div>



                    {!loading ?
                        <div className="col-lg-12 FormInputCol FormInputColReg RegisterBtns">
                            <button type="submit" className="RegisterBtn">Save</button>
                            <button type="button" className="CancelBtn" onClick={()=>navigate('/manageclasses')}>Close</button>
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
