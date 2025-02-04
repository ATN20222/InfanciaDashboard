import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import CustomDropdown2 from '../DrobDown/CustomDropdown2';
import RolesDropDown from '../DrobDown/RolesDropDown';
import SelectClassDropDown from '../DrobDown/SelectClassDropDown';
import { ClassService } from '../../Service/Api';

const EditNewsLetterModal = ({ isOpen, onClose, onUpdateNewsLetter, newsletter }) => {
    const [description, setDescription] = useState(newsletter?.description || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(newsletter?.image||'');
    
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(newsletter?.class || { id: 0, name: 'class :' });
    const [classError, setClassError] = useState('');
    const [finalSelectedClass, setFinalSelectedClass] = useState(newsletter?.class?.id || -1);
    const [title, setTitle] = useState(newsletter?.title || '');
    const [titleError, setTitleError] = useState('');
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 8 * 1024 * 1024) {
                setImageError('File size must not exceed 8 MB.');
                setImage(null);
                return;
            }
            if (!file.type.startsWith('image/')) {
                setImageError('Please select a valid image file.');
                setImage(null);
                return;
            }
            setImageError('');
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImageError('No file selected.');
        }
    };

    useEffect(() => {

        GetClasses();
    }, []);

    async function GetClasses() {
        try {
            const response = await ClassService.List();
            // response.content.push({ name: "All", id: -1 });
            var a = response.content;
            a.reverse();
            setClasses(a);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        setDescriptionError('');
        setClassError('');
        setTitleError('');

        e.preventDefault();
        let valid = true;

        if (title === '') {
            setTitleError("Title is required");
            valid = false;
        }

        if (finalSelectedClass == 0 || finalSelectedClass === '') {
            setClassError('Class is required');
            valid = false;
        }

        if (valid) {
            onUpdateNewsLetter(newsletter.id, description, image, title, finalSelectedClass);
            onClose();
        }
    };

    const handleClassChanged = (id) => {
        setFinalSelectedClass(id);
    };

    if (!isOpen) return null;

    const ClearData = () => {
        setDescription('');
        setImage(null);
        setDescriptionError('');
        setImageError('');
        setClassError('');
        setTitleError('');
    };

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Edit Newsletter</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <div className="CircleInPopUpContainer">
                            <div className="CircleInPopUp Center">
                                <label htmlFor="Image">
                                    <FontAwesomeIcon icon={faImage} />
                                    <input type="file" id="Image" onChange={handleImageChange} />
                                    <img src={imagePreview}
                                    className="ProfilePreview"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        background: '#009fe3',
                                        objectFit: "cover",
                                        padding: '0',
                                    }}
                                    alt="" />
                                </label>
                            </div>
                        </div>
                        <div className="Center">
                            {imageError && <span className='text-danger PopUpValidation text-center p-0 d-block mb-1'>{imageError}</span>}
                        </div>

                        <label>
                            <input
                                type="text"
                                name="title"
                                className='ClassNameInput'
                                placeholder='Title '
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {titleError && <div className="text-danger PopUpError mt-0">{titleError}</div>}
                        </label>

                        <div className="ChooseAdminRole">
                            <SelectClassDropDown
                                onChange={handleClassChanged}
                                Options={classes}
                                DefaultValue={selectedClass}
                                selectedValue={selectedClass}
                                onSelect={(value) => setSelectedClass(value)}
                            />
                            {classError && (
                                <span className="text-danger PopUpValidation">{classError}</span>
                            )}
                        </div>

                        <textarea
                            name="Newsletter"
                            className={`ClassNameInput NewsletterDescription NewsletterDescription2 ${descriptionError ? ' mb-1' : ''}`}
                            placeholder='Newsletter description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {descriptionError && <span className='text-danger PopUpValidation mb-3'>{descriptionError}</span>}

                        <div className="form-buttons">
                            <button className="RegisterBtn">
                                Save
                            </button>
                            <button className="CancelBtn" onClick={() => { onClose(); ClearData(); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNewsLetterModal;
