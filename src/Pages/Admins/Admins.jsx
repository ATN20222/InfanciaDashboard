import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Admins.css'
import AddAdminModal from "./AddAdminModal";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { NurseryServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const Admins = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Role: "Top Admin"},
        { id: 2, name: "Ahmed hamed", Role: "Top Admin"}
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(false);

    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [admins , setAdmins] = useState([]);

    useEffect(()=>{
        GetData();
    },[]);
    async function GetData() {
        try {
    
            const response = await NurseryServices.ListAdmins();
            console.log('admins',response);
            setAdmins(response.content);
        
        } catch (error) {
            console.log(error)
    
        }
    }
    const handleDelete = async () => {
        try {
            const response = await NurseryServices.DeleteAdmin(adminToDelete);
            toast.success('Admin deleted successfully');
            GetData();  
            
        } catch (error) {
            toast.error('Failed to delete admin');

        }
        setAdminToDelete(null);
    };
    const handleAddRequest = async (name, role, email, phoneNumber, password ) => {
        try {
            const response = await NurseryServices.AddAdmin(name,email,  phoneNumber, role, password );
            toast.success('Admin added successfully');
            GetData();
            
        } catch (error) {
            toast.error('Failed to add admin');

        }
    };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddAdminModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddAdmin={handleAddRequest}
            />
            <DeleteSubjectModal
                id={adminToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Admins
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            {/* <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div> */}
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer AdminsTableContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                                <div className="container">
                                    <div className="row">
                                    {admins.map((row) => (
                                        <div className="col-lg-12 RecordEmpTable">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.name}>
                                                        {row.name}

                                                    </span>
                                                    
                                                    </div>
                                               
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.email}>

                                                        {row.email}
                                                    </span>
                                                    </div>

                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-2 Center">
                                                    <span className="BranchTableSpan" data-content={row.phone}>

                                                        {row.phone}
                                                    </span>
                                                    </div>

                                                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center " onClick={()=>{setIsDeleteOverlayOpen(true); setAdminToDelete(row.id)}}>
                                                        <span className="DeleteAdmin">
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </span>
                                                    </div>
                                            </div>
                                       
                                    </div>
                                    ))}
                                    </div>
                                </div>
                                    
                            
                       
                </div>
            </div>
           
        </section>
    );
};

export default Admins;
