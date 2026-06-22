import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoanApplications = () => {

    const navigate = useNavigate();

    let count=0;
    const [applications, setApplications] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const reviewedApi =
        "http://localhost:8080/api/loan-application/reviewed";

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const getApplications = async () => {

            try {

                const response =
                    await axios.get(
                        `${reviewedApi}?page=${page}&size=10`,
                        config_details
                    );

                setApplications(response.data.data);

                setTotalPages(response.data.totalPages);

            }
            catch (err) {

                console.error(err)

            }

        };

        getApplications();

    }, [page]);

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Applications
                        </h1>

                        <p className="page-subtitle">
                            Review and process customer loan applications
                        </p>

                    </div>

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <div className="dashboard-card-blue">

                                <h5>TOTAL APPLICATIONS</h5>

                                <h2>{applications.length}</h2>

                                <p>Applications Reviewed</p>

                            </div>

                        </div>





                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Loan Application Directory
                            </h3>

                            <p className="form-subtitle">
                                View and review all customer loan applications
                            </p>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>Application ID</th>
                                            <th>Customer</th>
                                            <th>Loan Type</th>
                                            <th>Amount</th>
                                            <th>Reviewed By</th>
                                            <th>Status</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            applications.length > 0 ?

                                                applications.map(
                                                    (application) => (

                                                        <tr
                                                            key={
                                                                application.applicationId
                                                            }
                                                        >

                                                            <td>
                                                                <strong>
                                                                    APP-
                                                                    {
                                                                        application.applicationId
                                                                    }
                                                                </strong>
                                                            </td>

                                                            <td>
                                                                {
                                                                    application.customerName
                                                                }
                                                            </td>

                                                            <td>

                                                                <span className="type-badge">

                                                                    {
                                                                        application.loanType
                                                                    }

                                                                </span>

                                                            </td>

                                                            <td className="balance-cell">

                                                                ₹

                                                                {
                                                                    Number(
                                                                        application.principalAmount
                                                                    ).toLocaleString()
                                                                }

                                                            </td>
                                                            <td>
                                                                {
                                                                    application.reviewedByName
                                                                        ? `${application.reviewedByName} (${application.reviewedByEmployeeId})`
                                                                        : "-"
                                                                }
                                                            </td>

                                                            <td>

                                                                <span
                                                                    className={

                                                                        application.status === "APPROVED"

                                                                            ?

                                                                            "status-badge active"

                                                                            :

                                                                            application.status === "REJECTED"

                                                                                ?

                                                                                "status-badge rejected"

                                                                                :

                                                                                "status-badge pending"

                                                                    }
                                                                >

                                                                    {
                                                                        application.status
                                                                    }

                                                                </span>

                                                            </td>

                                                            <td>

                                                                <button
                                                                    className="btn btn-outline-primary btn-sm"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/admin/loan-applications/${application.applicationId}/review`
                                                                        )
                                                                    }
                                                                >
                                                                    Review
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="6"
                                                        className="text-center py-4"
                                                    >
                                                        No Applications Found
                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>

                            </div>

                            <nav className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li
                                        className="page=item"
                                    >

                                        <button
                                            className="page-link"
                                             disabled={page === 0}
                                            onClick={() =>
                                                setPage(
                                                    page - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {

                                        [...Array(totalPages)]

                                            .map(

                                                (_, index) => (

                                                    <li
                                                        key={index}
                                                        className="page-item"
                                                    >

                                                        <button
                                                            className="page-link"
                                                            
                                                            onClick={() =>
                                                                setPage(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {count=count+1}
                                                        </button>

                                                    </li>

                                                )

                                            )

                                    }

                                    <li
                                        className="page-item"
                                    >

                                        <button
                                            className="page-link"
                                             disabled={page === totalPages - 1}
                                            onClick={() =>
                                                setPage(
                                                    page + 1
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

export default AdminLoanApplications;