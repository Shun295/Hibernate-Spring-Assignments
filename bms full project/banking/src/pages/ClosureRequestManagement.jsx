import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ClosureRequestManagement = () => {

    const navigate = useNavigate();
    const dashboardApi = "http://localhost:8080/api/accountClosure/admin/dashboard";
    const getAllClosureApi = "http://localhost:8080/api/accountClosure/all";
    const searchApi = "http://localhost:8080/api/accountClosure/admin/search";
    const [reviewedRequests, setReviewedRequests] = useState(0);
    const [approvedClosures, setApprovedClosures] = useState(0);
    const [rejectedRequests, setRejectedRequests] = useState(0);
    const [closureRequests, setClosureRequests] = useState([]);
    const [status, setStatus] = useState("");
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getDashboardStats = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(
                dashboardApi,
                config_details
            );

            console.log(response.data);
            setReviewedRequests(response.data.reviewedRequests);
            setApprovedClosures(response.data.approvedClosures);
            setRejectedRequests(response.data.rejectedRequests);
        }
        catch (err) {
            console.erroe(err)
        }
    };

    const getAllClosureRequests = async () => {
        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(`${getAllClosureApi}?page=${currentPage}&size=5`, config_details);
            console.log(response.data);
            setClosureRequests(response.data.data);
            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            console.log(err?.response);
        }
    };
    const searchByStatus = async () => {
        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };
        try {
            if (status === "") {
                getAllClosureRequests();
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/accountClosure/admin/status?status=${status}`,
                config_details
            );
            console.log(response.data);
            setClosureRequests(response.data);
        }
        catch (err) {
            console.log(err?.response);
        }

    };
    useEffect(() => {
        getDashboardStats();
        getAllClosureRequests();
    }, [currentPage]);

    const searchClosureRequest = async () => {
        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(
                `${searchApi}?keyword=${keyword}`,
                config_details
            );

            console.log(response.data);
            setClosureRequests(response.data);

        }
        catch (err) {
            console.log(err?.response);
            alert("No Request Found");
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() !== "") {
            searchClosureRequest();
        }
        else if (status !== "") {
            searchByStatus();
        }
        else {
            getAllClosureRequests();
        }

    };
    return (
        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Closure Requests
                        </h1>

                        <p className="page-subtitle">
                            Review, approve and manage account closure requests
                        </p>

                    </div>
                    <div className="card account-request-card mt-4">

                        <div className="card-body">

                            <h4>Search Request</h4>

                            <div className="row">

                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Account Number"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <select
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">All Status</option>
                                        <option value="REVIEWED">Reviewed</option>
                                        <option value="APPROVED">Approved</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>

                                <div className="col-md-2">
                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={() => {

                                            setKeyword("");
                                            setStatus("");
                                            setCurrentPage(0);

                                            getAllClosureRequests();

                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Closure Request Table */}
                    <div className="card account-request-card mt-4">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Closure Request Directory
                            </h3>

                            <p className="form-subtitle">
                                Requests awaiting administrative action
                            </p>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Customer Name</th>
                                        <th>Account ID</th>
                                        <th>Reason</th>
                                        <th>Requested Date</th>
                                        <th>Status</th>
                                        <th>Reviewed By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        closureRequests.map((request) => (

                                            <tr key={request.id}>
                                                <td>
                                                    <strong>
                                                        CLS-{request.id}
                                                    </strong>
                                                </td>

                                                <td>{request.customerName}</td>

                                                <td>{request.accountId}</td>

                                                <td>{request.reason}</td>

                                                <td>
                                                    {
                                                        request.createdAt
                                                            ? new Date(request.createdAt)
                                                                .toLocaleDateString()
                                                            : "-"
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            request.status === "APPROVED"
                                                                ? "status-badge active"
                                                                : request.status === "REJECTED"
                                                                    ? "status-badge rejected"
                                                                    : "status-badge reviewed"
                                                        }
                                                    >
                                                        {request.status}
                                                    </span>

                                                </td>

                                                <td>
                                                    {request.reviewedBy || "-"}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() =>
                                                            navigate(`/admin/closure-review/${request.id}`)
                                                        }
                                                    >
                                                        Review
                                                    </button>

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={currentPage === 0}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from({ length: totalPages }).map((_, index) => (

                                            <li
                                                key={index}
                                                className="page-item"
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index)}
                                                >
                                                    {index + 1}
                                                </button>

                                            </li>

                                        ))
                                    }

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={currentPage === totalPages - 1}
                                            onClick={() => setCurrentPage(currentPage + 1)}
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

export default ClosureRequestManagement;