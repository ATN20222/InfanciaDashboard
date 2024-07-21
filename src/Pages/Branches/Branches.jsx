import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Branches.css'
import AddBranchModal from "./AddBranchModal";

const Branches = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber:"+201200835855",},
        { id: 2, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber:"+201200835855",}
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddRequest = (className) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddBranchModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRequest={handleAddRequest}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Branches
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
            <div className="SubjectsContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                                <div className="container">
                                    <div className="row">
                                    {tableData.map((row) => (
                                        <div className="col-lg-12 RecordEmpTable">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                                    <div className="avatar"></div>
                                                    {row.name}
                                                    
                                                    </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                                    <span className="BranchTableSpan" data-content={row.Adress}>

                                                        {row.Adress}
                                                    </span>
                                                    
                                                    </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                                    <span className="BranchTableSpan" data-content={row.PhoneNumber}>

                                                        {row.PhoneNumber}
                                                    </span>
                                                    </div>

                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                                        <FontAwesomeIcon icon={faTrash}/>
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

export default Branches;
