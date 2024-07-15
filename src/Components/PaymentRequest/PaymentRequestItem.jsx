import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './PaymentRequestItem.css'
const PaymentRequestItem = ()=>{
    
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Payment Request
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubjectsContainer">
                    <div className="SelectAllContainer">
                        
                    </div>
                <div className="table-responsive TableContainer">
                <table className="table ">
                    <tbody>
                       
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="NamePayment" data-content="Ahmed hamed">Ahmed hamed</td>
                                <td>20184</td>
                                <td>20$</td>
                                <td className="NamePayment" data-content="20-8-2024">20-8-2024</td>
                                <td>
                                    <FontAwesomeIcon icon={faBell}/>
                                </td>
                                
                               
                            </tr>
                         
                       
                    </tbody>
                </table>
            </div>


                </div>
        </section>
    );
}
export default PaymentRequestItem;