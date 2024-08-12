import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import './Kids.css';
import CustomDropdown from "../../Components/DrobDown/CustomDropdown";
import toast, { Toaster } from "react-hot-toast";
import { ClassService, KidsServices } from "../../Service/Api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KidProfileDropdown from "../../Components/DrobDown/KidProfileDropdown";

const KidProfile = () => {
    const [birthdate, setBirthdate] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [kidName, setKidName] = useState('');
    const [kId, setKId] = useState('');
    const [classes , setClasses] = useState([]);
    const [selectedClass , setSelectedClass]=useState('');
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [classId, setClassId] = useState('');
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
    const kidId = searchParams.get('kidId');

    useEffect(()=>{
        GetData();
        GetClasses();
    },[])

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(email);
    }

    const handleSubmit = async (event) => {
        
        setLoading(true);
        event.preventDefault();
        let valid = true;


        if (kidName === '') {
            setKidNameError("Kid name is required");
            valid = false;
            setLoading(false);
            return;

        } else {
            setKidNameError('');
        }

        if (email === '') {
            setEmailError("Email is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            if(validateEmail(email)){
                setEmailError('');
            }else
            setEmailError('email is invalid');
        }


        // if ( ImageFile=== null) {
        //     setImageError("Kid image is required");
        //     valid = false;
        //     setLoading(false);
        //     return;

        // } else {
        //     setKidNameError('');
        // }

        if (mobile === '') {
            setMobileError("Mobile number is required");
            valid = false;
            setLoading(false);

            return;

        } else {
            setMobileError('');
        }

        // if (city === '') {
        //     setCityError("City is required");
        //     valid = false;
        //     setLoading(false);

        //     return;

        // } else {
        //     setCityError('');
        // }

        if (address === '') {
            setAddressError("Address is required");
            setLoading(false);
            valid = false;
            return;

        } else {
            setAddressError('');
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


            try {
                const response = 
                await KidsServices.Edit(
                    kidId,
                    kidName ,parentName ,
                    email ,mobile , 
                    selectedGender,
                    birthdate , city,
                    address ,selectedClass,
                    fatherName,fatherMobile,fatherJob,
                    motherName,motherMobile,
                    motherJob,hasMedicalCase?'1':'0',
                    emergencyPhone
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
        } else {
            setImageError('No file selected.');
        }
    };
    const ClearData =()=>{
        setAddressError('');
        setCityError('');
        setDateError('');
        setEmailError('');
        setEmergencyPhone('');
        setEmergencyPhoneError('');
        setFatherJobError('');
        setFatherMobileError('');
        setFatherNameError('');
        setImageError('');
        setKidNameError('');
        setMobileError('');
        setMotherJobError('');
        setMotherMobileError('');
        setMotherNameError('');
        setParentNameError('');
        setFatherJob('');
        setAddress('')
        setCity('');
        setEmail('');
        setFatherMobile('');
        setFatherName('');
        setHasMedicalCase(null);
        setImageFile(null);
        setKidName('');
        setMobile('');
        setMotherJob('');
        setMotherMobile('');
        setMotherName('');
        setParentName('');
        setSelectedGender(true);
        
    }
    async function GetClasses() {
        try {
    
          const response = await ClassService.List();
          setClasses(response.content);
    
          
        } catch (error) {
            console.log(error)
    
        }
    }

    const GetData = async ()=>{
        
        try {
            
            const response = await KidsServices.profile(kidId);
            
            setKidName(response.content.kid_name);
            setKId(response.content.id);
            setSelectedClass(response.content.class_id);
            setEmail(response.content.parent.user.email);
            setMobile(response.content.parent.user.phone);
            setCity(response.content.parent.user.city);
            setParentName(response.content.parent.user.name);
            setAddress(response.content.address);
            setSelectedGender(response.content.gender);
            setBirthdate(response.content.birthdate)
            setClassId(response.content.class_id);
            setFatherMobile(response.content.parent.father_mobile);
            setFatherName(response.content.parent.father_name);
            setMotherName(response.content.parent.mother_name);
            setMotherMobile(response.content.parent.mother_mobile);
            setMotherJob(response.content.parent.mother_job);
            setFatherJob(response.content.parent.father_job);
            setEmergencyPhone(response.content.parent.emergency_phone);
            setHasMedicalCase(response.content.has_medical_case);
            // setImageFile(null);
            
            } catch (error) {
            
                toast.error('Failed to add kid');
            

            }
    }

    const handleSelectedClassChange = (classId) => {
        setSelectedClass(classId);
        console.log(classId)
    };

    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 201, amount: "20$", class:"Class A", date: "20-8-2024" , service:"Travel"},
        { id: 2, name: "Ahmed hamed", paymentId: 204, amount: "20$", class:"Class B", date: "20-8-2024" , service:"Travel"}
    ];

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
                            Kid Profile
                        </div>
                    </div>
                </div>
            </div>
            <form className="SubjectsContainer FormContainer" onSubmit={handleSubmit}>
                <div className="row AddTeacherRow">
                    <div className="col-lg-12 Center KidImageColForm mb-3">
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

                    <div className="col-lg-5 EmpFormCol KidDataCol ">
                        <input disabled type="text" className="EmpInput KidIDCodeInput" name="" id="KidIDCode" value={kId} />
                        <label className="EmpLabel EmpNameLabel" htmlFor="KidIDCode">ID Code : </label>
                    </div>
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <KidProfileDropdown onChange={handleSelectedClassChange} Options={classes}  DefaultValue={selectedClass}/>
                    </div>
                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["El-Marg","Ain Shams"]} DefaultValue={"Branch: "}/>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    

                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidGenderInput" name="" id="KidGender" disabled value={selectedGender}/>
                        <label className="EmpLabel KidGenderLabel" htmlFor="KidGender">Gender : </label>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidBirthDateInput" name="" id="BirthDate" value={birthdate} />
                        <label className="EmpLabel KidGender" htmlFor="KidAddress">Birth Date : </label>
                    </div>

                    <div className="col-lg-5 FormInputCol FormInputColReg">
                        <CustomDropdown Options={["El-Marg","Ain Shams"]} DefaultValue={"City: "}/>
                    </div>
                    <div className="col-lg-5 EmpFormCol KidDataCol">
                        <input type="text" className="EmpInput KidAddressInput" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label className="EmpLabel KidAddressInput" htmlFor="KidAddress">Address : </label>
                        {addressError && <span className="text-danger FormError">{addressError}</span>}
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
                            <Link type="button" to="/manageclasses" className="CancelBtn">Close</Link>
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
