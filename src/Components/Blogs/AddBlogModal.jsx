import React, { useState } from 'react';

const AddBlogModal = ({ isOpen, onClose, onAddSubject }) => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');
    const [errors, setErrors] = useState({
        subject: '',
        description: '',
        image: '',
        tags: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors before validating
        setErrors({
            subject: '',
            description: '',
            image: '',
            tags: '',
        });

        // Validation
        let valid = true;
        let newErrors = { ...errors };

        if (subject.trim() === '') {
            newErrors.subject = 'Title is required';
            valid = false;
        }

        if (description.trim() === '') {
            newErrors.description = 'Description is required';
            valid = false;
        }

        if (!image) {
            newErrors.image = 'Image is required';
            valid = false;
        }

        if (tags.trim() === '') {
            newErrors.tags = 'Tags are required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            const tagsArray = tags.split(',').map(tag => tag.trim());


            onAddSubject(subject , description , image , tagsArray);
            setSubject('');
            setDescription('');
            setImage(null);
            setTags('');
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subject') {
            setSubject(value);
            if (value.trim() !== '') {
                setErrors((prevErrors) => ({ ...prevErrors, subject: '' }));
            }
        } else if (name === 'description') {
            setDescription(value);
            if (value.trim() !== '') {
                setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
            }
        } else if (name === 'tags') {
            setTags(value);
            if (value.trim() !== '') {
                setErrors((prevErrors) => ({ ...prevErrors, tags: '' }));
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
        }
    };

    const clearData = () => {
        setSubject('');
        setDescription('');
        setImage(null);
        setTags('');
        setErrors({
            subject: '',
            description: '',
            image: '',
            tags: '',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Blog</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form addSubjectForm" onSubmit={handleSubmit}>

                        <label>
                            <input
                                type="file"
                                name="image"
                                className='ImageInput'
                                onChange={handleImageChange}
                            />
                            {errors.image && <div className="text-danger PopUpError">{errors.image}</div>}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="subject"
                                className='ClassNameInput mb-0'
                                placeholder='Title'
                                value={subject}
                                onChange={handleInputChange}
                            />
                            {errors.subject && <div className="text-danger PopUpError mt-0 ">{errors.subject}</div>}
                        </label>

                        <textarea
                            name="Newsletter"
                            className={`ClassNameInput NewsletterDescription NewsletterDescription mt-0 mb-1`}
                            placeholder='Blog description...'
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                        />
                        {errors.description && <div className="text-danger PopUpError mt-0 mb-2">{errors.description}</div>}

                        <label>
                            <input
                                type="text"
                                name="tags"
                                className='ClassNameInput  mt-2'
                                placeholder='Tags (separated by commas)'
                                value={tags}
                                onChange={handleInputChange}
                            />
                            {errors.tags && <div className="text-danger PopUpError mb-2">{errors.tags}</div>}
                        </label>

                        <div className="form-buttons">
                            <button className="RegisterBtn" type="submit">
                                Save
                            </button>
                            <button className="CancelBtn" type="button" onClick={() => { onClose(); clearData(); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogModal;
