import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BlogesServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import AddBlogModal from "../../Components/Blogs/AddBlogModal";
import BlogItem from "../../Components/Blogs/BlogItem";
import TempImage from '../../Assets/images/INFANCIA_LOGO.png';
import './Blogs.css';
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const navigate = useNavigate();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        GetData();
    }, []);



    async function GetData() {
        try {
            const response = await BlogesServices.List();
            setBlogs(response.content);
                
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddRequest = async (title ,description,image,tags) => {
        try {
            await BlogesServices.Add(title, description ,image , tags );
            toast.success("Blog added successfully");
            GetData();
        } catch (error) {
            toast.error("Failed to add blog");
        }
    };

    const handleDeleteBlog = (id) => {
        setBlogToDelete(id);
        setIsDeleteOverlayOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await BlogesServices.Delete(blogToDelete);
            toast.success('Blog deleted successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to delete Blog');
        }
        setBlogToDelete(null);
    };


    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddBlogModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddSubject={handleAddRequest}
            />
            <DeleteSubjectModal
                id={blogToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleConfirmDelete}
            />
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Blogs
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {blogs&&blogs.map(blog=>(
                    <BlogItem
                        key={blog.id}
                        id={blog.id}
                        tags={blog.tags?blog.tags.split(','):[]}
                        title={blog.title}
                        description={blog.description}
                        image={blog.media?.length>0?blog.media[0].original_url:TempImage}
                        onEditBlog={(id) => {}}
                        created_at={blog.created_at}
                        OnDeleteNewsletter={handleDeleteBlog}
                    />
                )) 
                }
        </section>
    );
};

export default Blogs;
