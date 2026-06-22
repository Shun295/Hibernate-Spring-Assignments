import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import LoanList from "../components/customer/LoanList";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getMyLoans } from "../store/action/loanAction";
import "../styles/customer-common.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLoanManagement = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loans } = useSelector(
        state => state.loans
    );

    const [applications, setApplications] =
        useState([]);

    const myApplicationsApi = "http://localhost:8080/api/loan-application/my-applications";

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
                        myApplicationsApi,
                        config_details
                    );

                setApplications(
                    response.data.data
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

        dispatch(getMyLoans());

        getApplications();

    }, []);

    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div className="page-header">
                            <h1 className="page-title">
                                Loan Management
                            </h1>

                            <p className="page-subtitle">
                                View your active loans and track loan applications
                            </p>
                        </div>

                        <button
                            className="btn btn-primary px-4 py-2"
                            onClick={() =>
                                navigate(
                                    "/customer/loan/apply"
                                )
                            }
                        >
                            Apply Loan
                        </button>

                    </div>

                    <div className="row mt-4">

                        <div className="col-md-6">

                            <div className="summary-card">


                                <div className="card-body">
                                    <h6>TOTAL LOANS</h6>

                                    <h2>
                                        {loans.length}
                                    </h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="summary-card">

                                <div className="card-body">

                                    <h6>LOAN APPLICATIONS</h6>
                                    <h2>
                                        {
                                            applications.length
                                        }
                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="table-card mt-4">

                        <div className="card-header">


                        </div>

                        <div className="card-body">

                            <LoanList />

                        </div>

                    </div>

                    <div className="table-card mt-4">

                        <div className="card-header">

                            <h4 className="section-title">
                                My Loan Applications
                            </h4>

                        </div>

                        <div className="card-body">

                            <table className="table loan-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Application ID
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
                                            EMI
                                        </th>

                                        <th>
                                            Total Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>Eligible Amount</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        applications.length > 0 ?

                                            applications.map(
                                                (app) => (

                                                    <tr
                                                        key={
                                                            app.applicationId
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                app.applicationId
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                app.loanType
                                                            }
                                                        </td>

                                                        <td className="balance-cell">
                                                            ₹{Number(app.principalAmount).toLocaleString()}
                                                        </td>

                                                        <td>
                                                            {
                                                                app.interestRate
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                app.termInMonth
                                                            }
                                                        </td>

                                                        <td className="balance-cell">
                                                            ₹{Number(app.emiAmount).toLocaleString()}
                                                        </td>

                                                        <td className="balance-cell">
                                                            ₹{Number(app.totalRepayableAmount).toLocaleString()}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    app.status === "APPROVED"
                                                                        ? "status-badge active"
                                                                        : app.status === "REJECTED"
                                                                            ? "status-badge rejected"
                                                                            : app.status === "REVIEWED"
                                                                                ? "status-badge reviewed"
                                                                                : "status-badge pending"
                                                                }
                                                            >
                                                                {app.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {
                                                                app.eligibleAmount
                                                                    ? `₹${Number(
                                                                        app.eligibleAmount
                                                                    ).toLocaleString()}`
                                                                    : "-"
                                                            }
                                                        </td>

                                                        <td>
                                                            {app.remarks || "-"}
                                                        </td>

                                                        <td>
                                                            {
                                                                app.status ===
                                                                    "CUSTOMER_ACTION_REQUIRED"
                                                                    ?
                                                                    <button
                                                                        className="btn btn-warning btn-sm"
                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/customer/loan-resubmit/${app.applicationId}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Modify
                                                                    </button>
                                                                    :
                                                                    "-"
                                                            }
                                                        </td>

                                                    </tr>))

                                            :

                                            <tr>

                                                <td
                                                    colSpan="11"
                                                    className="text-center"
                                                >
                                                    No Applications Found
                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CustomerLoanManagement;