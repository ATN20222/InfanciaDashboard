import React, { useEffect, useState } from "react";
import HomeCard from "../../Components/Home/HomeCard";
import toast, { Toaster } from "react-hot-toast";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import './Home.css'
import { AuthService } from "../../Service/Api";
import HomeSuperCard from "../../Components/Home/HomeSuperCard";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const HomeSuper = () => {
    const [nurseryAccepted, setNurseryAccepted] = useState(0);
    const [nurseryPending, setNurseryPending] = useState(0);
    const [nurseryRejected, setNurseryRejected] = useState(0);
    const [nurseryKids, setNurseryKids] = useState([]);
    const [nurseryGrowth, setNurseryGrowth] = useState([]);

    useEffect(() => {
        const hasWelcomed = localStorage.getItem("hasWelcomed");
        GetData();

        if (!hasWelcomed) {
            toast.success('Welcome');
            localStorage.setItem("hasWelcomed", "true");
        }
    }, []);

    async function GetData() {
        try {
            const response = await AuthService.SuperAdminHome();
            console.log(response);
            setNurseryAccepted(response.content.nurseries_approved);
            setNurseryPending(response.content.nurseries_pending);
            setNurseryRejected(response.content.nurseries_rejected);
            setNurseryKids(response.content.nursery_kids);
            setNurseryGrowth(response.content.nursery_growth);
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    // Data for the overall charts
    const barData = {
        labels: ['Applications', 'Accepted Nurseries'],
        datasets: [
            {
                label: 'Count',
                data: [nurseryPending, nurseryAccepted],
                backgroundColor: ['#ED6D91', '#009FE3'],
            },
        ],
    };

    const branchGrowthData = {
        labels: nurseryGrowth.map(item => item.month),
        datasets: [
            {
                label: 'Nurseries Growth',
                data: nurseryGrowth.map(item => item.total),
                fill: false,
                backgroundColor: '#ED6D91',
                borderColor: '#ED6D91',
                tension: 0.1,
            },
        ],
    };

    const kidsCountData = {
        labels: nurseryKids.map(item => item.name),
        datasets: [
            {
                label: 'Kids Count',
                data: nurseryKids.map(item => item.kids_count), 
                backgroundColor: ['#AED065', '#ED6D91', '#009FE3', '#FFCE56'],
            },
        ],
    };
    

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        layout: {
            padding: 20,
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="Home">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="container">
                <div className="row Center">
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <HomeSuperCard
                            Title={"Pending"}
                            Number={nurseryPending}
                            Text={'Pending nurseries'}
                            link={'manageclasses'}
                        />
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <HomeSuperCard
                            Title={"Accepted"}
                            Number={nurseryAccepted}
                            Text={'Accepted nurseries'}
                            link={'admins'}
                        />
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <HomeSuperCard
                            Title={"Rejected"}
                            Number={nurseryRejected}
                            Text={'Rejected nurseries'}
                            link={'admins'}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="row ChartsRow">
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Bar data={barData} options={chartOptions} />
                                </div>
                                <span>Accepted-Pending Nurseries</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={branchGrowthData} options={chartOptions} />
                                </div>
                                <span>Nurseries Growth Over Time</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                        {/* <Pie data={kidsCountData} /> */}
                                        <Bar data={kidsCountData} options={chartOptions} />

                                    {/* <Pie data={kidsCountData} options={chartOptions} /> */}
                                </div>
                                <span>Kids Count Per Nursery</span>
                            </div>
                        </div>
                    </div>

                    <div className="row ChartsRow">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSuper;
