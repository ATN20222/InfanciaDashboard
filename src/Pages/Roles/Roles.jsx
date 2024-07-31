import { faBell, faCommentDollar, faPen, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Roles.css'
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import AddRoleModal from "./AddRoleModal";

const Roles = () => {
    const tableData = [
        { id: 1,  Role: "Top Admin"},
        { id: 2,  Role: "Top Admin"}
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
   
    const handleDelete = (item) => {
        
    };

    const handleAddRequest = (className) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddRoleModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRole={handleAddRequest}
            />
             <DeleteSubjectModal
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Admins
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                                <div className="container">
                                    <div className="row">
                                    {tableData.map((row) => (
                                        <div className="col-lg-12 RecordEmpTable">
                                            <div className="row">
                                                
                                                <div className="col-lg-7 col-md-7 col-sm-7 col-7 Center">
                                                    <span className="BranchTableSpan" data-content={row.Role}>

                                                        {row.Role}
                                                    </span>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center " >
                                                        <span className="EditRole">
                                                            <FontAwesomeIcon icon={faPen}/>
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center " onClick={()=>setIsDeleteOverlayOpen(true)}>
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

export default Roles;
