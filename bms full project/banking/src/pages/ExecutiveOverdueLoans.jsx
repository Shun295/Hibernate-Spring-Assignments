import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExecutiveOverdueLoans = () => {

    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const[totalPages,setTotalPages]=useState(0);
    let count=0;
    const navigate = useNavigate();

    const api = "http://localhost:8080/api/loan/overdue";

    const pageSize = 5;

    
    useEffect(() => {

        const getOverdueLoans = async () => {

            try {

                const config_details = {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                };

                const response = await axios.get(
                    api,
                    config_details
                );

                setLoans(response.data);

            }
            catch (err) {

                console.error(err)

            }

        };

        getOverdueLoans();

    }, []);

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Overdue Loan Monitoring
                        </h1>

                        <p className="page-subtitle">
                            Track loans with overdue payments and take necessary action
                        </p>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">

                            <div className="summary-card">

                                <h5>TOTAL OVERDUE LOANS</h5>

                                <h2>{loans.length}</h2>

                                <p>Loans Requiring Attention</p>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Overdue Loan Directory
                            </h3>

                            <p className="form-subtitle">
                                Monitor and manage overdue customer loans
                            </p>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table accounts-table">

                                    <thead>

                                        <tr>

                                            <th>Loan ID</th>
                                            <th>Customer</th>
                                            <th>Balance</th>
                                            <th>EMI</th>
                                            <th>Due Date</th>
                                            <th>Days Overdue</th>
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
                                                            {loan.customerName}
                                                        </td>

                                                        <td className="balance-cell">
                                                            ₹{
                                                                Number(
                                                                    loan.balanceAmount
                                                                ).toLocaleString()
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹{
                                                                Number(
                                                                    loan.emiAmount
                                                                ).toLocaleString()
                                                            }
                                                        </td>

                                                        <td>
                                                            {loan.nextDueDate}
                                                        </td>

                                                        <td>

                                                            <span
                                                                className="
                                                                status-badge
                                                                rejected
                                                                "
                                                            >
                                                                {loan.daysOverdue} Days
                                                            </span>

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="
                                                                btn
                                                                btn-outline-primary
                                                                btn-sm
                                                                "
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/executive/loan-monitoring/${loan.loanId}`
                                                                    )
                                                                }
                                                            >
                                                                Monitor
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
                                                        No Overdue Loans Found
                                                    </td>

                                                </tr>
                                        }

                                    </tbody>

                                </table>

                            </div>

                            {/* Pagination */}

                            <nav aria-label="Page navigation">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={currentPage === 0}
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from(
                                            { length: totalPages },
                                            (_, index) => (
                                                <li
                                                    key={index}
                                                    className="page-item"
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            setCurrentPage(index)
                                                        }
                                                    >
                                                        {count=count+1}
                                                    </button>
                                                </li>
                                            )
                                        )
                                    }

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={
                                                currentPage === totalPages - 1
                                            }
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
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

export default ExecutiveOverdueLoans;