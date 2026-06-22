import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/customer-common.css";
const CustomerAccountManagement = () => {

    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [openingRequests, setOpeningRequests] = useState([]);
    const myAccountsApi = "http://localhost:8080/api/account/my-accounts";
    const [jointRequests, setJointRequests] =
        useState([]);
    const myOpeningRequestsApi =
        "http://localhost:8080/api/accountOpeningReq/my-requests";
    const myJointRequestsApi =
        "http://localhost:8080/api/jointAccReq/my-requests";
    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        const getAccounts = async () => {

            try {

                const response = await axios.get(
                    myAccountsApi,
                    config_details
                );

                console.log(response.data);

                setAccounts(response.data.data);

            }
            catch (err) {

                console.error(err)

            }

        };
        const getOpeningRequests = async () => {

            try {

                const response = await axios.get(
                    myOpeningRequestsApi,
                    config_details
                );

                setOpeningRequests(response.data);

            }
            catch (err) {

                console.log(err?.response);

            }

        };

        const getJointRequests = async () => {

            try {

                const response = await axios.get(
                    myJointRequestsApi,
                    config_details
                );


                console.log("API Data:", response.data.data);

                setJointRequests(
                    response.data

                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };


        getAccounts();
        getOpeningRequests();
        getJointRequests();
    }, []);

    const pendingOpeningRequests =
    openingRequests.filter(
        request =>
            request.status === "PENDING" ||
            request.status === "REVIEWED"
    );
    return (
        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">
                        <h1 className="page-title">
                            Account Management
                        </h1>
                        <p className="page-subtitle">
                            Manage your accounts, requests and balances
                        </p>
                    </div>
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">

                            <h4 className="mb-4">
                                Quick Actions
                            </h4>

                            <div className="row g-3">

                                <div className="col-md-4">
                                    <button
                                        className="btn btn-primary w-100 py-3"
                                        onClick={() =>
                                            navigate("/customer/account-opening/apply")
                                        }
                                    >
                                        Open New Account
                                    </button>
                                </div>

                                <div className="col-md-4">
                                    <button
                                        className="btn btn-success w-100 py-3"
                                        onClick={() =>
                                            navigate("/customer/joint-account-request")
                                        }
                                    >
                                        Joint Account Request
                                    </button>
                                </div>

                                <div className="col-md-4">
                                    <button
                                        className="btn btn-warning w-100 py-3"
                                        onClick={() =>
                                            navigate("/customer/closure-requests")
                                        }
                                    >
                                        Closure Request
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="row g-4 mb-4">

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>TOTAL ACCOUNTS</h5>
                                <h2>{accounts.length}</h2>
                                <p>Active & Closed Accounts</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>OPENING REQUESTS</h5>
                                <h2>{pendingOpeningRequests.length}</h2>
                                <p>Pending Approvals</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>TOTAL BALANCE</h5>
                                <h2>
                                    ₹
                                    {
                                        accounts.reduce(
                                            (sum, acc) =>
                                                sum + Number(acc.balance),
                                            0
                                        )
                                    }
                                </h2>
                                <p>Across All Accounts</p>
                            </div>
                        </div>

                    </div>

                    <div className="accounts-section mb-5">

                        <div className="accounts-header">
                            <h1 className="accounts-title">My Accounts</h1>
                            <p className="accounts-subtitle">
                                View all your account details and balances
                            </p>
                        </div>

                        <div className="table-card">

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>
                                        <tr>
                                            <th>Account Number</th>
                                            <th>Account Type</th>
                                            <th>Balance</th>
                                            <th>Status</th>
                                            <th>Branch</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {accounts.map((account) => (
                                            <tr key={account.id}>
                                                <td>{account.accountNumber}</td>

                                                <td>
                                                    <span className="type-badge">
                                                        {account.accountType}
                                                    </span>
                                                </td>

                                                <td className="balance-cell">
                                                    ₹{Number(account.balance).toLocaleString()}
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            account.accountStatus === "ACTIVE"
                                                                ? "status-badge active"
                                                                : "status-badge closed"
                                                        }
                                                    >
                                                        {account.accountStatus}
                                                    </span>
                                                </td>

                                                <td>{account.branchName}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="requests-section mt-5">

                            <div className="requests-header">
                                <h1 className="requests-title">
                                    Joint Account Requests
                                </h1>

                                <p className="requests-subtitle">
                                    Track the status of your joint account requests
                                </p>
                            </div>

                            <div className="table-card">

                                <div className="table-responsive">

                                    <table className="table requests-table">

                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Account Number</th>
                                                <th>Joint Holder</th>
                                                <th>Status</th>
                                                <th>Remarks</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {jointRequests.length > 0 ? (

                                                jointRequests.map((request) => (

                                                    <tr key={request.id}>

                                                        <td>
                                                            <strong>
                                                                {request.id}
                                                            </strong>
                                                        </td>

                                                        <td>
                                                            {request.accountNumber}
                                                        </td>

                                                        <td>
                                                            {request.jointHolderName}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    request.status === "APPROVED"
                                                                        ? "status-badge active"
                                                                        : request.status === "REJECTED"
                                                                            ? "status-badge rejected"
                                                                            : request.status === "REVIEWED"
                                                                                ? "status-badge reviewed"
                                                                                : "status-badge pending"
                                                                }
                                                            >
                                                                {request.status}
                                                            </span>
                                                        </td>

                                                        <td className="text-muted">
                                                            {request.remarks || "-"}
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                request.createdAt
                                                            ).toLocaleDateString()}
                                                        </td>

                                                    </tr>

                                                ))

                                            ) : (

                                                <tr>

                                                    <td
                                                        colSpan="6"
                                                        className="text-center py-4"
                                                    >
                                                        No Joint Account Requests Found
                                                    </td>

                                                </tr>

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>
                        <div className="requests-section mt-5">

                            <div className="requests-header">
                                <h1 className="requests-title">
                                    Account Opening Requests
                                </h1>

                                <p className="requests-subtitle">
                                    Track the status of your account opening applications
                                </p>
                            </div>

                            <div className="table-card">

                                <div className="table-responsive">

                                    <table className="table requests-table">

                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Account Type</th>
                                                <th>Status</th>
                                                <th>Remarks</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {openingRequests.length > 0 ? (

                                                openingRequests.map((request) => (

                                                    <tr key={request.id}>

                                                        <td>
                                                            <strong>{request.id}</strong>
                                                        </td>

                                                        <td>
                                                            <span className="type-badge">
                                                                {request.accountType}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    request.status === "APPROVED"
                                                                        ? "status-badge active"
                                                                        : request.status === "REJECTED"
                                                                            ? "status-badge rejected"
                                                                            : request.status === "REVIEWED"
                                                                                ? "status-badge reviewed"
                                                                                : "status-badge pending"
                                                                }
                                                            >
                                                                {request.status}
                                                            </span>
                                                        </td>

                                                        <td className="text-muted">
                                                            {request.remarks}
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                request.createdAt
                                                            ).toLocaleDateString()}
                                                        </td>

                                                    </tr>

                                                ))

                                            ) : (

                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center py-4"
                                                    >
                                                        No Requests Found
                                                    </td>
                                                </tr>

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default CustomerAccountManagement;