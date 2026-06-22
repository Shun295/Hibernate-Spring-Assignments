import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ExecutiveAccountOpeningRequests = () => {

    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const pendingApi =
        "http://localhost:8080/api/accountOpeningReq/pending";

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    let count = 0;
    useEffect(() => {

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const loadRequests = async () => {

            try {

                const response = await axios.get(

                    `${pendingApi}?page=${currentPage}&size=5`,

                    config

                );

                setRequests(response.data.data);

                setTotalPages(
                    response.data.totalPages
                );

            }
            catch (err) {

                console.log(err?.response);

            }

        };

        loadRequests();

    }, [currentPage]);

    return (
        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Opening Requests
                        </h1>



                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Pending Applications
                            </h3>

                            <p className="form-subtitle">
                                Applications awaiting executive review
                            </p>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Account Type</th>
                                            <th>Status</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            requests.map((r) => (

                                                <tr key={r.id}>

                                                    <td>{r.id}</td>

                                                    <td>
                                                        {r.customerName}
                                                    </td>

                                                    <td>
                                                        {r.accountType}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                r.status === "APPROVED"
                                                                    ? "status-badge active"
                                                                    : r.status === "REJECTED"
                                                                        ? "status-badge rejected"
                                                                        : r.status === "REVIEWED"
                                                                            ? "status-badge reviewed"
                                                                            : "status-badge pending"
                                                            }
                                                        >
                                                            {r.status}
                                                        </span>

                                                    </td>



                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/executive/account-opening-review/${r.id}`
                                                                )
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
                                                        {count = count + 1}
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

        </div>
    );
};

export default ExecutiveAccountOpeningRequests;