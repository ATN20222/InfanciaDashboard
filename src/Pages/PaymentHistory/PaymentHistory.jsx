import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './PaymentHistory.css';


const PaymentHistory = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 201, amount: "20$", class:"Class A", date: "20-8-2024" , service:"Travel"},
        { id: 2, name: "Ahmed hamed", paymentId: 204, amount: "20$", class:"Class B", date: "20-8-2024" , service:"Travel"}
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
    

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Payment History
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
                {/* <div className="SelectAllContainer">
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
                </div> */}
                <div className="table-responsive TableContainer TableContainerHistoryPayment">
                    <table className="table">
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    {/* <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => handleRowChange(row.id)}
                                        />
                                    </td> */}
                                    <td className="NamePayment" data-content={row.name}>{row.name}</td>
                                    <td className="NamePayment" data-content={row.paymentId} >{row.paymentId}</td>
                                    <td  className="NamePayment" data-content={row.class} >{row.class}</td>
                                    <td>{row.amount}</td>
                                    <td className="NamePayment" data-content={row.date}>{row.date}</td>
                                    <td className="NamePayment" data-content={row.service}>{row.service}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="TotalPayContainer">
                <span>Total</span>
            </div>
        </section>
    );
};

export default PaymentHistory;
