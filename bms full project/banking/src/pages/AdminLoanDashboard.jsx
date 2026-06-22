import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AdminLoanDashboard = () => {

    const navigate = useNavigate();

    const [loans, setLoans] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    let count=0;
    useEffect(() => {

        loadLoans(page);

    }, [page]);

    const loadLoans =
        async (pageNo) => {

            try {

                const config = {

                    headers: {

                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            )

                    }

                };

                const response =
                    await axios.get(

                        `http://localhost:8080/api/loan/all?page=${pageNo}&size=10`,

                        config

                    );

                setLoans(response.data.data);

                setTotalPages(response.data.totalPages);

            }
            catch (err) {

                console.error(err)

            }

        };

    const totalLoans = loans.length;

    const activeLoans =
        loans.filter(
            loan =>
                loan.loanStatus ===
                "ACTIVE"
        ).length;

    const completedLoans =
        loans.filter(
            loan =>
                loan.loanStatus ===
                "COMPLETED"
        ).length;

    const defaultedLoans =
        loans.filter(
            loan =>
                loan.loanStatus ===
                "DEFAULTED"

        ).length;

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />
                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Management
                        </h1>

                        <p className="page-subtitle">
                            Monitor loan applications, repayments and overdue accounts
                        </p>

                    </div>

                    <div className="row g-4 mb-5">

                        <div className="col-md-3">

                            <div className="dashboard-action-card">

                                <h4>Loan Applications</h4>

                                <p>
                                    Review and manage customer loan applications.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate("/admin/loan-applications")
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-action-card">

                                <h4>Loan Repayments</h4>

                                <p>
                                    View and manage loan repayment records.
                                </p>

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        navigate("/admin/loan-repayments")
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-action-card">

                                <h4>Overdue Loans</h4>

                                <p>
                                    Monitor loans requiring immediate attention.
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        navigate("/admin/overdue-loans")
                                    }
                                >
                                    Open
                                </button>

                            </div>
                        </div>
                        <div className="col-md-3">

                            <div className="dashboard-action-card">

                                <h4>Loan Types</h4>

                                <p>
                                    Create and manage loan products offered by the bank.
                                </p>

                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        navigate("/admin/loan-types")
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>



                        <div className="row g-4 mb-5">

                            <div className="col-md-3">

                                <div className="dashboard-card-blue">

                                    <h5>TOTAL LOANS</h5>

                                    <h2>{totalLoans}</h2>

                                    <p>Loans Issued</p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="dashboard-card-green">

                                    <h5>ACTIVE LOANS</h5>

                                    <h2>{activeLoans}</h2>

                                    <p>Currently Running</p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="dashboard-card-purple">

                                    <h5>COMPLETED LOANS</h5>

                                    <h2>{completedLoans}</h2>

                                    <p>Successfully Closed</p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="dashboard-card-red">

                                    <h5>DEFAULTED LOANS</h5>

                                    <h2>{defaultedLoans}</h2>

                                    <p>Need Attention</p>

                                </div>

                            </div>

                        </div>

                        <div className="card account-request-card">

                            <div className="card-header bg-white border-0">

                                <h3 className="form-title">
                                    Loan Directory
                                </h3>

                                <p className="form-subtitle">
                                    View and monitor all loans across the bank
                                </p>

                            </div>

                            <div className="card-body">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>Loan ID</th>
                                            <th>Application ID</th>
                                            <th>Balance</th>
                                            <th>Status</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            loans.length > 0 ?

                                                loans.map((loan) => (

                                                    <tr key={loan.loanId}>

                                                        <td>

                                                            <strong>
                                                                LOAN-{loan.loanId}
                                                            </strong>

                                                        </td>

                                                        <td>
                                                            APP-{loan.loanApplicationId}
                                                        </td>

                                                        <td className="balance-cell">

                                                            ₹
                                                            {
                                                                Number(
                                                                    loan.balanceAmount
                                                                ).toLocaleString()
                                                            }

                                                        </td>

                                                        <td>

                                                            <span
                                                                className={
                                                                    loan.loanStatus === "ACTIVE"
                                                                        ? "status-badge active"
                                                                        : loan.loanStatus === "DEFAULTED"
                                                                            ? "status-badge rejected"
                                                                            : "status-badge reviewed"
                                                                }
                                                            >

                                                                {loan.loanStatus}

                                                            </span>

                                                        </td>

                                                        <td>
                                                            {loan.startDate}
                                                        </td>

                                                        <td>
                                                            {loan.endDate}
                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/loan/${loan.loanId}`
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>

                                                        </td>

                                                    </tr>

                                                ))

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="7"
                                                        className="text-center py-4"
                                                    >
                                                        No Loans Found
                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>

                                <nav className="mt-4">

                                    <ul className="pagination justify-content-center">

                                        <li
                                            className="page-item"
                                        >

                                            <button
                                                className="page-link"
                                                disabled={page === 0}
                                                onClick={() =>
                                                    setPage(page - 1)
                                                }
                                            >
                                                Previous
                                            </button>

                                        </li>

                                        {

                                            [...Array(totalPages)].map(
                                                (_, index) => (

                                                    <li
                                                        key={index}
                                                        className="page-item"
                                                    >

                                                        <button
                                                            className="page-link"

                                                            onClick={() =>
                                                                setPage(index)
                                                            }
                                                        >
                                                            {count=count + 1}
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
                                                    setPage(page + 1)
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

export default AdminLoanDashboard;