import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";

const EditProfilePopup = ({ show, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phones: [""],
    email: "",
  });
  const [about, setAbout] = useState("");
  const [startFees, setStartFees] = useState("");
  const [services, setServices] = useState("");

  const handleAddPhone = () => {
    setContactInfo((prev) => ({
      ...prev,
      phones: [...prev.phones, ""],
    }));
  };

  const handleRemovePhone = (index) => {
    if (contactInfo.phones.length > 1) {
      setContactInfo((prev) => ({
        ...prev,
        phones: prev.phones.filter((_, i) => i !== index),
      }));
    }
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...contactInfo.phones];
    updatedPhones[index] = value;
    setContactInfo((prev) => ({
      ...prev,
      phones: updatedPhones,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    show && (
      <div className="EditProfileModal modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="EditProfileModalContent modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* Section 1: Edit Profile Picture */}
              <div className="mb-4">
                {/* <label className="form-label EditProfileModalLabel">Profile Picture</label> */}
                
                  <div className="EditProfilePreview Center mb-4">
                    <label htmlFor="EditImageProfile">
                      <div className="Cam">
                        <FontAwesomeIcon icon={faCamera}/>
                      </div>                    
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="img-thumbnail mb-2 ProfilePreview"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </label>
                  </div>
                
                <input
                  id="EditImageProfile"
                  type="file"
                  className="form-control d-none"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </div>

              {/* Section 2: Edit Contact Info */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
                <label className="form-label EditProfileModalLabel mt-3">Phone Numbers</label>
                {contactInfo.phones.map((phone, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemovePhone(index)}
                      disabled={contactInfo.phones.length === 1}
                    >
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                  </div>
                ))}
                <div 
                  className="AddAnotherPhone text-end" 
                >
                  <span className="text-decoration-underline"
                  onClick={handleAddPhone}
                  
                  >
                  Add Phone
                  </span>
                </div>
                
                <label className="form-label EditProfileModalLabel mt-3">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              {/* Section 3: About */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">About</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              {/* Section 4: Start Fees */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Start Fees</label>
                <input
                  type="number"
                  className="form-control"
                  value={startFees}
                  onChange={(e) => setStartFees(e.target.value)}
                />
              </div>

              {/* Section 5: Provided Services */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Provided Services</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="form-buttons EditProfileButtons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>
              <button
                type="button"
                className="CancelBtn"
                onClick={() => { onClose();}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfilePopup;
