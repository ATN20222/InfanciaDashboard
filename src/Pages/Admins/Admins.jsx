import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Admins.css'
import AddAdminModal from "./AddAdminModal";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";

const Admins = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Role: "Top Admin"},
        { id: 2, name: "Ahmed hamed", Role: "Top Admin"}
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
   
    const handleDelete = (item) => {
        
    };

    const handleAddRequest = (className) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddAdminModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddAdmin={handleAddRequest}
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
                                                <div className="col-lg-4 col-md-4col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.name}>
                                                        {row.name}

                                                    </span>
                                                    
                                                    </div>
                                               
                                                <div className="col-lg-4 col-md-4col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.Role}>

                                                        {row.Role}
                                                    </span>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4col-sm-4 col-4 Center " onClick={()=>setIsDeleteOverlayOpen(true)}>
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
