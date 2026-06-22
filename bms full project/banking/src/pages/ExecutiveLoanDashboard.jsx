import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ExecutiveLoanDashboard = () => {

    const navigate = useNavigate();
    const [loans, setLoans] =useState([]);
    const [loanId, setLoanId] =useState("");
    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

        let count=0;
    useEffect(() => {

        loadLoans(0);

    }, []);

    const loadLoans =
        async (pageNo = 0) => {

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

                        `http://localhost:8080/api/loan/all?page=${pageNo}&size=5`,

                        config

                    );

                setLoans(
                    response.data.data
                );

                setPage(
                    pageNo
                );

                setTotalPages(
                    response.data.totalPages
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

    const pendingApplications =
        0;

    const activeLoans =
        loans.filter(
            loan =>
                loan.loanStatus ===
                "ACTIVE"
        ).length;

    const overdueLoans =
        loans.filter(
            loan =>
                loan.loanStatus ===
                "DEFAULTED"
        ).length;

    const todaysCollection =
        0;
    const searchLoan = () => {

        if (!loanId) {

            alert(
                "Enter Loan ID"
            );

            return;
        }

        navigate(
            `/executive/loan-monitoring/${loanId}`
        );

    };
    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Management
                        </h1>

                        <p className="page-subtitle">
                            Manage loan applications, repayments and overdue accounts
                        </p>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-3">

                            <div className="dashboard-card-yellow">

                                <h5>
                                    PENDING
                                </h5>

                                <h2>
                                    {pendingApplications}
                                </h2>

                                <p>
                                    Awaiting Review
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-blue">

                                <h5>
                                    ACTIVE LOANS
                                </h5>

                                <h2>
                                    {activeLoans}
                                </h2>

                                <p>
                                    Currently Running
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-red">

                                <h5>
                                    OVERDUE LOANS
                                </h5>

                                <h2>
                                    {overdueLoans}
                                </h2>

                                <p>
                                    Need Attention
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-green">

                                <h5>
                                    TODAY'S COLLECTIONS
                                </h5>

                                <h2>
                                    ₹{todaysCollection}
                                </h2>

                                <p>
                                    Collected Today
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">

                            <div className="dashboard-action-card text-center">

                                <h4>
                                    Loan Applications
                                </h4>

                                <p>
                                    Review customer loan applications and submit recommendations.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate(
                                            "/executive/loan-applications"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-action-card text-center">

                                <h4>
                                    Loan Repayments
                                </h4>

                                <p>
                                    Monitor repayment schedules and customer payment history.
                                </p>

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        navigate(
                                            "/executive/loan-repayments"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-action-card text-center">

                                <h4>
                                    Overdue Loans
                                </h4>

                                <p>
                                    Track overdue loans and initiate follow-up actions.
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        navigate(
                                            "/executive/overdue-loans"
                                        )
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card mb-4">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Quick Loan Search
                            </h3>

                            <p className="form-subtitle">
                                Search and view loan details instantly
                            </p>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-10">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Loan ID"
                                        required
                                        value={loanId}
                                        onChange={(e) =>
                                            setLoanId(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={searchLoan}
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Loan Directory
                            </h3>

                            <p className="form-subtitle">
                                View and monitor all loans
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

                                                    <td>
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
                                                                    `/executive/loan-monitoring/${loan.loanId}`
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
                                                    className="text-center"
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
                                                loadLoans(page - 1)
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
                                                            loadLoans(index)
                                                        }
                                                    >
                                                        {count = count + 1}
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
                                                loadLoans(page + 1)
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

export default ExecutiveLoanDashboard;