import React, { useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';

const AddGalleryModal = ({ isOpen, onClose, onAddGallery }) => {
  const [albumName, setAlbumName] = useState('');
  const [albumNameError, setAlbumNameError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlbumNameError(''); 

    if (albumName.trim() === '') {
      setAlbumNameError('album name is required');
      return;
    }

    onAddGallery(albumName);
    clearData();
    onClose();
  };

  if (!isOpen) return null;

  const clearData = () => {
    setAlbumName('');
    setAlbumNameError('');
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Add Album</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="albumName"
                className={`ClassNameInput mt-2 ${albumNameError?'':'mb-4'}`}
                placeholder='Album Name  '
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
              />
              {albumNameError && (
                <span className='text-danger PopUpValidation mb-4'>{albumNameError}</span>
              )}
            </label>
            <div className="form-buttons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>
              <button
                type="button"
                className="CancelBtn"
                onClick={() => { onClose(); clearData(); }}
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

export default AddGalleryModal;
