import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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
  const [subjectToDelete , setSubjectToDelete]= useState(null);

  useEffect(()=>{
    GetData();
  },[]);

  const handleAddSubject = async (subject) => {
    try {
    
        const response = await SubjectServices.Add(subject);
        toast.success('subject added successfully');
        GetData();
        setIsSelectOverlayOpen(true);
        
      } catch (error) {
        toast.error('failed to add subject');
  
      }
  };
  async function GetData() {
    try {

      const response = await SubjectServices.List();
      setSubjects(response.content);

      
    } catch (error) {
        console.log(error)

    }
}

  const handleDeleteSubject = async () => {
    try {
    
      const response = await SubjectServices.Delete(subjectToDelete);
      toast.success('subject deleted successfully');
      GetData();
      
    } catch (error) {
      toast.error('failed to delete subject');

    }
    setSubjectToDelete(null);
  };
  const handleAssignSubject = (subject) =>{
    console.log(subject)
  }

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
        onAssignSubject={handleAssignSubject}

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
          {subjects.length>0?subjects.map((subject, index) => (
            <div key={index} className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
              {subject.title}
              <div className="RemoveSubject">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => {setIsDeleteOverlayOpen(true);setSubjectToDelete(subject.id)}} />
              </div>
            </div>
          )):<span>No subjects added yet</span>}
        </div>
      </div>
    </section>
  );
};

export default Subject;
