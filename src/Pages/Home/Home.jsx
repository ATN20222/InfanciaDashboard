import React, { useEffect } from "react";
import HomeCard from "../../Components/Home/HomeCard";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
    useEffect(() => {
        const hasWelcomed = localStorage.getItem("hasWelcomed");

        if (!hasWelcomed) {
            toast.success('Welcome');
            localStorage.setItem("hasWelcomed", "true");
        }
    }, []);

    return (
        <div className="Home">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <HomeCard />
        </div>
    );
}

export default Home;
