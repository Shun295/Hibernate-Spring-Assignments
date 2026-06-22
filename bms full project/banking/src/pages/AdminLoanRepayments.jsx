import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoanRepayments = () => {

    const navigate = useNavigate();

    const [repayments, setRepayments] =useState([]);

    const [page, setPage] =useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] =useState("");
    const [dashboard, setDashboard] =useState(null);

        let count=0;
    const api =
        "http://localhost:8080/api/repayment/all";
    const dashboardApi =
        "http://localhost:8080/api/loan/dashboard";

    useEffect(() => {

        const getRepayments =
            async () => {

                try {

                    const config_details = {

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

                            `${api}?page=${page}&size=10`,

                            config_details

                        );

                    setRepayments(
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
        const getDashboard =
            async () => {

                try {

                    const config_details = {

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
                            dashboardApi,
                            config_details
                        );

                    setDashboard(
                        response.data
                    );

                }
                catch (err) {

                    console.error(err)

                }

            };
        getDashboard();
        getRepayments();

    }, [page]);

    const filteredRepayments =
        repayments.filter(
            repayment =>

                repayment.loanId
                    .toString()
                    .includes(
                        searchTerm
                    )
        );

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Repayments
                        </h1>

                        <p className="page-subtitle">
                            Monitor repayments, collections and loan payment history
                        </p>

                    </div>

                    {
                        dashboard && (

                            <div className="row mb-4">

                                <div className="col-md-3">

                                    <div className="dashboard-card-blue">

                                        <h5>ACTIVE LOANS</h5>

                                        <h2>
                                            {dashboard.activeLoans}
                                        </h2>

                                        <p>Currently Running</p>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-green">

                                        <h5>TOTAL REPAYMENTS</h5>

                                        <h2>
                                            {dashboard.totalRepayments}
                                        </h2>

                                        <p>Payments Received</p>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-purple">

                                        <h5>COLLECTION</h5>

                                        <h2>
                                            ₹{Number(
                                                dashboard.totalCollection
                                            ).toLocaleString()}
                                        </h2>

                                        <p>Total Amount Collected</p>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-red">

                                        <h5>OVERDUE LOANS</h5>

                                        <h2>
                                            {dashboard.overdueLoans}
                                        </h2>

                                        <p>Need Attention</p>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <div>

                                <h3 className="form-title">
                                    Repayment History
                                </h3>

                                <p className="form-subtitle">
                                    Track all customer repayment transactions
                                </p>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row mb-4">

                                <div className="col-md-4">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Loan ID"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>Repayment ID</th>
                                            <th>Loan ID</th>
                                            <th>Amount</th>
                                            <th>Payment Mode</th>
                                            <th>Date</th>
                                            <th>Reference</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredRepayments.length > 0 ?

                                                filteredRepayments.map(
                                                    (repayment) => (

                                                        <tr
                                                            key={
                                                                repayment.repaymentId
                                                            }
                                                        >

                                                            <td>

                                                                <strong>

                                                                    REP-
                                                                    {
                                                                        repayment.repaymentId
                                                                    }

                                                                </strong>

                                                            </td>

                                                            <td>

                                                                LOAN-
                                                                {
                                                                    repayment.loanId
                                                                }

                                                            </td>

                                                            <td className="balance-cell">

                                                                ₹

                                                                {
                                                                    Number(
                                                                        repayment.repaymentAmount
                                                                    ).toLocaleString()
                                                                }

                                                            </td>

                                                            <td>

                                                                <span
                                                                    className="type-badge"
                                                                >

                                                                    {
                                                                        repayment.paymentMode
                                                                    }

                                                                </span>

                                                            </td>

                                                            <td>
                                                                {
                                                                    repayment.repaymentDate
                                                                }
                                                            </td>

                                                            <td>

                                                                TXN-

                                                                {
                                                                    repayment.transactionReference?.substring(
                                                                        0,
                                                                        8
                                                                    )
                                                                }

                                                            </td>

                                                            <td>

                                                                <button
                                                                    className="btn btn-outline-primary btn-sm"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/admin/loan-monitoring/${repayment.loanId}`
                                                                        )
                                                                    }
                                                                >
                                                                    Monitor
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="7"
                                                        className="text-center py-4"
                                                    >
                                                        No Repayments Found
                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>

                            </div>

                            <nav className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li
                                        className="page-item"
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
                                                                setPage( index
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

export default AdminLoanRepayments;