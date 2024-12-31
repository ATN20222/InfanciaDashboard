import React, { useEffect, useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';
import { ClassService, RolesServices } from '../../Service/Api';
import RolesDropDown from '../../Components/DrobDown/RolesDropDown';
import ClassDropDown from '../../Components/DrobDown/ClassDropDown';

const AddAdminModal = ({ isOpen, onClose, onAddAdmin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [roles, setRoles] = useState([{ id: 1, name: 'teacher' }, { id: 2, name: 'admin' }]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [classError, setClassError] = useState('');
  const [roleItems, setRoleItems] = useState([
    { id: 1, Selected: 0, Name: "Manage-Classes" },
    { id: 2, Selected: 0, Name: "Nursery-Profile" },
    { id: 3, Selected: 0, Name: "Meals" },
    { id: 4, Selected: 0, Name: "Newsletter" },
    { id: 5, Selected: 0, Name: "Nursery-Policy" },
    { id: 6, Selected: 0, Name: "Faq" },
    { id: 7, Selected: 0, Name: "Payment-Bills" },
    { id: 8, Selected: 0, Name: "Payment-Request" },
    { id: 9, Selected: 0, Name: "Admins" },
    { id: 10, Selected: 0, Name: "Subjects" },
    { id: 11, Selected: 0, Name: "Schedule" },
    { id: 12, Selected: 0, Name: "Chats" }
  ]);
  const [roleItemsError, setRoleItemsError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setClassError('');
    setRoleError('');
    setEmailError('');
    setPhoneNumberError('');
    setRoleItemsError('');

    let isValid = true;

    // Name validation
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
      return;
    }

    // Role validation
    console.log(selectedOption)
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

    if (roleItems.every(item => item.Selected === 0)) {
      setRoleItemsError('At least one role item must be selected');
      return;
    }


    if (!isValid) return;
    var temp = {
      classes: []
    };
    console.log(name, selectedOption, email, phoneNumber);
    onAddAdmin(name, selectedOption, email, phoneNumber , roleItems);
    clearData();
    onClose();
  };

  useEffect(() => {
    GetClasses();
  }, []);


  const clearData = () => {
    setName('');
    setRole('');
    setEmail('');
    setPhoneNumber('');
    setNameError('');
    setRoleError('');
    setEmailError('');
    setPhoneNumberError('');
    setSelectedClass('');
    setClassError('');
    setSelectedOption('');
    setRoleItems([
      { id: 1, Selected: 0, Name: "Manage-Classes" },
      { id: 2, Selected: 0, Name: "Nursery-Profile" },
      { id: 3, Selected: 0, Name: "Meals" },
      { id: 4, Selected: 0, Name: "Newsletter" },
      { id: 5, Selected: 0, Name: "Nursery-Policy" },
      { id: 6, Selected: 0, Name: "Faq" },
      { id: 7, Selected: 0, Name: "Payment-Bills" },
      { id: 8, Selected: 0, Name: "Payment-Request" },
      { id: 9, Selected: 0, Name: "Admins" },
      { id: 10, Selected: 0, Name: "Subjects" },
      { id: 11, Selected: 0, Name: "Schedule" },
      { id: 12, Selected: 0, Name: "Chats" }
    ]);
    setRoleItemsError('');
  };

  const handleCheckboxChange = (id) => {
    setRoleItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, Selected: item.Selected === 0 ? 1 : 0 } : item
      )
    );
    setRoleItemsError('');
  };

  const handleRoleChanged = (name) => {
    setSelectedOption(name);
    if (name === 'teacher')
      setIsTeacher(true);
    else
      setIsTeacher(false);
  }



  async function GetClasses() {
    try {

      const response = await ClassService.List();
      response.content.push({ id: 0, name: 'All' });
      setClasses(response.content);

    } catch (error) {
      console.log(error)

    }
  }


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
                onChange={handleRoleChanged}
                Options={roles}
                DefaultValue={selectedOption?selectedOption:'Role : '}
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

            
                <div className={`ChooseRoleItems ${roleItemsError ? '' : 'mb-1'} `}>
                  {roleItems.map((item) => (
                    <div className="RoleItem" key={item.id}>
                      <input
                        type="checkbox"
                        value={item.id}
                        id={item.Name}
                        checked={item.Selected === 1}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <label htmlFor={item.Name}>{item.Name}</label>
                    </div>
                  ))}
                </div>
                {roleItemsError && <span className="text-danger PopUpError mt-0 mb-4">{roleItemsError}</span>}
              

            <div className="form-buttons mt-4">
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
