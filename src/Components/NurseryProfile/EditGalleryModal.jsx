import React, { useEffect, useState } from 'react';

const EditGalleryModal = ({ id, title, isOpen, onClose, onEditGallery }) => {
  const [albumName, setAlbumName] = useState('');
  const [albumNameError, setAlbumNameError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAlbumName(title || '');
    }
  }, [title, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlbumNameError('');

    if (albumName.trim() === '') {
      setAlbumNameError('album name is required');
      return;
    }

    onEditGallery(id, albumName);
    clearData();
    onClose();
  };

  const clearData = () => {
    setAlbumName('');
    setAlbumNameError('');
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Edit Album</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="albumName"
                className={`ClassNameInput mt-2 ${albumNameError ? '' : 'mb-4'}`}
                placeholder='Album Name'
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

export default EditGalleryModal;
