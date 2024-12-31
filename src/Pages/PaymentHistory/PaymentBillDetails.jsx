import { faBell, faChevronLeft, faCommentDollar, faEye, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './PaymentHistory.css';
import { PaymentRequestServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import ConfirmPaidModal from "./ConfirmPaidModal";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { Link, useParams } from "react-router-dom";


const PaymentBillDetails = () => {
    const [kids, setKids] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        GetData();
    }, []);
    async function GetData() {
        try {
            const response = await PaymentRequestServices.GetById(id);
            setKids(response.content.kids);
        } catch (error) {
            console.log(error)

        }
    }




    const [isConfirmOverlayOpen, setIsConfirmOverlayOpen] = useState(false);
    const [paymentToConfirm, setPaymentToConfirm] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await PaymentRequestServices.MarkPaid(paymentToConfirm.id);
            toast.success('Payment Confirmed successfully');
            GetData();
        } catch (error) {
            toast.error('Failed Confirm Payment');
        }
        setPaymentToConfirm(null);
    };
    const HandlePaid = (item) => {
        setPaymentToConfirm(item);
        setIsConfirmOverlayOpen(true);
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            {paymentToConfirm?.id &&
                <ConfirmPaidModal
                    key={paymentToConfirm?.id}
                    item={paymentToConfirm}
                    isOpen={isConfirmOverlayOpen}
                    onClose={() => setIsConfirmOverlayOpen(false)}
                    onConfirm={handleConfirm}
                />
            }

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
                            <Link className="nav-link Center" to='/paymentbills'>
                                <FontAwesomeIcon icon={faChevronLeft} className="" /> Payment Bills
                            </Link>

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

                <div className="table-responsive ">
                    <table className="table table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col">Check</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {kids.length > 0 ? kids.map((kid) => (
                                <tr key={kid.id}>
                                    <td>{kid.id}</td>
                                    <td>
                                        {kid.first_name + " " + kid.last_name}
                                    </td>
                                    <td
                                        className={`PaymentStatus ${kid.kid_payment_bill.status}`}
                                        onClick={() => HandlePaid(kid.kid_payment_bill)}
                                    >{kid.kid_payment_bill.status}</td>
                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="3">
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

export default PaymentBillDetails;
