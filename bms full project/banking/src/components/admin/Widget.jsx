import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin-dashboard.css";
import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

);
import {
    Bar,
    Pie
}
    from "react-chartjs-2";
const Widget = () => {

    const dashboardApi = "http://localhost:8080/api/admin-dashboard/dashboard";

    const customerGrowthApi =
        "http://localhost:8080/api/admin-report/customer-growth";

    const analyticsApi =
        "http://localhost:8080/api/admin-report/analytics";
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [growthLabels,
        setGrowthLabels] =
        useState([]);

    const [growthCounts,
        setGrowthCounts] =
        useState([]);

    const [analyticsLabels,
        setAnalyticsLabels] =
        useState([]);

    const [analyticsCounts,
        setAnalyticsCounts] =
        useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        };

        const getStats = async () => {
            try {

                const response = await axios.get(
                    dashboardApi,
                    config_details
                );

                setLabel(response.data.label);
                setData(response.data.count);
                const growthResponse =
                    await axios.get(
                        customerGrowthApi,
                        config_details
                    );

                setGrowthLabels(
                    growthResponse.data.months
                );

                setGrowthCounts(
                    growthResponse.data.counts
                );

                const analyticsResponse =
                    await axios.get(
                        analyticsApi,
                        config_details
                    );

                setAnalyticsLabels(
                    analyticsResponse.data.labels
                );

                setAnalyticsCounts(
                    analyticsResponse.data.counts
                );

            }
            catch (err) {
                console.log(err?.response);
            }
        };

        getStats();

    }, []);

    const customerGrowthData = {

        labels:
            growthLabels,

        datasets: [

            {

                label:
                    "Customers",

                data:
                    growthCounts,

                backgroundColor:
                    "rgba(54,162,235,0.7)"

            }

        ]

    };

    const analyticsData = {

        labels:
            analyticsLabels,

        datasets: [

            {

                data:
                    analyticsCounts,

                backgroundColor: [

                    "#0d6efd",

                    "#198754",

                    "#ffc107",

                    "#dc3545",

                    "#6f42c1",

                    "#20c997"

                ]

            }

        ]

    };

    return (
          <div className="dashboard-wrapper">
            <h1 className="dashboard-title">
                Admin Dashboard
            </h1>

            {/* First Row */}

            <div className="row">

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-blue">
                        <div className="card-body">
                            <h5>Total Customers</h5>


                            <p className="stat-number">
                                {data.length > 0 ? data[0] : 0}
                            </p>
                            <small>Registered Customers</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-green">
                        <div className="card-body">
                            <h5>Total Accounts</h5>
                            <p className="stat-number">
                                {data.length > 1 ? data[1] : 0}
                            </p>
                            <small>Active Accounts</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-yellow">
                        <div className="card-body">
                            <h5>Total Loans</h5>



                            <p className="stat-number">
                                {data.length > 2 ? data[2] : 0}
                            </p>
                            <small>Loan Portfolio</small>
                        </div>
                    </div>
                </div>

            </div>

            {/* Second Row */}

            <div className="row mt-3">

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-red">
                        <div className="card-body">
                            <h5>Pending Closures</h5>


                            <p className="stat-number">
                                {data.length > 3 ? data[3] : 0}
                            </p>
                            <small>Requires Approval</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-cyan">
                        <div className="card-body">
                            <h5>Monthly Transactions</h5>


                            <p className="stat-number">
                                {data.length > 4 ? data[4] : 0}
                            </p>
                            <small>This Month</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-grey">
                        <div className="card-body">
                            <h5>Total Branches</h5>

                            <p className="stat-number">
                                {data.length > 5 ? data[5] : 0}
                            </p>
                            <small>Branch Network</small>
                        </div>
                    </div>
                </div>

            </div>

            {/* Quick Actions */}

            <div className="card quick-actions-card mt-4">

                <div className="card-body">

                    <h3 className="mb-4">Quick Actions</h3>

                    <div className="row g-3">


                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-primary quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/admin/account-opening-requests"
                                    )
                                }
                            >
                                Account approval Requests
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-success quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/admin/loan-applications"
                                    )
                                }
                            >
                                Loan Requests
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-warning quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/admin/branch/add"
                                    )
                                }
                            >
                                Add Branch
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-dark quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/admin/executives"
                                    )
                                }
                            >
                                Add Executive
                            </button>
                        </div>



                    </div>
                    <div className="row mt-4">

                        <div className="col-md-8">

                            <div className="card chart-card">

                                <div className="card-header">

                                    <h5>
                                        Customer Growth
                                    </h5>

                                </div>

                                <div className="card-body">

                                    <Bar
                                        data={
                                            customerGrowthData
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card chart-card">

                               <div className="card-header chart-header">

                                    <h5>
                                        System Analytics
                                    </h5>

                                </div>

                                <div className="card-body">

                                    <Pie
                                        data={
                                            analyticsData
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Widget;