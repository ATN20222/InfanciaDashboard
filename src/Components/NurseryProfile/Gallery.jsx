import React, { useEffect, useState } from "react";
import AddGalleryModal from "./AddGalleryModal";
import GalleryImages from "./GalleryImages"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { NurseryProfileService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import GalleryTempImage from '../../Assets/images/GalleryTempImage.jpg'
import EditGalleryModal from "./EditGalleryModal";
import DeleteSubjectModal from "../ManageClasses/DeleteSubjectModal";

const Gallery = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryToEdit , setGalleryToEdit] = useState(null);
  const [albums , setAlbums] = useState([]);
  const [uploadImage , setUploadImage] = useState(null);
  const [uploadError,setUploadError]= useState('');
  const [currentGallery,setCurrentGallery] = useState(null);
  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
  const [galleryIdToDelete , setGalleryIdToDelete] = useState([]);
  useEffect(()=>{
    GetData();
  },[]);

  const handleAddGallery = async (albumName) => {
    try {
      const response = await NurseryProfileService.AddAlbum(albumName);
      toast.success('Album added successfully');
      GetData();
    } catch (error) {
        console.log(error);
        toast.error('Failed to add Album');

    }
  };

  async function GetData() {
    try {
        const response = await NurseryProfileService.ListGallery();
        setAlbums(response.content);
    } catch (error) {
        console.log(error);
    }
  }

  const handleGalleryClick = async (id) => {
    try {
      const response = await NurseryProfileService.ListGalleryImages(id);
      setSelectedGallery(response.content)
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleBackToGallery = () => {
    setSelectedGallery(null); 
    setCurrentGallery(null);
  };

  const handleEditGallery = async( id , title )=>{
    try {
      console.log(id , title)
      const response = await NurseryProfileService.EditAlbum(id, title);
      toast.success('Album edited successfully');
      GetData();
    } catch (error) {
        console.log(error);
        toast.error('Failed to edit Album');
    }
  }

  const openEditModal = (album) => {
    setGalleryToEdit(album);
    setIsEditOverlayOpen(true);
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const maxSize = 8 * 1024 * 1024;
  
    if (file) {
      if (file.size > maxSize) {
        setUploadError('File size should not exceed 8 MB');
        return;
      }
  
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif'
      ) {
        setUploadError(''); // Clear the error if the file is valid
        setUploadImage(file);
        try {
          const response = await NurseryProfileService.UploadGalleryImage(currentGallery, file);
          toast.success('Image uploaded successfully');
          handleGalleryClick(currentGallery);
        } catch (error) {
          console.error(error);
          toast.error('Failed to upload image');
        }
      } else {
        setUploadError('Please select a valid image file (jpeg, png, jpg, gif)');
        setUploadImage(null);
      }
    }
  };
  

  const handleDeleteGallery = (id)=>{
    setGalleryIdToDelete(id);
    setIsDeleteOverlayOpen(true);
  }
  
  const HandleConfirmDelete = async (id)=>{

    try {
      const response = await NurseryProfileService.DeleteGallery(id);
      toast.success('Album deleted successfully');
      GetData();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete album');
    }
    setGalleryIdToDelete(null);

  }
  return (
    <div className="NurseryContainer NurseryGallery">
      <AddGalleryModal
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onAddGallery={handleAddGallery}
      />
      <EditGalleryModal
        id={galleryToEdit?.id}
        title={galleryToEdit?.title}
        isOpen={isEditOverlayOpen}
        onClose={() => setIsEditOverlayOpen(false)}
        onEditGallery={handleEditGallery}
      />
      <DeleteSubjectModal
            id={galleryIdToDelete}
            isOpen={isDeleteOverlayOpen}
            onClose={() => setIsDeleteOverlayOpen(false)}
            onDelete={HandleConfirmDelete}
      />
      <div className="Toaster">
          <Toaster
              position="top-right"
              reverseOrder={false}
          />
      </div>  

      {!selectedGallery?
      <div className="AddGallery">
        <span onClick={() => setIsOverlayOpen(true)}> <FontAwesomeIcon  icon={faPlus}/> Add</span>
      </div>
      :
      <div className="AddGallery">
        <span> 
          <input id="UploadImage" type="file" accept=".jpeg,.png,.jpg,.gif" multiple={false}
          style={{ display: 'none' }} 
          onChange={handleImageChange}

          />
          <label htmlFor="UploadImage" className="UploadImage">
            <FontAwesomeIcon icon={faUpload}/> Upload Image
          </label>
          
        </span>
        {uploadError&&
          <div className="uploadError">
            <span>{uploadError}</span>
          </div>
        }
        
      </div>
    }

    

      {selectedGallery ? (
        <GalleryImages gallery={selectedGallery} onBack={handleBackToGallery} />
      ) : (
        <div className="GalleryContainer">
          <div className="container">
            <div className="row Center">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="col-lg-2 col-md-3 col-sm-4 col-6 GalleryItem"
                >
                  <div className="GalleryImage Center" onClick={() => {handleGalleryClick(album.id); setCurrentGallery(album.id) }}>
                    <img src={GalleryTempImage} width="100%"  alt="" />
                  </div>
                  <span className="AlbumName">{album.title}</span>
                  <div className="EditAlbumName" onClick={() => openEditModal(album)}>
                    <FontAwesomeIcon icon={faPen}/>
                  </div>

                  <div className="DeleteGallery" onClick={()=>handleDeleteGallery(album.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
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
