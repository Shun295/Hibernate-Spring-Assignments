import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin-dashboard.css";

const Widget = () => {

    const dashboardApi =
        "http://localhost:8080/api/executive/dashboard";

    const [dashboard, setDashboard] =
        useState({});

    const navigate = useNavigate();

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const getStats = async () => {

            try {

                const response =
                    await axios.get(
                        dashboardApi,
                        config_details
                    );

                setDashboard(
                    response.data
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }
        };

        getStats();

    }, []);

    return (

        <div className="dashboard-wrapper">

            <h1 className="dashboard-title">
                Executive Dashboard
            </h1>
                        <div className="row">

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-blue">
                        <div className="card-body">
                            <h5>Customers Managed</h5>
                            <p className="stat-number">
                                {dashboard.customersManaged || 0}
                            </p>
                            <small>Total Customers</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-green">
                        <div className="card-body">
                            <h5>Account Opening Requests</h5>
                            <p className="stat-number">
                                {dashboard.accountOpeningRequests || 0}
                            </p>
                            <small>Pending Review</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-yellow">
                        <div className="card-body">
                            <h5>Loan Requests</h5>
                            <p className="stat-number">
                                {dashboard.loanRequests || 0}
                            </p>
                            <small>Awaiting Verification</small>
                        </div>
                    </div>
                </div>

            </div>
                        <div className="row mt-3">

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-red">
                        <div className="card-body">
                            <h5>Transactions Today</h5>
                            <p className="stat-number">
                                {dashboard.transactionsToday || 0}
                            </p>
                            <small>Today's Activity</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-cyan">
                        <div className="card-body">
                            <h5>Pending Closures</h5>
                            <p className="stat-number">
                                {dashboard.pendingClosures || 0}
                            </p>
                            <small>Needs Review</small>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card dashboard-card card-grey">
                        <div className="card-body">
                            <h5>Joint Account Requests</h5>
                            <p className="stat-number">
                                {dashboard.jointAccountRequests || 0}
                            </p>
                            <small>Pending Verification</small>
                        </div>
                    </div>
                </div>

            </div>
                        <div className="card quick-actions-card mt-4">

                <div className="card-body">

                    <h3 className="mb-4">
                        Quick Actions
                    </h3>

                    <div className="row g-3">

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-primary quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/executive/account-opening-requests"
                                    )
                                }
                            >
                                Account Requests
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-success quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/executive/loan-applications"
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
                                        "/executive/joint-account-requests"
                                    )
                                }
                            >
                                Joint Requests
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-danger quick-btn w-100"
                                onClick={() =>
                                    navigate(
                                        "/executive/closure-requests"
                                    )
                                }
                            >
                                Closure Requests
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Widget;