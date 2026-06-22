import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExecutiveLoanApplications = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] =useState(0);


    const pendingApplicationsApi =
        "http://localhost:8080/api/loan-application/pending";

        let count=0;
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
                        `${pendingApplicationsApi}?page=${page}&size=10`,
                        config_details
                    );

                console.log(response.data);

                setApplications(
                    response.data.data
                );

                setTotalPages(
                    response.data.totalPages
                );

            }
            catch (err) {

                console.error(err)

            }

        };

        getApplications();

    }, [page]);

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Applications
                        </h1>

                        <p className="page-subtitle">
                            Review and process customer loan requests
                        </p>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">

                            <div className="dashboard-card-yellow">

                                <h5>
                                    PENDING APPLICATIONS
                                </h5>

                                <h2>
                                    {applications.length}
                                </h2>

                                <p>
                                    Awaiting Review
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <div>

                                <h3 className="form-title">
                                    Pending Loan Requests
                                </h3>

                                <p className="form-subtitle">
                                    Review loan applications submitted by customers
                                </p>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Application ID
                                            </th>

                                            <th>
                                                Customer
                                            </th>

                                            <th>
                                                Loan Type
                                            </th>

                                            <th>
                                                Principal Amount
                                            </th>

                                            <th>
                                                Interest Rate
                                            </th>

                                            <th>
                                                Term
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            applications.length > 0 ?

                                                applications.map(

                                                    (
                                                        application
                                                    ) => (

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

                                                                <span
                                                                    className="type-badge"
                                                                >
                                                                    {
                                                                        application.loanType
                                                                    }
                                                                </span>

                                                            </td>

                                                            <td
                                                                className="balance-cell"
                                                            >

                                                                ₹
                                                                {
                                                                    Number(
                                                                        application.principalAmount
                                                                    ).toLocaleString()
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    application.interestRate
                                                                }
                                                                %

                                                            </td>

                                                            <td>

                                                                {
                                                                    application.termInMonth
                                                                }
                                                                {" "}
                                                                Months

                                                            </td>

                                                            <td>

                                                                <span
                                                                    className="status-badge pending"
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
                                                                            `/executive/loan-applications/${application.applicationId}/review`
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
                                                        colSpan="8"
                                                        className="text-center py-4"
                                                    >
                                                        No Pending Applications
                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>

                            </div>

                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={page === 0}
                                            onClick={() => setPage(page - 1)}
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
                                                    onClick={() => setPage(index)}
                                                >
                                                    {count=count + 1}
                                                </button>

                                            </li>

                                        ))
                                    }

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={page === totalPages - 1}
                                            onClick={() => setPage(page + 1)}
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

export default ExecutiveLoanApplications;