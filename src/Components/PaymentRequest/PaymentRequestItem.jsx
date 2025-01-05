import { faBell, faCommentDollar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './PaymentRequestItem.css';
import AddRequestModal from "./AddRequestModal";
import Kids from "../ManageClasses/Kids";
import KidTable from "../Table/KidTable";
import { KidsServices, PaymentRequestServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import kidImage from '../../Assets/images/INFANCIA_LOGO.png'
import { getBranchId, getNurseryId } from "../../Service/AxiosApi";

const PaymentRequestItem = ({ SelectedClassId }) => {

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            const allIds = kids.map(item => item.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowChange = (id) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(id)) {
                return prevSelectedRows.filter(rowId => rowId !== id);
            } else {
                return [...prevSelectedRows, id];
            }
        });
    };

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);



    const handleAddRequest = async (serviceName, amount,status ,description) => {
        try {
            const kids = selectedRows.map(id => ({ id: id }));

            const requestData = {
                kids,
                title: serviceName,
                amount:amount,
                description:description,
                status:status?'mandatory':'optional',
                branch_id:getBranchId(),
                nursery_id:getNurseryId()
            };

            console.log(requestData);
            const response = await PaymentRequestServices.Add(requestData);
            toast.success('Request added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add request');
        }
    };


    const [kids, setKids] = useState([]);
    useEffect(() => {
        GetData();
    }, []);
    async function GetData() {
        try {

            const response = await KidsServices.ListClassKids(SelectedClassId);

            setKids(response.content);


        } catch (error) {
            console.log(error)

        }
    }

    const handleAddClick = ()=>{
        if(selectedRows.length>0)
            setIsOverlayOpen(true);
        else
            toast.error('Please select kids first')
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddRequestModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRequest={handleAddRequest}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Payment Request
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={handleAddClick}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer PaymentRequestContainer">
                <div className="SelectAllContainer">
                    <div className="SelectAll">
                        <div className="InputSelectAll">
                            <input
                                type="checkbox"
                                name=""
                                id="SelectAll"
                                checked={selectedRows?.length === kids?.length}
                                onChange={handleSelectAllChange}
                            />
                            <label htmlFor="SelectAll">select all</label>
                        </div>
                    </div>
                </div>


                <div className="table-responsive ">
                    <table className="table table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">ID</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kids?.length > 0 ? kids.map((kid) => (
                                <tr key={kid.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(kid.id)}
                                            onChange={() => handleRowChange(kid.id)}
                                        />
                                    </td>
                                    <td>{kid.id}</td>
                                    <td className="text-center">
                                        <img
                                            src={kid.media ? kid?.media[0]?.original_url : kidImage}
                                            width="30px"
                                            alt={`${kid.kid_name} avatar`}
                                            className="avatar"
                                        />
                                    </td>
                                    <td>
                                        {/* <Link to={`/kidprofile?kidId=${kid.id}`} className="nav-link"> */}
                                        {kid.first_name + " " + kid.last_name}
                                        {/* </Link> */}
                                    </td>
                                    <td>{kid.gender}</td>


                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="5">
                                        No Data
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PaymentRequestItem;
