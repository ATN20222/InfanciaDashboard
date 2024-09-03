import { faBell, faCommentDollar, faPen, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Roles.css'
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import AddRoleModal from "./AddRoleModal";
import { RolesServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const Roles = () => {
    const [roles , setRoles] = useState([]);
    const [roleToDelete , setRoleToDelete] = useState(null);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    
    const handleDelete = async () => {
        try {
            const response = await RolesServices.Delete(roleToDelete);
            toast.success('Role deleted successfully');
            GetData();  
            
        } catch (error) {
            // toast.error('Failed to delete role');
            toast.error(`${error}`);


        }
        setRoleToDelete(null);
    };

    useEffect(()=>{
        GetData();
    },[]);
    
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const handleAddRequest = async ( name, roleItems) => {

            const permissions = roleItems
            .filter(item => item.Selected === 1)  
            .map(item => ({ name: item.Name }));  

            const result = {
            permissions,
            name,
            };
            try {
                const response = await RolesServices.Add(result);
                toast.success('Role added successfully');
                GetData();
                
            } catch (error) {
                toast.error(`${error}`);
            }
        };

        async function GetData() {
            try {
        
                const response = await RolesServices.List();
                setRoles(response.content);
            
            
            } catch (error) {
                console.log(error)
        
            }
        }
        const handleDeleteRole = (id)=>{
            setRoleToDelete(id);
            setIsDeleteOverlayOpen(true);
        }
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddRoleModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRole={handleAddRequest}
            />
             <DeleteSubjectModal
                id={roleToDelete}
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
                            Roles
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
            <div className="SubjectsContainer RolesTableContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable ">
                    
                                <div className="container">
                                    <div className="row">
                                    {roles.map((row) => (
                                        <div className="col-lg-12 RecordEmpTable">
                                            <div className="row">
                                                
                                                <div className="col-lg-7 col-md-7 col-sm-7 col-7 Center">
                                                    <span className="BranchTableSpan" data-content={row.name}>

                                                        {row.name}
                                                    </span>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center " >
                                                        {/* <span className="EditRole">
                                                            <FontAwesomeIcon icon={faPen}/>
                                                        </span> */}
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center ">
                                                        <span className="DeleteAdmin" onClick={()=>{handleDeleteRole(row.id)}}>
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

export default Roles;
