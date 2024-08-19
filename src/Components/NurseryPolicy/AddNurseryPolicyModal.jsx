import React, { useState } from 'react';

const AddNurseryPolicyModal = ({ isOpen, onClose, onAddNurseryPolicy }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError('');
    setDescriptionError('');

    if (title === '') {
      setTitleError('title is required');
      return;
    }

    if (description === '') {
      setDescriptionError('description is required');
      return;
    }
    if(description.length<50 || description.length>1000){
        setDescriptionError('description must be between 50 - 1000 characters');
        return;
    }

    onAddNurseryPolicy(title, description );
    clearData();
    onClose();
  };

  if (!isOpen) return null;

  const clearData = () => {
    setTitle('');
    setDescription('');
    setTitleError('');
    setDescriptionError('');
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Add Nursery Policy</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="title"
                className="ClassNameInput mt-2"
                placeholder="Title  "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleError && <span className="text-danger PopUpValidation">{titleError}</span>}
            </label>

            <label>
              <textarea
                name="description"
                className={`ClassNameInput AnswerFAQ DescriptionPolicy mt-2 ${descriptionError?'':'mb-4'}`}
                placeholder="Description  "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && (
                <span className="text-danger PopUpValidation mb-4">{descriptionError}</span>
              )}
            </label>

            <div className="form-buttons">
              <button className="RegisterBtn">Save</button>
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

export default AddNurseryPolicyModal;
