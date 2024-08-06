import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddSubjectModal from "./AddSubjectModal";
import SelectSubjectModal from "./SelectSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";
import { SubjectServices } from "../../Service/Api";
import toast from "react-hot-toast";

const Subject = () => {
  const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
  const [isSelectOverlayOpen, setIsSelectOverlayOpen] = useState(false);
  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
  const [subjects, setSubjects] = useState(["Subject 1", "Subject 2", "Subject 3"]);

  const handleAddSubject = async (subject) => {
    try {
    
        const response = await SubjectServices.Add(subject);
        toast.success('subject added successfully');
        setIsSelectOverlayOpen(true);
        
        
      } catch (error) {
        toast.error('failed to add subject');
  
      }
  };

  const handleDeleteSubject = (subject) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  return (
    <section className="SecondSliderSection ManageClassesCompnent">
      <AddSubjectModal
        isOpen={isAddOverlayOpen}
        onClose={() => setIsAddOverlayOpen(false)}
        onAddSubject={handleAddSubject}
      />
      <SelectSubjectModal
        isOpen={isSelectOverlayOpen}
        onClose={() => setIsSelectOverlayOpen(false)}
        subjects={subjects}
        onAddNewSubject={() => {
          setIsSelectOverlayOpen(false);
          setIsAddOverlayOpen(true);
        }}
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
              <div className="CirclePlus" onClick={() => setIsSelectOverlayOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="SubjectsContainer">
        <div className="row">
          {subjects.map((subject, index) => (
            <div key={index} className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
              {subject}
              <div className="RemoveSubject">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteSubject(subject)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subject;
