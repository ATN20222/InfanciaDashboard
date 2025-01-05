import { faCheck, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { ClassService, SubjectServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import AddSubjectModal from "../../Components/ManageClasses/AddSubjectModal";
import './Subjects.css';
import EditSubjectModal from "../../Components/ManageClasses/EditSubjectModal";
import DeAssignSubjectModal from "../../Components/ManageClasses/DeAssignSubjectModal";

const SubjectItem = ({ subject, onDrop, isEditableSection, handleEditClick, handleDeletClicked }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "subject",
        item: { id: subject.id, title: subject.title },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            className="col-lg-2 col-md-3 col-sm-3 col-xs-4 col-4 SubjectItem SubjectToGrab"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {subject.title}
            <span>
                {isEditableSection &&
                    <>
                        <span className="p-2" onClick={() => handleEditClick(subject)}>
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        <span className="p-2" onClick={() => handleDeletClicked(subject)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </>
                }
            </span>
        </div>
    );
};

const ClassCard = ({ cls, onDropSubject, RemoveAssignClicked }) => {
    const [, dropRef] = useDrop(() => ({
        accept: "subject",
        drop: (item) => onDropSubject(item, cls),
    }));

    return (
        <div ref={dropRef} className="ClassCardToAssign">
            <div className="ClassCardName">{cls.name}</div>
            <div className="container ClassCardSubjects row">
                {cls.subjects?.length > 0
                    ? cls.subjects.map((subject, index) => (

                        <div
                            key={index}
                            className="col-lg-12 SubjectItem m-2"
                        >
                            {subject?.title}
                            {cls.subjects?.length>1&&
                            <span className="p-2 Clickable" onClick={() => RemoveAssignClicked(subject)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            }
                        </div>


                    ))
                    : <span>No subjects assigned yet</span>}
            </div>
        </div>
    );
};

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [isSubjectsEditableSection, setIsSubjectsEditableSection] = useState(false);
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
    const [subjectToEdit, setSubjectToEdit] = useState({});
    const [subjectToDelet, setSubjectToDelete] = useState('');
    const [isDeAssignOverlayOpen, setIsDeAssignOverlayOpen] = useState(false);
    const [subjectToDeAssign, setSubjectToDeAssign] = useState('');
    const [subjectClassToDeAssign, setSubjectClassToDeAssign] = useState('');
    const EditClicked = (subject) => {
        setSubjectToEdit(subject);

        setIsEditOverlayOpen(true);
    }
    const handleDeletClicked = (subject) => {
        setSubjectToDelete(subject.id);
        setIsDeleteOverlayOpen(true);
    }
    const handleRemoveAssignClicked = (subject, class_id) => {
        setSubjectToDeAssign(subject.id);
        setSubjectClassToDeAssign(class_id);
        setIsDeAssignOverlayOpen(true);
    }
    useEffect(() => {
        GetData();
        GetClasses();
    }, []);

    async function GetData() {
        try {
            const response = await SubjectServices.List();
            setSubjects(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    async function GetClasses() {
        try {
            const response = await ClassService.List();
            console.log("GetClasses", response.content)
            setClasses(response.content);

        } catch (error) {
            console.error(error);
        }
    }

    const handleAddSubject = async (subject) => {
        try {
            await SubjectServices.Add(subject);
            toast.success('Subject added successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to add subject');
        }
    };

    const handleEditSubject = async (id, title) => {
        try {
            await SubjectServices.Edit(id, title);
            toast.success('Subject edited successfully');
            GetData();
            GetClasses();
        } catch (error) {
            toast.error('Failed to edit subject');
        }
    };
    const handleDropSubject = async (subject, cls) => {
        try {
            var subjects = classes.find(c => c.id === cls.id)?.subjects || [];
            console.log("subjects", subjects)
            var mappedSubjects = subjects.map(subject => ({ subject_id: subject.id }));

            if (mappedSubjects.find(s => s.subject_id === subject.id))
                return
            mappedSubjects.push({ subject_id: subject.id })

            await ClassService.AssignSubject(cls.id, mappedSubjects);

            const classIndex = classes.findIndex(c => c.id === cls.id);

            subjects.push(subject);
            classes[classIndex].subjects = subjects;
            setClasses(classes);
            GetClasses();


            toast.success(`Assigned ${subject.title} to ${cls.name}`);
        } catch (error) {
            toast.error('Failed to assign subject');
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await SubjectServices.Delete(subjectToDelet);
            toast.success('Subject deleted successfully');
            setClasses([]);
            setSubjects([]);
            GetData();
            GetClasses();

        } catch (error) {
            toast.error(`${error}`);
        }
        setSubjectToDelete(null);
    }
    const handleConfirmDeAssign = async () => {
        const subjects = classes.find(c => c.id === subjectClassToDeAssign)?.subjects || [];
        console.log("subjects", subjects)
        const mappedSubjects = subjects.map(subject => ({ subject_id: subject.id }));
        const index = mappedSubjects.findIndex(item => item.subject_id === subjectToDeAssign);
        console.log("index", index);

        if (index !== -1) {
            mappedSubjects.splice(index, 1);
        }
        console.log("data",subjectClassToDeAssign, mappedSubjects);
        
        await ClassService.AssignSubject(subjectClassToDeAssign, mappedSubjects);
        toast.success('Subject deassigned successfully')

        setClasses([]);
        setSubjects([])
        GetClasses();
        GetData();

    }
    return (
        <DndProvider backend={HTML5Backend}>
            <section className="SecondSliderSection ManageClassesCompnent">
                <Toaster position="top-right" reverseOrder={false} />

                <AddSubjectModal
                    isOpen={isAddOverlayOpen}
                    onClose={() => setIsAddOverlayOpen(false)}
                    onAddSubject={handleAddSubject}
                />
                {isEditOverlayOpen &&
                    <EditSubjectModal
                        isOpen={isEditOverlayOpen}
                        onClose={() => setIsEditOverlayOpen(false)}
                        subject={subjectToEdit}
                        onEditSubject={handleEditSubject}
                    />

                }

                <DeleteSubjectModal
                    id={subjectToDelet}
                    onDelete={handleConfirmDelete}
                    isOpen={isDeleteOverlayOpen}
                    onClose={() => setIsDeleteOverlayOpen(false)}
                />
                <DeAssignSubjectModal
                    id={subjectToDeAssign}
                    onDelete={handleConfirmDeAssign}
                    isOpen={isDeAssignOverlayOpen}
                    onClose={() => setIsDeAssignOverlayOpen(false)}
                />

                <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">Subjects</div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus" onClick={() => setIsAddOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="SubjectsContainer position-relative mb-5">
                    <div className="row ">
                        {subjects?.length > 0
                            ? <>{subjects.map((subject, index) => (
                                // <div className="sub">
                                <SubjectItem
                                    key={index}
                                    subject={subject}
                                    isEditableSection={isSubjectsEditableSection}
                                    handleEditClick={EditClicked}
                                    handleDeletClicked={handleDeletClicked}
                                />

                                // </div>

                            ))}

                            </>
                            : <span>No subjects added yet</span>}

                    </div>
                    <div className="EditSubjectsContainer Center" onClick={() => setIsSubjectsEditableSection(!isSubjectsEditableSection)}>
                        <FontAwesomeIcon icon={isSubjectsEditableSection ? faCheck : faPen} />
                    </div>
                </div>

                <div className="SubjectsContainer ClassesAllToAssignContainer">
                    <div className="ClassesToAssignContainer">
                        {classes?.length > 0
                            ? classes.filter(c => c.has_subjects === 1).map((cls, index) => (
                                <ClassCard
                                    key={index}
                                    cls={cls}
                                    onDropSubject={handleDropSubject}
                                    RemoveAssignClicked={(subject) => handleRemoveAssignClicked(subject, cls.id)}
                                />
                            ))
                            : <span>No classes added yet</span>}
                    </div>
                </div>
            </section>
        </DndProvider>
    );
};

export default Subjects;
