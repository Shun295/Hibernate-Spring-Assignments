import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import "../styles/executive-common.css";
import { useNavigate } from "react-router-dom";

const ExecutiveAccountsDashboard = () => {

    const navigate = useNavigate();

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Management Dashboard
                        </h1>

                        <p className="page-subtitle">
                            Manage account requests, searches and branch account operations
                        </p>

                    </div>

                    <div className="row mt-4">

                        <div className="col-md-6 mb-4">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Account Opening Requests
                                    </h4>

                                    <p>
                                        Review and approve account opening requests.
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(
                                                "/executive/account-opening-requests"
                                            )
                                        }
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Account Closure Requests
                                    </h4>

                                    <p>
                                        Review and approve account closure requests.
                                    </p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            navigate(
                                                "/executive/closure-requests"
                                            )
                                        }
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Search Account
                                    </h4>

                                    <p>
                                        Search accounts using account number.
                                    </p>

                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            navigate(
                                                "/executive/account-search"
                                            )
                                        }
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Accounts In My Branch
                                    </h4>

                                    <p>
                                        View all accounts belonging to your branch.
                                    </p>

                                    <button
                                        className="btn btn-info"
                                        onClick={() =>
                                            navigate(
                                                "/executive/branch-accounts"
                                            )
                                        }
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Customer Accounts
                                    </h4>

                                    <p>
                                        View all accounts belonging to a customer.
                                    </p>

                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            navigate(
                                                "/executive/customer-accounts"
                                            )
                                        }
                                    >
                                        View Accounts
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <h4>
                                        Joint Account Requests
                                    </h4>

                                    <p>
                                        Review joint account holder requests submitted by customers.
                                    </p>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            navigate(
                                                "/executive/joint-account-requests"
                                            )
                                        }
                                    >
                                        Review Requests
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>





    );

};

export default ExecutiveAccountsDashboard;