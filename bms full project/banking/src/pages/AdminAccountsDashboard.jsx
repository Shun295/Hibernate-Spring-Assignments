import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useNavigate } from "react-router-dom";

const AdminAccountsDashboard = () => {

    const navigate = useNavigate();
    return (
        <div>
            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Management
                        </h1>

                        <p className="page-subtitle">
                            Manage account operations, requests and account configurations
                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>Account Opening Requests</h4>

                                <p>
                                    Review and approve customer account opening applications.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate(
                                            "/admin/account-opening-requests"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>Closure Requests</h4>

                                <p>
                                    Review account closure requests submitted by customers.
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        navigate(
                                            "/admin/closureRequests"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>Search Account</h4>

                                <p>
                                    Search and view account details using account number.
                                </p>

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        navigate(
                                            "/admin/account-search"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>All Accounts</h4>

                                <p>
                                    View and monitor all customer accounts in the bank.
                                </p>

                                <button
                                    className="btn btn-info"
                                    onClick={() =>
                                        navigate(
                                            "/admin/all-accounts"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>Account Types</h4>

                                <p>
                                    Create, update and manage available account types.
                                </p>

                                <button
                                    className="btn btn-dark"
                                    onClick={() =>
                                        navigate(
                                            "/admin/account-types"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="dashboard-action-card">

                                <h4>Joint Account Approvals</h4>

                                <p>
                                    Approve or reject joint account requests reviewed by executives.
                                </p>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/admin/joint-account-approvals"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    );

};

export default AdminAccountsDashboard;