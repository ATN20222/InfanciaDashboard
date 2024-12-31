import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FAQItem from "../../Components/FAQ/FAQItem";
import './FAQ.css'
import AddFAQModal from "../../Components/FAQ/AddFAQModal";
import { FAQServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
const FAQ = () => {
    const [faq, setFaq] = useState([]);
    useEffect(() => {
        GetData();
    }, []);


    const [isOverlayOpen, setIsOverlayOpen] = useState(false);



    const handleAddFAQ = async (question, answer) => {
        try {
            const response = await FAQServices.Add(question, answer);
            toast.success('FAQ added successfully');
            GetData();
        } catch (error) {
            toast.error('failed to add FAQ');
        }
    };

    async function GetData() {

        try {

            const response = await FAQServices.List();
            console.log(response)
            setFaq(response.content)
        } catch (error) {
            toast.error('failed to get data');

        }

    }
    const handleDeleteFaq = async (id) => {
        try {

            const response = await FAQServices.Delete(id);
            toast.success('FAQ deleted successfully');
            GetData();

        } catch (error) {
            toast.error('failed to delete FAQ');

        }
    };


    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddFAQModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddFAQ={handleAddFAQ}
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
                            FAQ
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)} >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="DropDownContainer">

                <div className="row">
                    {faq.map((row) => (
                        <FAQItem
                            key={row.id}
                            id={row.id}
                            Question={row.question}
                            Answer={row.answer}
                            handleDalete={handleDeleteFaq}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
