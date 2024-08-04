import React, { useState } from "react";
import AddGalleryModal from "./AddGalleryModal";
import GalleryImages from "./GalleryImages"; // Import the component that shows images inside a gallery
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null); // Track selected gallery

  const handleAddGallery = (className) => {
    // Handle adding gallery
  };

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery); // Set the clicked gallery as selected
  };

  const handleBackToGallery = () => {
    setSelectedGallery(null); // Deselect gallery to go back to overview
  };

  const galleries = [
    { id: 1, name: "Album Name 1" },
    { id: 2, name: "Album Name 2" },
    { id: 3, name: "Album Name 3" },
    // Add more gallery items here
  ];

  return (
    <div className="NurseryContainer NurseryGallery">
      <AddGalleryModal
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onAddGallery={handleAddGallery}
      />
      <div className="AddGallery">
        <span onClick={() => setIsOverlayOpen(true)}> <FontAwesomeIcon  icon={faPlus}/> Add</span>
      </div>

      {selectedGallery ? (
        <GalleryImages gallery={selectedGallery} onBack={handleBackToGallery} />
      ) : (
        <div className="GalleryContainer">
          <div className="container">
            <div className="row Center">
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem"
                  onClick={() => handleGalleryClick(gallery)}
                >
                  <div className="GalleryImage"></div>
                  <span className="AlbumName">{gallery.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
