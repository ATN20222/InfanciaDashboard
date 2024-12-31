import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NurseryProfileService } from "../../Service/Api";
import { getNurseryId } from "../../Service/AxiosApi";
import { icon } from "@fortawesome/fontawesome-svg-core";
import toast, { Toaster } from "react-hot-toast";

const EditProfilePopup = ({ show, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name , setName] = useState('');
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phones: [{ id: null, text: "" }],
    emails: [{ id: null, text: "" }],

  });
  const [notChangedData , setNotChangedData] = useState({
    generate_branch:'',
    city_id:'',
    country_id:''
  })
  const [about, setAbout] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [startFees, setStartFees] = useState("");
  const [services, setServices] = useState([{ id: null, text: "" }]);
  const [links, setLinks] = useState([{ id: null, text: "" }]);


  useEffect(() => {
    GetData();
  }, []);
  async function GetData() {
    try {
      const response = await NurseryProfileService.ListInfo();
      console.log(response);
      const serv = response.content.services.map(service => ({
        id: service.id,
        text: service.content
      }));
      const emails = response.content.contacts.filter(c => c.type === 'email').map(item => (
        {
          id: item.id,
          text: item.link
        }
      ));
      const phones = response.content.contacts.filter(c => c.type === 'phone').map(item => ({
        id: item.id,
        text: item.link
      }
      ));
      const social = response.content.contacts.filter(c => c.type === 'links').map(item => ({
        id: item.id,
        text: item.link
      }
      ));
      setContactInfo({
        address: response.content.address,
        emails: emails,
        phones: phones
      });
      setServices(serv);
      setAbout(response.content.about);
      setStartFees(response.content.branches_number);
      setLinks(social);
      setEmail(response.content.email);
      setPhoneNumber(response.content.phone);
      setName(response.content.name);
      setNotChangedData({
        city_id:response.content.city_id,
        country_id:response.content.country_id,
        generate_branch:response.content.generate_branch
      })

    } catch (error) {
      console.log(error)
    }
  }
  const handleAddPhone = () => {
    setContactInfo((prev) => ({
      ...prev,
      phones: [...prev.phones, { id: null, text: "" }],
    }));
  };

  const handleRemovePhone = (index) => {
    // if (contactInfo.phones.length > 1) {
      setContactInfo((prev) => ({
        ...prev,
        phones: prev.phones.filter((_, i) => i !== index),
      }));
    // }
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...contactInfo.phones];
    updatedPhones[index].text = value;
    setContactInfo((prev) => ({
      ...prev,
      phones: updatedPhones,
    }));
  };

  const handleAddEmail = () => {
    // const newId = contactInfo.emails.length + 1;
    setContactInfo((prev) => ({
      ...prev,
      emails: [...prev.emails, { id: null, text: "" }],
    }));
  };

  const handleRemoveEmail = (index) => {
    // if (contactInfo.emails.length > 1) {
      setContactInfo((prev) => ({
        ...prev,
        emails: prev.emails.filter((_, i) => i !== index),
      }));
    // }
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...contactInfo.emails];
    updatedEmails[index].text = value;
    setContactInfo((prev) => ({
      ...prev,
      emails: updatedEmails,
    }));
  };

  const handleAddService = () => {
    setServices((prev) => [...prev, { id: null, text: "" }]);
  };

  const handleRemoveService = (index) => {
    if (services.length > 1) {
      setServices((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index].text = value;
    setServices(updatedServices);
  };

  const handleAddLink = () => {
    setLinks((prev) => [...prev, { id: null, text: "" }]);
  };

  const handleRemoveLink = (index) => {
    // if (links.length > 1) {
      setLinks((prev) => prev.filter((_, i) => i !== index));
    // }
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index].text = value;
    setLinks(updatedLinks);
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

  const handleSubmit = async () => {
    const data = {}
    const serv = services.map(service => ({
      id: service.id,
      content: service.text,
      nursery_id:getNurseryId()
    }));
    const emails = contactInfo.emails.map(em =>({
      id:em.id,
      link:em.text,
      type:'email',
      icon:'noIcon'
    }));
    const phones = contactInfo.phones.map(ph=>({
      id:ph.id,
      link:ph.text,
      type:'phone',
      icon:'noIcon'
    }));
    const allLinks = links.map(l=>({
      id:l.id,
      link:l.text,
      type:'social',
      icon:'noIcon'
    }));
    const contacts = [...emails, ...phones, ...allLinks];
    data.services = serv;
    data.contacts = contacts;
    data.branches_number = startFees;
    data.about = about;
    data.address = contactInfo.address;
    data.email = email;
    data.phone = phoneNumber;
    data.generate_branch = notChangedData.generate_branch;
    data.city_id = notChangedData.city_id;
    data.country_id = notChangedData.country_id;
    data.name = name;

    console.log(data);
    // console.log(
    //   "links", links,

    // )
    // console.log(
    //   "branches", startFees,

    // )
    // console.log(
    //   "about", about,

    // )
    // console.log(


    //   "contactInfo", contactInfo
    // );
    try {
            
      const response = await NurseryProfileService.UpdateNurseryProfile(data);
      console.log(response);
      toast.success('Profile edited successfully');

      GetData();
      
  } catch (error) {
      toast.error('Failed to edit profile');
  }


  };

  return (
    show && (
      <div className="EditProfileModal modal show d-block" tabIndex="-1">
        <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        <div className="modal-dialog modal-lg">
          <div className="EditProfileModalContent modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {/* Profile Picture */}
              <div className="mb-4">
                <div className="EditProfilePreview Center mb-4">
                  <label htmlFor="EditImageProfile">
                    <div className="Cam">
                      <FontAwesomeIcon icon={faCamera} />
                    </div>
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="img-thumbnail mb-2 ProfilePreview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
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
              <div className="mb-4">
              <label className="form-label EditProfileModalLabel">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) =>setName(e.target.value)}
                  />
              </div>

              {/* Edit Contact Info */}
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
                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {/* <label className="form-label EditProfileModalLabel mt-3">Phone Numbers</label> */}
                {contactInfo.phones.map((phone, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="number"
                      className="form-control"
                      value={phone.text}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemovePhone(index)}
                      // disabled={contactInfo.phones.length === 1}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <div className="AddAnotherPhone text-end">
                  <span
                    className="text-decoration-underline"
                    onClick={handleAddPhone}
                  >
                    Add Phone
                  </span>
                </div>

                <label className="form-label EditProfileModalLabel mt-3">Emails</label>
                <div className="input-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {contactInfo.emails.map((email, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="email"
                      className="form-control"
                      value={email.text}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveEmail(index)}
                      // disabled={contactInfo.emails.length === 1}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <div className="AddAnotherEmail text-end">
                  <span
                    className="text-decoration-underline"
                    onClick={handleAddEmail}
                  >
                    Add Email
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">About</label>
                <textarea
                  className="form-control"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              {/* Start Fees */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Branches Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={startFees}
                  onChange={(e) => setStartFees(e.target.value)}
                />
              </div>

              {/* Services Section */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Provided Services</label>
                {services.map((service, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={service.text}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      // disabled={services.length === 1}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <div className="AddAnotherService text-end">
                  <span
                    className="text-decoration-underline"
                    onClick={handleAddService}
                  >
                    Add Service
                  </span>
                </div>
              </div>

              {/* Links Section */}
              <div className="mb-4">
                <label className="form-label EditProfileModalLabel">Links</label>
                {links.map((link, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={link.text}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      // disabled={links.length === 1}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <div className="AddAnotherService text-end">
                  <span
                    className="text-decoration-underline"
                    onClick={handleAddLink}
                  >
                    Add Link
                  </span>
                </div>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="form-buttons EditProfileButtons">
              <button type="submit" onClick={handleSubmit} className="RegisterBtn">
                Save
              </button>
              <button
                type="button"
                className="CancelBtn"
                onClick={() => {
                  onClose();
                }}
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
