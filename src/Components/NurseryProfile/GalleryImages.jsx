import React from "react";
import image from '../../Assets/images/Breakfast.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
const GalleryImages = ({ gallery, onBack ,onDelete }) => {
  // Fetch images for the selected gallery. Here we use static images for the example.
  const images = [
    { id: 1, src: image },
    { id: 2, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    { id: 3, src: image },
    // Add more images here
  ];

  return (
    <div className="GalleryImagesContainer">
      <button onClick={onBack} className="btn GalleryBackBtn"><FontAwesomeIcon icon={faChevronLeft}/></button>
      <div className="row Center">
        {gallery.map((image) => (
          <div key={image.id} className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
            <div className="GalleryImage Center">
              <img src={image.original_url} alt={`Image ${image.id}`} width="100%" />
            </div>
            <div className="DeleteGallery" onClick={()=>onDelete(image.id)}>
                    <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryImages;
