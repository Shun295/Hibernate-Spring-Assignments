import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/executive-common.css";
import { useNavigate } from "react-router-dom";

const ExecutiveClosureRequest = () => {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [accountType, setAccountType] = useState("");

    let count=0;
    const pendingApi = "http://localhost:8080/api/accountClosure/pending";

    const searchApi = "http://localhost:8080/api/accountClosure/search";

    const filterApi = "http://localhost:8080/api/accountClosure/filter";

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        const getPendingRequests = async () => {

            try {

                const response = await axios.get(
                    `${pendingApi}?page=${currentPage}&size=5`,
                    config_details
                );
                setRequests(response.data.data);
                setTotalPages(
                    response.data.totalPages
                );
                setCurrentPage(0);
            }
            catch (err) {
                console.error(err);
            }
        };
        getPendingRequests();
    }, [currentPage]);

    const searchRequest = async () => {
        if (!keyword) {
            alert("Enter Request ID");
            return;
        }

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {
            const response = await axios.get(`${searchApi}?requestId=${keyword}`, config_details);
            setRequests(response.data);
        }
        catch (err) {
            console.log(err?.response);
            alert("Request Not Found");
        }
    };

    const filterByAccountType = async () => {
        if (!accountType) {
            alert("Select Account Type");
            return;
        }

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(`${filterApi}?accountType=${accountType}`, config_details);
            setRequests(response.data);

        }
        catch (err) {
            console.log(err?.response);
            alert("No Requests Found");
        }
    };

    const resetRequests = async () => {
        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {
            const response = await axios.get(pendingApi, config_details);
            setRequests(response.data.data);
            setKeyword("");
            setAccountType("");
        }
        catch (err) {
            console.log(err?.response);
        }
    };
    return (
        <div>
            <NavbarExecutive />
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Closure Requests
                        </h1>

                        <p className="page-subtitle">
                            Review and manage customer account closure requests
                        </p>

                    </div>

                    <div className="row mt-4">

                        <div className="col-md-4">
                            <div className="summary-card">
                                <div className="card-body">
                                    <h6>Pending Requests</h6>
                                    <h2>{requests.length}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <div className="card-body">
                                    <h6>Reviewed Requests</h6>
                                    <h2>0</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <div className="card-body">
                                    <h6>Total Requests</h6>
                                    <h2>{requests.length}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Search & Filter */}

                    <div className="card account-request-card mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-3">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Request ID"
                                        value={keyword}
                                        onChange={(e) =>
                                            setKeyword(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-3">

                                    <select
                                        className="form-select"
                                        value={accountType}
                                        onChange={(e) =>
                                            setAccountType(e.target.value)
                                        }
                                    >

                                        <option value="">
                                            Select Account Type
                                        </option>

                                        <option value="SAVINGS">
                                            Savings
                                        </option>

                                        <option value="CURRENT">
                                            Current
                                        </option>

                                        <option value="FIXED_DEPOSIT">
                                            Fixed Deposit
                                        </option>

                                        <option value="RECURRING_DEPOSIT">
                                            Recurring Deposit
                                        </option>

                                        <option value="JOINT">
                                            Joint
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={searchRequest}
                                    >
                                        Search
                                    </button>

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-success w-100"
                                        onClick={filterByAccountType}
                                    >
                                        Filter
                                    </button>

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={resetRequests}
                                    >
                                        Reset
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Table */}

                    <div className="card mt-4">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Closure Request Queue
                            </h3>

                            <p className="form-subtitle">
                                Pending requests awaiting executive review
                            </p>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>
                                        <th>Request ID</th>
                                        <th>Customer</th>
                                        <th>Reason</th>
                                        <th>Account Type</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        requests.length > 0 ? (

                                            requests.map((request) => (

                                                <tr key={request.id}>

                                                    <td>{request.id}</td>

                                                    <td>
                                                        {request.customerName}
                                                    </td>

                                                    <td>
                                                        {request.reason}
                                                    </td>

                                                    <td>
                                                        {request.accountType}
                                                    </td>

                                                    <td>

                                                        <span className="status-badge pending">
                                                            {request.status}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/executive/closure-request/review/${request.id}`
                                                                )
                                                            }
                                                        >
                                                            Review
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    No Requests Found
                                                </td>

                                            </tr>

                                        )
                                    }

                                </tbody>

                            </table>
                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={currentPage === 0}
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from(
                                            { length: totalPages }
                                        ).map((_, index) => (

                                            <li
                                                key={index}
                                                className="page-item"
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {count=count+1}
                                                </button>

                                            </li>

                                        ))
                                    }

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={
                                                currentPage ===
                                                totalPages - 1
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ExecutiveClosureRequest;