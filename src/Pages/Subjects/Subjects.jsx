import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { ClassService, SubjectServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import AddSubjectModal from "../../Components/ManageClasses/AddSubjectModal";
import './Subjects.css';

const SubjectItem = ({ subject, onDrop }) => {
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
        </div>
    );
};

const ClassCard = ({ cls, onDropSubject }) => {
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
            console.log("GetClasses",response.content)
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

    const handleDropSubject = async (subject, cls) => {
        try {
            var subjects = classes.find(c => c.id === cls.id)?.subjects || [];
            console.log("subjects",subjects)
            var mappedSubjects = subjects.map(subject => ({ subject_id: subject.id }));
            
            if(mappedSubjects.find(s=>s.subject_id ===subject.id))
                return
            mappedSubjects.push({subject_id: subject.id })

            await ClassService.AssignSubject(cls.id, mappedSubjects);

            const classIndex = classes.findIndex(c => c.id === cls.id);

            subjects.push(subject);
            console.log("updatedSubject",subjects)
            classes[classIndex].subjects = subjects;
            console.log(classes[classIndex])
            setClasses(classes);
            // setClasses([]);
            GetClasses();

            
            toast.success(`Assigned ${subject.title} to ${cls.name}`);
        } catch (error) {
            toast.error('Failed to assign subject');
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <section className="SecondSliderSection ManageClassesCompnent">
                <Toaster position="top-right" reverseOrder={false} />

                <AddSubjectModal
                    isOpen={isAddOverlayOpen}
                    onClose={() => setIsAddOverlayOpen(false)}
                    onAddSubject={handleAddSubject}
                />
                <DeleteSubjectModal
                    isOpen={isDeleteOverlayOpen}
                    onClose={() => setIsDeleteOverlayOpen(false)}
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

                <div className="SubjectsContainer mb-5">
                    <div className="row">
                        {subjects?.length > 0
                            ? subjects.map((subject, index) => (
                                <SubjectItem key={index} subject={subject} />
                            ))
                            : <span>No subjects added yet</span>}
                    </div>
                </div>

                <div className="SubjectsContainer ClassesAllToAssignContainer">
                    <div className="ClassesToAssignContainer">
                        {classes?.length > 0
                            ? classes.map((cls, index) => (
                                <ClassCard key={index} cls={cls} onDropSubject={handleDropSubject} />
                            ))
                            : <span>No classes added yet</span>}
                    </div>
                </div>
            </section>
        </DndProvider>
    );
};

export default Subjects;
