import React, { useEffect, useState } from "react";
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import PaymentRequestItem from "../../Components/PaymentRequest/PaymentRequestItem";
import { ClassService } from "../../Service/Api";
const PaymentRequest = ()=>{
    const [selectedClass, setSelectedClass] = useState(null);
    const [updateKey, setUpdateKey] = useState(0);
    useEffect(() => {

        async function fetchDefaultClass() {
            try {
                const response = await ClassService.List();
                const defaultClass = response.content[0];
                if (defaultClass) {
                    setSelectedClass(defaultClass.id);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDefaultClass();
    }, []);

    const handleChangeClass = (classs) => {
        setSelectedClass(classs.id);
        setUpdateKey(prevKey => prevKey + 1);
    };

    return(
        <div className="LoginMain">
            
                <ManageClassesCompnent IsMeals={false} ChangeClass={handleChangeClass}/>
                <PaymentRequestItem key={`PaymentRequestItem-${updateKey}`} SelectedClassId={selectedClass}/>

        </div>
    )
}
export default PaymentRequest;