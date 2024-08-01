import React, { useState } from "react";
import AddGalleryModal from "./AddGalleryModal";
const Gallery = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const handleAddGallery = (className) => {
        
      };
    return(
        <div className="NurseryContainer NurseryGallery">
            <AddGalleryModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddGallery={handleAddGallery}
            />
            <div className="AddGallery">
                <span onClick={()=>setIsOverlayOpen(true)}>+ Add</span>
            </div>
            <div className="GalleryContainer">
                <div className="container">
                    <div className="row Center">
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem">
                            <div className="GalleryImage">

                            </div>
                            <span className="AlbumName">Album Name</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Gallery;