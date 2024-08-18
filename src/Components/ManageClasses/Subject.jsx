import React, { useEffect, useState } from "react";
import AddSubjectModal from "./AddSubjectModal";
import SelectSubjectModal from "./SelectSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";
import { SubjectServices } from "../../Service/Api";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Subject = ({ SelectedClassId, onUpdate }) => {
    const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
    const [isSelectOverlayOpen, setIsSelectOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        if (SelectedClassId) {
            fetchSubjects();
        }
    }, [SelectedClassId]);

    const fetchSubjects = async () => {
        try {
            const [subjectResponse, allSubjectResponse] = await Promise.all([
                SubjectServices.ListWithClassId(SelectedClassId),
                SubjectServices.List()
            ]);
            setSubjects(subjectResponse.content);
            setAllSubjects(allSubjectResponse.content);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubject = async (subject) => {
        try {
            await SubjectServices.Add(subject);
            toast.success('Subject added successfully');
            fetchSubjects();
            onUpdate(); 
            setIsSelectOverlayOpen(true);
        } catch (error) {
            toast.error('Failed to add subject');
        }
    };

    const handleDeleteSubject = async () => {
        try {
            await SubjectServices.DeleteAssign(subjectToDelete);
            toast.success('Subject deassigned successfully');
            fetchSubjects();
            onUpdate(); 
        } catch (error) {
            toast.error('Failed to deassign subject');
        }
        setSubjectToDelete(null);
    };

    const handleAssignSubject = async (subject) => {
        try {
            await SubjectServices.Assign(subject, SelectedClassId);
            toast.success('Subject assigned successfully');
            fetchSubjects(); 
            onUpdate(); 
        } catch (error) {
            toast.error('Failed to assign subject');
        }
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
                subjects={allSubjects}
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
                    {subjects.length > 0 ? subjects.map((subject, index) => (
                        <div key={index} className="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 SubjectItem">
                            {subject.subjects.title}
                            <div className="RemoveSubject">
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => { setIsDeleteOverlayOpen(true); setSubjectToDelete(subject.id); }} />
                            </div>
                        </div>
                    )) : <span>No subjects added yet</span>}
                </div>
            </div>
        </section>
    );
};

export default Subject;
