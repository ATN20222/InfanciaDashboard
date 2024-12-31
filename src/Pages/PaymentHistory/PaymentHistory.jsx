import { faBell, faCommentDollar, faEye, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './PaymentHistory.css';
import { PaymentRequestServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import ConfirmPaidModal from "./ConfirmPaidModal";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { Link } from "react-router-dom";


const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState();
    const [itemToDelete, setItemToDelete] = useState('');

    useEffect(() => {
        GetData();
    }, []);
    async function GetData() {
        try {
            const response = await PaymentRequestServices.List();
            setPayments(response.content);
        } catch (error) {
            console.log(error)

        }
    }

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    }

    const handleDelete = async () => {
        try {
            const response = await PaymentRequestServices.Delete(itemToDelete);
            toast.success('request deleted successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to delete request');
        }
        setItemToDelete(null);
    };


    const [isConfirmOverlayOpen, setIsConfirmOverlayOpen] = useState(false);
    const [paymentToConfirm, setPaymentToConfirm] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await PaymentRequestServices.MarkPaid(paymentToConfirm);
            toast.success('Payment Confirmed successfully');
            GetData();

        } catch (error) {
            toast.error('Failed Confirm Payment');
        }
        setPaymentToConfirm(null);
    };
    const HandlePaid = (item) => {
        if (!item.is_paid) {
            setPaymentToConfirm(item.id);
            setIsConfirmOverlayOpen(true);
        }
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <ConfirmPaidModal
                id={paymentToConfirm}
                isOpen={isConfirmOverlayOpen}
                onClose={() => setIsConfirmOverlayOpen(false)}
                onConfirm={handleConfirm}
            />
            <DeleteSubjectModal
                id={itemToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
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
                            Payment Bills
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="SubjectsContainer PaymentHistoryTableContainer">

                {/* <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">

                    <div className="container">
                        <div className="row">
                            {payments.map((row) => (
                                <div className="col-lg-12 RecordEmpTable">
                                    <div className="row">

                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row.kids?.kid_name}>

                                                {row.kids?.kid_name}
                                            </span>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row.id}>

                                                {row.id}
                                            </span>
                                        </div>

                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row?.kids?.class?.name}>

                                                {row?.kids?.class?.name}
                                            </span>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row?.amount + " EGP"}>

                                                {row?.amount} EGP
                                            </span>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={formatDate(row.created_at)}>

                                                {formatDate(row.created_at)}
                                            </span>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row.paid_at ? formatDate(row.paid_at) : '------'}>

                                                {row.paid_at ? formatDate(row.paid_at) : '------'}
                                            </span>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 PaymentHistoryCol Center">
                                            <span className="BranchTableSpan" data-content={row.service}>

                                                {row.service}
                                            </span>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 PaymentHistoryCol Center">

                                            <div onClick={() => HandlePaid(row)} className={`${row.is_paid ? "Paied" : "NotPaid"}`}>
                                                <FontAwesomeIcon icon={faCommentDollar} />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>



                </div> */}
                <div className="table-responsive ">
                    <table className="table table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Created at</th>
                                <th scope="col">Show</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>

                                    <td>
                                        {payment.title}

                                    </td>
                                    <td>{payment.description}</td>
                                    <td>{payment.amount}</td>
                                    <td>{formatDate(payment.created_at)}</td>
                                    <td>
                                        <Link to={`/paymentbills/${payment.id}`} className="nav-link">
                                            <FontAwesomeIcon icon={faEye}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <span>
                                            <FontAwesomeIcon icon={faTrash}
                                                onClick={() => { setIsDeleteOverlayOpen(true); setItemToDelete(payment.id) }} />
                                        </span>
                                    </td>

                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="7">
                                        No Data
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>


            </div>
            {/* <div className="TotalPayContainer">
                <span>Total</span>
            </div> */}
        </section>
    );
};

export default PaymentHistory;
