import React, { useState } from 'react';

const AddRoleModal = ({ isOpen, onClose, onAddRole }) => {
  const [className, setClassName] = useState('');
  const [classNameError, setClassNameError] = useState('');
  const [roleItems, setRoleItems] = useState([
    { id: 1, Selected: 0, Name: "Nursery-Profile" },
    { id: 2, Selected: 0, Name: "Manage-Classes" },
    { id: 3, Selected: 0, Name: "Meals" },
    { id: 4, Selected: 0, Name: "NewsLetter" },
    { id: 5, Selected: 0, Name: "Parent-Request" },
    { id: 6, Selected: 0, Name: "Payment-History" },
    { id: 7, Selected: 0, Name: "Payment-Request" },
    { id: 8, Selected: 0, Name: "Nursery-Policy" },
    { id: 9, Selected: 0, Name: "Roles" },
    { id: 10, Selected: 0, Name: "Faq" }
  ]);
  const [roleItemsError, setRoleItemsError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setClassNameError('');
    setRoleItemsError('');

    // Validation
    if (className.trim() === '') {
      setClassNameError('Role name is required');
      return;
    }

    if (roleItems.every(item => item.Selected === 0)) {
        console.log("dhadsa jsahdkab ")
      setRoleItemsError('At least one role item must be selected');
      return;
    }

    // Proceed if validation passes
    onAddRole( className, roleItems);
    ClearData();
    onClose();
  };

  const handleCheckboxChange = (id) => {
    setRoleItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, Selected: item.Selected === 0 ? 1 : 0 } : item
      )
    );
    setRoleItemsError(''); 
  };

  const ClearData = ()=>{
    setClassName('');
    setClassNameError('');
    setRoleItems([
        { id: 1, Selected: 0, Name: "Nursery-Profile" },
        { id: 2, Selected: 0, Name: "Manage-Classes" },
        { id: 3, Selected: 0, Name: "Meals" },
        { id: 4, Selected: 0, Name: "NewsLetter" },
        { id: 5, Selected: 0, Name: "Parent-Request" },
        { id: 6, Selected: 0, Name: "Payment-History" },
        { id: 7, Selected: 0, Name: "Payment-Request" },
        { id: 8, Selected: 0, Name: "Nursery-Policy" },
        { id: 9, Selected: 0, Name: "Roles" },
        { id: 10, Selected: 0, Name: "Faq" }
      ]);
    setRoleItemsError('');
  }

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Add Role</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="className"
                className="ClassNameInput mt-2"
                placeholder="Role Name  "
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  if (e.target.value.trim() !== '') {
                    setClassNameError('');
                  }
                }}
              />
              {classNameError && <div className="text-danger PopUpError mt-0">{classNameError}</div>}
            </label>
            <div className={`ChooseRoleItems ${roleItemsError?'':'mb-4'} `}>
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

            <div className="form-buttons">
              <button className="RegisterBtn" type="submit">
                Save
              </button>
              <button className="CancelBtn" type="button" onClick={()=>{onClose();ClearData();}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
