import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Classes = ({ IsMeals, Classes, HandleSelectClass, OnEdit }) => {
    const [SelectedClass, SetSelectedClass] = useState(null);
    useEffect(() => {
        if (Classes && Classes.length > 0) {
            SetSelectedClass(Classes[0]);
            HandleSelectClass(Classes[0]);
        }
    }, [Classes]);

    return (
        <div className="container Container">
            <div className="container SubjectsContainer">
                <div className=" row ClassCardContainerRow">
                    {Classes && Classes.map((item) => (
                        <div className={`ClassCard m-1 ${SelectedClass?.id == item.id ? "ActiveClass" : ""}`} onClick={() => { HandleSelectClass(item); SetSelectedClass(item) }}>{item.name}</div>
                    ))}
                    {/* <div className="m-1 ClassCard ">
                            Class A
                        </div>
                    s
                        <div className="m-1 ClassCard ">
                            Class A
                        </div> */}

                </div>
            </div>
            <div className="info ClassInfo mt-1">
                <span>Age From {SelectedClass?.age_from} to {SelectedClass?.age_to} | {SelectedClass?.kids_count} Kids
                    <span>
                        <div className='EditClassBtn' onClick={() => OnEdit(SelectedClass)}>

                            <FontAwesomeIcon icon={faPen} />
                        </div>
                    </span>

                </span>
            </div>
        </div>
    );
}
export default Classes;