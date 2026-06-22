import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/executive-common.css";
const ExecutiveLoanRepayments = () => {

    const navigate = useNavigate();
    const [repayments, setRepayments] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");
    const [dashboard, setDashboard] = useState(null);

    let count = 0;
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

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Loan Repayment Monitoring
                        </h1>

                        <p className="page-subtitle">
                            Track repayments, collections and overdue loans
                        </p>

                    </div>
                    {
                        dashboard && (

                            <div className="row mt-4">

                                <div className="col-md-3">

                                    <div className="dashboard-card-blue">

                                        <div className="card-body">

                                            <h5>
                                                Active Loans
                                            </h5>

                                            <h2>
                                                {
                                                    dashboard.activeLoans
                                                }
                                            </h2>
                                            <p>Currently Active</p>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-green">

                                        <div className="card-body">

                                            <h5>
                                                Total Repayments
                                            </h5>

                                            <h2>
                                                {
                                                    dashboard.totalRepayments
                                                }
                                            </h2>
                                            <p>Processed Payments</p>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-yellow">

                                        <div className="card-body">

                                            <h5>
                                                Collection
                                            </h5>

                                            <h2>

                                                ₹
                                                {
                                                    dashboard.totalCollection
                                                }

                                            </h2>
                                            <p>Total Amount Collected</p>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="dashboard-card-red">

                                        <div className="card-body">

                                            <h5>
                                                Overdue Loans
                                            </h5>

                                            <h2>
                                                {
                                                    dashboard.overdueLoans
                                                }
                                            </h2>
                                            <p>Pending Recovery</p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }
                    <div className="card account-request-card mt-4">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Repayment History
                            </h3>

                            <p className="form-subtitle">
                                Monitor all loan repayment transactions
                            </p>

                        </div>
                        <div className="mb-3">

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

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Repayment ID
                                        </th>

                                        <th>
                                            Loan ID
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment Mode
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Reference
                                        </th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>


                                    {
                                        filteredRepayments.map(
                                            (repayment) => (

                                                <tr
                                                    key={
                                                        repayment.repaymentId
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            repayment.repaymentId
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            repayment.loanId
                                                        }
                                                    </td>

                                                    <td className="balance-cell">
                                                        ₹{Number(repayment.repaymentAmount).toLocaleString()}
                                                    </td>

                                                    <td>
                                                        <span className="type-badge">
                                                            {repayment.paymentMode}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {
                                                            repayment.repaymentDate
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            repayment.transactionReference
                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/executive/loan-monitoring/${repayment.loanId}`
                                                                )
                                                            }
                                                        >
                                                            Monitor
                                                        </button>
                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>

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
                                                    {count = count + 1}
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

export default ExecutiveLoanRepayments;