import React, { useEffect, useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';
import { RolesServices } from '../../Service/Api';
import RolesDropDown from '../../Components/DrobDown/RolesDropDown';

const AddAdminModal = ({ isOpen, onClose, onAddAdmin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roles , setRoles] = useState([]);
  const [selectedOption , setSelectedOption] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setRoleError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');

    let isValid = true;

    // Name validation
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
      return;
    }

    // Role validation
    if (selectedOption === '') {
      setRoleError('Role is required');
      isValid = false;
      return;

    }

    // Email validation
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
      return;

    } else if (
      !/^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-]+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
    ) {
      setEmailError('Invalid email');
      isValid = false;
      return;

    }

    // Phone number validation
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone number is required');
      isValid = false;
      return;

    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      setPhoneNumberError('Invalid phone number format');
      isValid = false;
      return;

    }

    // Password validation
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
      return;

    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters and Aa-Zz Characters');
      isValid = false;
      return;

    }

    if (!isValid) return;

    onAddAdmin( name, role, email, phoneNumber, password );
    clearData();
    onClose();
  };

  useEffect(()=>{
    GetData();
},[]);
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }
async function GetData() {
    try {

        const response = await RolesServices.List();
        setRoles(response.content);
    
        console.log(response.content)
    } catch (error) {
        console.log(error)

    }
}
  const clearData = () => {
    setName('');
    setRole('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setNameError('');
    setRoleError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Add Admin</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                className="ClassNameInput mt-2"
                placeholder="Name :"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <span className="text-danger PopUpValidation">{nameError}</span>
              )}
            </label>

            <div className="ChooseAdminRole">
              <RolesDropDown
                onChange={(id)=>setSelectedOption(id)}
                Options={roles}
                DefaultValue="Role :"
                selectedValue={selectedOption}
                onSelect={(value) => setRole(value)}
              />
              {roleError && (
                <span className="text-danger PopUpValidation">{roleError}</span>
              )}
            </div>

            <label>
              <input
                type="text"
                name="email"
                className="ClassNameInput mt-2"
                placeholder="Email :"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <span className="text-danger PopUpValidation">{emailError}</span>
              )}
            </label>

            <label>
              <input
                type="text"
                name="phoneNumber"
                className="ClassNameInput mt-2"
                placeholder="Phone Number :"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberError && (
                <span className="text-danger PopUpValidation">
                  {phoneNumberError}
                </span>
              )}
            </label>

            <label>
              <input
                type="password"
                name="password"
                className={`ClassNameInput mt-2 ${passwordError?'':' mb-4'}`}
                placeholder="Password :"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <span className="text-danger PopUpValidation mb-4">
                  {passwordError}
                </span>
              )}
            </label>

            <div className="form-buttons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>

              <button
                type="button"
                className="CancelBtn"
                onClick={() => {
                  onClose();
                  clearData();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
