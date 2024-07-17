import { faBell, faCommentDollar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './PaymentRequestItem.css';
import AddRequestModal from "./AddRequestModal";

const PaymentRequestItem = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 20184, amount: "20$", date: "20-8-2024" ,  payed:true},
        { id: 2, name: "Ahmed hamed", paymentId: 20184, amount: "20$", date: "20-8-2024" ,  payed:false}
    ];

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            const allIds = tableData.map(item => item.id);
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

    

    const handleAddRequest = (className) => {
        
      };
    

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddRequestModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRequest={handleAddRequest}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Payment Request
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
                <div className="SelectAllContainer">
                    <div className="SelectAll">
                        <div className="InputSelectAll">
                            <input
                                type="checkbox"
                                name=""
                                id="SelectAll"
                                checked={selectedRows.length === tableData.length}
                                onChange={handleSelectAllChange}
                            />
                            <label htmlFor="SelectAll">Select All</label>
                        </div>
                    </div>
                </div>
                <div className="table-responsive TableContainer">
                    <table className="table">
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => handleRowChange(row.id)}
                                        />
                                    </td>
                                    <td className="NamePayment" data-content={row.name}>{row.name}</td>
                                    <td>{row.paymentId}</td>
                                    <td>{row.amount}</td>
                                    <td className="NamePayment" data-content={row.date}>{row.date}</td>
                                    <td className={`${row.payed?"Payed":""}`}>
                                        <FontAwesomeIcon icon={faCommentDollar} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PaymentRequestItem;
