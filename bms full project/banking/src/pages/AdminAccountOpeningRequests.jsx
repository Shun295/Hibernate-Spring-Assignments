import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAccountOpeningRequests = () => {
    const navigate = useNavigate();
    const reviewedRequestsApi = "http://localhost:8080/api/accountOpeningReq/reviewed";
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    let count=0;
    const getRequests = async () => {
        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {
            const response = await axios.get(`${reviewedRequestsApi}?page=${currentPage}&size=5`, config_details);
            setRequests(response.data.data);
            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            console.error(err);
        }

    };

    useEffect(() => {
        getRequests();
    }, [currentPage]);
    return (

        <div>

            <NavbarAdmin />
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid p-4">
                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Opening Requests
                        </h1>

                        <p className="page-subtitle">
                            Review and approve account opening applications
                        </p>

                    </div>

                    <div className="row mt-4">

                        <div className="col-md-4">

                            <div className="dashboard-card-blue">

                                <div className="card-body">

                                    <h5>REVIEWED REQUESTS</h5>

                                    <h2>{requests.length}</h2>

                                    <p>Pending Admin Actions</p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card mt-4">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Request Directory
                            </h3>

                            <p className="form-subtitle">
                                Applications reviewed by executives
                            </p>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>
                                    <tr>

                                        <th>Request ID</th>
                                        <th>Customer Name</th>
                                        <th>Account Type</th>
                                        <th>Branch</th>
                                        <th>Status</th>
                                        <th>Reviewed By</th>
                                        <th>Reviewed At</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        requests.length > 0 ? (

                                            requests.map((request) => (

                                                <tr key={request.requestId}>
                                                    <td>
                                                        <strong>
                                                            REQ-{request.requestId}
                                                        </strong>
                                                    </td>

                                                    <td>{request.customerName}</td>

                                                    <td>{request.accountType}</td>

                                                    <td>{request.branchName}</td>

                                                    <td>

                                                        <span
                                                            className={
                                                                request.status === "REVIEWED"
                                                                    ? "status-badge reviewed"
                                                                    : request.status === "APPROVED"
                                                                        ? "status-badge active"
                                                                        : "status-badge rejected"
                                                            }
                                                        >
                                                            {request.status}
                                                        </span>

                                                    </td>

                                                    <td>{request.reviewedBy}</td>

                                                    <td>
                                                        {
                                                            request.reviewedAt
                                                                ? request.reviewedAt.split("T")[0]
                                                                : "-"
                                                        }
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/account-opening-review/${request.requestId}`
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
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    No Reviewed Requests Found
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
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from({ length: totalPages }).map((_, index) => (

                                            <li
                                                key={index}
                                                className={`page-item ${currentPage === index ? "active" : "" }`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index)}
                                                >
                                                    {count=count+ 1}
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

export default AdminAccountOpeningRequests;