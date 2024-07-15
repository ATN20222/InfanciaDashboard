import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddSubjectModal from "./AddSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";
const Subject = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

    

    const handleAddSubject = (Subject) => {
        
      }; 
      
    const handleDeleteSubject = (Subject) => {
        
      };
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddSubjectModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddSubject={handleAddSubject}
            />
            <DeleteSubjectModal
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDeleteSubject}
            />

            <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Subject
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubjectsContainer">
                    <div className="row">
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            
                            HelloHelloHelloHello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt}  onClick={()=>setIsDeleteOverlayOpen(true)}/></div>
                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>

                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>

                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>

                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>

                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            Hello
                            <div className="RemoveSubject"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>setIsDeleteOverlayOpen(true)}/></div>

                        </div>
                        
                    </div> 

                </div>
        </section>
    );
}
export default Subject;